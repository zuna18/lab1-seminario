import type { Order } from "../domain/types.js";


// Falla intencional (LSP): PickupService hereda un contrato de envío, pero no
// puede cumplirlo y cambia una regla que el código cliente da por sentada.
export interface Costable {
  calculateCost(order: Order): number;
}

export interface Schedulable {
  schedule(order: Order): string;
}

export class ShippingService implements Costable, Schedulable {
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

export class PickupService implements Costable {
  calculateCost(_order: Order): number {
    return 0;
  }
}