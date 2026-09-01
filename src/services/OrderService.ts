import type { CustomerType, Order, Receipt } from "../domain/types.js";
import { EmailService, type Notifier } from "../infrastructure/EmailService.js";
import { OrderDatabase, type OrderRepository } from "../infrastructure/OrderDatabase.js";
import type { Payable } from "../payments/PaymentProcessor.js";
import { PickupService, ShippingService } from "../shipping/ShippingService.js";

const discountRates: Record<CustomerType, number> = {
  regular: 0,
  premium: 0.1,
  employee: 0.2,
  vip: 0.3,
};
// Esta clase contiene fallas de diseño intencionales para el laboratorio.
// El objetivo es mejorar el diseño manteniendo el comportamiento observable.
export class OrderService {
  // Falla intencional (DIP): el servicio de alto nivel crea y conoce detalles
  // concretos de base de datos, correo y envío.
    constructor(
    private readonly repository: OrderRepository = new OrderDatabase(),
    private readonly notifier: Notifier = new EmailService(),
  ) {}
    process(order: Order, payment: Payable): Receipt {
    if (order.products.length === 0) {
      throw new Error("El pedido debe contener al menos un producto");
    }

    // Falla intencional (SRP): valida, calcula, selecciona descuentos, cobra,
    // guarda, imprime y notifica dentro de la misma clase.
    const subtotal = order.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    // Falla intencional (OCP): cada tipo nuevo obliga a modificar este bloque.
    const discount = subtotal * discountRates[order.customer.type];

    const shipping =
      order.deliveryType === "home"
        ? new ShippingService()
        : new PickupService();
    const deliveryCost = shipping.calculateCost(order);
    const total = subtotal - discount + deliveryCost;
    const transactionId = payment.pay(total);

    const receipt: Receipt = {
      orderId: order.id,
      subtotal,
      discount,
      deliveryCost,
      total,
    };

    this.repository.save(order, receipt);
    this.notifier.send(
      order.customer.email,
      `Pedido ${order.id} confirmado`,
      `Total: $${total.toFixed(2)}. Transacción: ${transactionId}`,
    );
    this.printReceipt(receipt);

    return receipt;
  }

  scheduleDelivery(order: Order): string {
    if (order.deliveryType !== "home") {
      return `El pedido ${order.id} es para recoger y no requiere programación de envío`;
    }
    return new ShippingService().schedule(order);
  }

  private printReceipt(receipt: Receipt): void {
    console.log(
      `[RECIBO] ${receipt.orderId}: $${receipt.total.toFixed(2)}`,
    );
  }
}
