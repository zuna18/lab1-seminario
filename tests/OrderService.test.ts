import { afterEach, describe, expect, it, vi } from "vitest";
import type { Order } from "../src/domain/types.js";
import { CardPaymentProcessor } from "../src/payments/PaymentProcessor.js";
import { OrderService } from "../src/services/OrderService.js";

const createOrder = (overrides: Partial<Order> = {}): Order => ({
  id: "PED-TEST",
  customer: {
    name: "Ana",
    email: "ana@example.com",
    type: "regular",
  },
  products: [{ name: "Libro", price: 100, quantity: 2 }],
  deliveryType: "home",
  ...overrides,
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("OrderService - comportamiento que debe conservarse", () => {
  it("procesa un pedido regular con envío", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    const receipt = new OrderService().process(
      createOrder(),
      new CardPaymentProcessor(),
    );

    expect(receipt).toEqual({
      orderId: "PED-TEST",
      subtotal: 200,
      discount: 0,
      deliveryCost: 4,
      total: 204,
    });
  });

  it("aplica 10% de descuento a clientes premium", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    const order = createOrder({
      customer: {
        name: "Beto",
        email: "beto@example.com",
        type: "premium",
      },
      deliveryType: "pickup",
    });

    const receipt = new OrderService().process(
      order,
      new CardPaymentProcessor(),
    );

    expect(receipt.discount).toBe(20);
    expect(receipt.deliveryCost).toBe(0);
    expect(receipt.total).toBe(180);
  });

  it("aplica 20% de descuento a empleados", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    const order = createOrder({
      customer: {
        name: "Carla",
        email: "carla@example.com",
        type: "employee",
      },
    });

    expect(
      new OrderService().process(order, new CardPaymentProcessor()).discount,
    ).toBe(40);
  });

  it("rechaza pedidos sin productos", () => {
    const order = createOrder({ products: [] });

    expect(() =>
      new OrderService().process(order, new CardPaymentProcessor()),
    ).toThrow("El pedido debe contener al menos un producto");
  });

  it("programa la entrega de un pedido a domicilio", () => {
    const message = new OrderService().scheduleDelivery(createOrder());

    expect(message).toBe("Envío a domicilio programado para Ana");
  });
});
