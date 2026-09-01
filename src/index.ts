import { CardPaymentProcessor } from "./payments/PaymentProcessor.js";
import { OrderService } from "./services/OrderService.js";
import type { Order } from "./domain/types.js";

const order: Order = {
  id: "PED-001",
  customer: {
    name: "Ana",
    email: "ana@example.com",
    type: "premium",
  },
  products: [
    { name: "Teclado", price: 50, quantity: 1 },
    { name: "Mouse", price: 25, quantity: 2 },
  ],
  deliveryType: "home",
};

const service = new OrderService();
const receipt = service.process(order, new CardPaymentProcessor());

console.log("Pedido procesado:", receipt);
