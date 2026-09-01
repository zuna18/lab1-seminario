// Falla intencional (ISP): todos los procesadores están obligados a soportar
// operaciones que quizá no tienen sentido para ellos.
export interface PaymentProcessor {
  pay(amount: number): string;
  refund(transactionId: string): void;
  generateMonthlyReport(): string;
}

export class CardPaymentProcessor implements PaymentProcessor {
  pay(amount: number): string {
    return `CARD-${amount.toFixed(2)}`;
  }

  refund(transactionId: string): void {
    console.log(`Reembolso de tarjeta: ${transactionId}`);
  }

  generateMonthlyReport(): string {
    return "Reporte mensual de pagos con tarjeta";
  }
}

export class CashPaymentProcessor implements PaymentProcessor {
  pay(amount: number): string {
    return `CASH-${amount.toFixed(2)}`;
  }

  refund(_transactionId: string): void {
    throw new Error("Los pagos en efectivo no se reembolsan aquí");
  }

  generateMonthlyReport(): string {
    throw new Error("El pago en efectivo no genera reportes mensuales");
  }
}
