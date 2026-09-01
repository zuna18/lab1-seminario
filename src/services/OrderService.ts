import type { Order, Receipt } from "../domain/types.js";
import { EmailService } from "../infrastructure/EmailService.js";
import { OrderDatabase } from "../infrastructure/OrderDatabase.js";
import type { PaymentProcessor } from "../payments/PaymentProcessor.js";
import { PickupService, ShippingService } from "../shipping/ShippingService.js";

// Esta clase contiene fallas de diseño intencionales para el laboratorio.
// El objetivo es mejorar el diseño manteniendo el comportamiento observable.
export class OrderService {
  // Falla intencional (DIP): el servicio de alto nivel crea y conoce detalles
  // concretos de base de datos, correo y envío.
  private readonly database = new OrderDatabase();
  private readonly emailService = new EmailService();

  process(order: Order, payment: PaymentProcessor): Receipt {
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
    let discount = 0;
    if (order.customer.type === "regular") {
      discount = 0;
    } else if (order.customer.type === "premium") {
      discount = subtotal * 0.1;
    } else if (order.customer.type === "employee") {
      discount = subtotal * 0.2;
    }

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

    this.database.save(order, receipt);
    this.emailService.send(
      order.customer.email,
      `Pedido ${order.id} confirmado`,
      `Total: $${total.toFixed(2)}. Transacción: ${transactionId}`,
    );
    this.printReceipt(receipt);

    return receipt;
  }

  scheduleDelivery(order: Order): string {
    const shipping =
      order.deliveryType === "home"
        ? new ShippingService()
        : new PickupService();
    return shipping.schedule(order);
  }

  private printReceipt(receipt: Receipt): void {
    console.log(
      `[RECIBO] ${receipt.orderId}: $${receipt.total.toFixed(2)}`,
    );
  }
}
