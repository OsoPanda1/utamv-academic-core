import { InternalLedger } from "./ledger.internal";

export class TokensService {
  constructor(private readonly ledger: InternalLedger) {}

  grant(userId: string, amount: number, reason: string): void {
    if (amount <= 0) throw new Error("Grant amount must be positive.");
    this.ledger.append(userId, "credit", amount, reason);
  }

  consume(userId: string, amount: number, reason: string): void {
    if (amount <= 0) throw new Error("Consume amount must be positive.");
    this.ledger.append(userId, "debit", amount, reason);
  }
}
