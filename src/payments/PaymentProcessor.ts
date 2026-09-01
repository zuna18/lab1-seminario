// ISP: se separan las capacidades en interfaces pequeñas. Cada procesador
// implementa solo lo que realmente puede cumplir.
export interface Payable {
  pay(amount: number): string;
}

export interface Refundable {
  refund(transactionId: string): void;
}

export interface Reportable {
  generateMonthlyReport(): string;
}

export class CardPaymentProcessor implements Payable, Refundable, Reportable {
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

export class CashPaymentProcessor implements Payable {
  pay(amount: number): string {
    return `CASH-${amount.toFixed(2)}`;
  }
}