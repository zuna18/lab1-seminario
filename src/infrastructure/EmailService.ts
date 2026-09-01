export interface Notifier {
  send(to: string, subject: string, body: string): void;
}

export class EmailService implements Notifier {
  send(to: string, subject: string, body: string): void {
    console.log(`[EMAIL] Para: ${to} | ${subject}\n${body}`);
  }
}