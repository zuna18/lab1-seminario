export class EmailService {
  send(to: string, subject: string, body: string): void {
    console.log(`[EMAIL] Para: ${to} | ${subject}\n${body}`);
  }
}
