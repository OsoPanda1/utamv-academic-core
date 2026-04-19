export type LedgerDirection = "credit" | "debit";

export interface LedgerEntry {
  id: string;
  userId: string;
  direction: LedgerDirection;
  amount: number;
  reason: string;
  createdAt: string;
}

export class InternalLedger {
  private readonly entries: LedgerEntry[] = [];

  append(userId: string, direction: LedgerDirection, amount: number, reason: string): LedgerEntry {
    const entry: LedgerEntry = {
      id: crypto.randomUUID(),
      userId,
      direction,
      amount,
      reason,
      createdAt: new Date().toISOString(),
    };

    this.entries.push(entry);
    return entry;
  }

  listByUser(userId: string): LedgerEntry[] {
    return this.entries.filter((entry) => entry.userId === userId);
  }
}
