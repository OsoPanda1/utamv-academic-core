export function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  buckets.set(key, entry);
  return true;
}

export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message = "Request timed out"): Promise<T> {
  let timeoutId: number | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs) as unknown as number;
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export function parseCheckoutPayload(raw: unknown): { courseId?: string; courseSlug?: string; paymentPlan: "full"|"installment_6"|"installment_12" } {
  if (!raw || typeof raw !== "object") throw new Error("Invalid payload");
  const body = raw as Record<string, unknown>;
  const paymentPlan = body.paymentPlan ?? "full";
  if (!["full", "installment_6", "installment_12"].includes(String(paymentPlan))) {
    throw new Error("Invalid payment plan");
  }
  const courseId = typeof body.courseId === "string" ? body.courseId : undefined;
  const courseSlug = typeof body.courseSlug === "string" ? body.courseSlug : undefined;
  if (!courseId && !courseSlug) throw new Error("courseId or courseSlug is required");
  return { courseId, courseSlug, paymentPlan: paymentPlan as "full"|"installment_6"|"installment_12" };
}
