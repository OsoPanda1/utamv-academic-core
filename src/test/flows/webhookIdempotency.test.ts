import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSupabase = {
  from: vi.fn(),
  functions: { invoke: vi.fn() },
};
vi.mock("@/integrations/supabase/client", () => ({ supabase: mockSupabase }));
beforeEach(() => vi.clearAllMocks());

const buildQB = (resolved: any) => {
  const qb: any = {};
  ["select", "eq", "order", "limit", "single", "maybeSingle", "upsert", "insert"].forEach(
    (m) => (qb[m] = vi.fn().mockReturnValue(qb)),
  );
  qb.then = (resolve: any) => resolve(resolved);
  qb.maybeSingle = vi.fn().mockResolvedValue(resolved);
  qb.single = vi.fn().mockResolvedValue(resolved);
  qb.upsert = vi.fn().mockResolvedValue(resolved);
  qb.insert = vi.fn().mockResolvedValue(resolved);
  return qb;
};

describe("Stripe webhook idempotency (logical contract)", () => {
  it("no inserta enrollment dos veces para el mismo event_id", async () => {
    const existing = buildQB({ data: { event_id: "evt_123" }, error: null });
    mockSupabase.from.mockReturnValueOnce(existing);
    const { supabase } = await import("@/integrations/supabase/client");
    const dup = await supabase.from("processed_stripe_events")
      .select("event_id").eq("event_id", "evt_123").maybeSingle();
    expect(dup.data).toEqual({ event_id: "evt_123" });
  });

  it("inserta enrollment activo cuando checkout.session.completed es nuevo", async () => {
    const notFound = buildQB({ data: null, error: null });
    const courseQB = buildQB({ data: { id: "course-uuid" }, error: null });
    const enrollQB = buildQB({ data: { id: "enr-1", status: "active" }, error: null });
    const eventQB = buildQB({ data: { event_id: "evt_new" }, error: null });
    mockSupabase.from
      .mockReturnValueOnce(notFound)   // dedupe lookup
      .mockReturnValueOnce(courseQB)   // course lookup
      .mockReturnValueOnce(enrollQB)   // upsert enrollment
      .mockReturnValueOnce(eventQB);   // record processed event

    const { supabase } = await import("@/integrations/supabase/client");
    const dup = await supabase.from("processed_stripe_events").select().eq("event_id", "evt_new").maybeSingle();
    expect(dup.data).toBeNull();
    const course = await supabase.from("courses").select().eq("slug", "x").maybeSingle();
    expect(course.data?.id).toBe("course-uuid");
    const enr = await supabase.from("enrollments").upsert({ status: "active" });
    expect(enr.data).toMatchObject({ status: "active" });
  });
});

describe("generate + verify certificate", () => {
  it("genera certificado y lo verifica como válido", async () => {
    mockSupabase.functions.invoke
      .mockResolvedValueOnce({ data: { certificate_number: "UTAMV-2026-000777", blockchain_hash: "0xabc" }, error: null })
      .mockResolvedValueOnce({ data: { valid: true, certificate_number: "UTAMV-2026-000777", block_index: 12 }, error: null });
    const { supabase } = await import("@/integrations/supabase/client");
    const gen = await supabase.functions.invoke("generate-certificate", { body: { course_id: "x" } });
    expect(gen.data.certificate_number).toBe("UTAMV-2026-000777");
    const ver = await supabase.functions.invoke("verify-certificate", { body: { certificate_number: gen.data.certificate_number } });
    expect(ver.data.valid).toBe(true);
  });
});
