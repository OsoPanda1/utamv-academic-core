export interface IdnVidaIdentity {
  userId: string;
  trustLevel: "base" | "verified" | "guardian";
  flags: string[];
}

export class IdnVidaService {
  private readonly identities = new Map<string, IdnVidaIdentity>();

  register(userId: string): IdnVidaIdentity {
    const identity: IdnVidaIdentity = { userId, trustLevel: "base", flags: [] };
    this.identities.set(userId, identity);
    return identity;
  }

  promote(userId: string, trustLevel: IdnVidaIdentity["trustLevel"]): IdnVidaIdentity {
    const current = this.identities.get(userId) ?? this.register(userId);
    const updated: IdnVidaIdentity = { ...current, trustLevel };
    this.identities.set(userId, updated);
    return updated;
  }
}
