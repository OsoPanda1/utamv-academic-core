import { describe, expect, it } from "vitest";
import { EconomyService } from "@/core/tamv/economy.service";
import { InternalLedger } from "@/core/tamv/ledger.internal";
import { MembershipsService } from "@/core/tamv/memberships.service";
import { TokensService } from "@/core/tamv/tokens.service";

describe("EconomyService", () => {
  it("onboard crea cuota inicial y permite gasto", () => {
    const ledger = new InternalLedger();
    const service = new EconomyService(ledger, new MembershipsService(), new TokensService(ledger));

    service.onboardUser("u-eco");
    service.spendForFeature("u-eco", 20, "xr_room");

    const entries = service.ledgerForUser("u-eco");
    expect(entries.length).toBe(2);
    expect(entries[0].direction).toBe("credit");
    expect(entries[1].direction).toBe("debit");
  });
});
