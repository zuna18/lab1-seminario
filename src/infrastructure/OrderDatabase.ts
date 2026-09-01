import type { Order, Receipt } from "../domain/types.js";

export class OrderDatabase {
  private readonly records: Array<{ order: Order; receipt: Receipt }> = [];

  save(order: Order, receipt: Receipt): void {
    this.records.push({ order, receipt });
    console.log(`[DB] Pedido ${order.id} guardado`);
  }

  count(): number {
    return this.records.length;
  }
}
