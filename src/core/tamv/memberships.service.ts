export type MembershipTier = "free" | "creator" | "guardian" | "institutional";

export interface Membership {
  userId: string;
  tier: MembershipTier;
  monthlyQuota: number;
}

export class MembershipsService {
  private readonly memberships = new Map<string, Membership>();

  upsert(userId: string, tier: MembershipTier): Membership {
    const monthlyQuota = tier === "free" ? 100 : tier === "creator" ? 500 : tier === "guardian" ? 1_500 : 5_000;
    const membership: Membership = { userId, tier, monthlyQuota };
    this.memberships.set(userId, membership);
    return membership;
  }

  get(userId: string): Membership {
    return this.memberships.get(userId) ?? { userId, tier: "free", monthlyQuota: 100 };
  }
}
