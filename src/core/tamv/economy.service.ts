import { InternalLedger } from "./ledger.internal";
import { MembershipsService } from "./memberships.service";
import { TokensService } from "./tokens.service";

export class EconomyService {
  constructor(
    private readonly ledger: InternalLedger,
    private readonly memberships: MembershipsService,
    private readonly tokens: TokensService,
  ) {}

  onboardUser(userId: string): void {
    const membership = this.memberships.upsert(userId, "free");
    this.tokens.grant(userId, membership.monthlyQuota, "monthly_quota_seed");
  }

  spendForFeature(userId: string, amount: number, featureKey: string): void {
    const reason = `feature:${featureKey}`;
    this.tokens.consume(userId, amount, reason);
  }

  ledgerForUser(userId: string) {
    return this.ledger.listByUser(userId);
  }
}
