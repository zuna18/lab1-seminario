import type { Order } from "../domain/types.js";

export class ShippingService {
  calculateCost(order: Order): number {
    return order.products.reduce(
      (total, product) => total + product.quantity,
      0,
    ) * 2;
  }

  schedule(order: Order): string {
    return `Envío a domicilio programado para ${order.customer.name}`;
  }
}

// Falla intencional (LSP): PickupService hereda un contrato de envío, pero no
// puede cumplirlo y cambia una regla que el código cliente da por sentada.
export class PickupService extends ShippingService {
  override calculateCost(_order: Order): number {
    return 0;
  }

  override schedule(_order: Order): string {
    throw new Error("Un pedido para recoger no puede programar un envío");
  }
}
