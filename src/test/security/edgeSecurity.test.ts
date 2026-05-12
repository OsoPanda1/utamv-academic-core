import { describe, expect, it } from "vitest";

import { checkRateLimit, parseCheckoutPayload } from "../../../supabase/functions/_shared/security";

describe("edge security helpers", () => {
  it("validates checkout payload", () => {
    const parsed = parseCheckoutPayload({ courseSlug: "docker", paymentPlan: "full" });
    expect(parsed.courseSlug).toBe("docker");
  });

  it("rejects invalid payment plan", () => {
    expect(() => parseCheckoutPayload({ courseId: "1", paymentPlan: "bad" })).toThrow();
  });

  it("rate limit blocks after threshold", () => {
    const key = `test-${Date.now()}`;
    expect(checkRateLimit(key, 2, 10000)).toBe(true);
    expect(checkRateLimit(key, 2, 10000)).toBe(true);
    expect(checkRateLimit(key, 2, 10000)).toBe(false);
  });
});
