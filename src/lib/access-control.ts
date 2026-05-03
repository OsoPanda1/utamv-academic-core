import { supabase } from "@/integrations/supabase/client";

export interface AccessControl {
  canAccessCourse: boolean;
  accessType: "subscription" | "purchased" | "installment" | "none";
  restrictions?: string[];
}

const PREMIUM_SUBSCRIPTION_CAP_CENTS = 100_000;

export async function checkCourseAccess(
  userId: string,
  courseId: string,
  coursePrice: number,
): Promise<AccessControl> {
  const { data: purchase } = await supabase
    .from("course_purchases")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .in("status", ["active", "completed"])
    .maybeSingle();

  if (purchase) {
    if (purchase.purchase_type === "installment_plan") {
      const isCurrentOnPayments = checkPaymentStatus(purchase.payment_schedule);

      if (!isCurrentOnPayments) {
        return {
          canAccessCourse: false,
          accessType: "installment",
          restrictions: ["Pago atrasado. Actualiza tu método de pago para continuar."],
        };
      }
    }

    return {
      canAccessCourse: true,
      accessType: purchase.purchase_type === "installment_plan" ? "installment" : "purchased",
    };
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("subscription_tier, subscription_status, subscription_valid_until")
    .eq("id", userId)
    .maybeSingle();

  const hasActiveSubscription =
    profile?.subscription_status === "active" &&
    !!profile.subscription_valid_until &&
    new Date(profile.subscription_valid_until) > new Date();

  const { data: course } = await supabase
    .from("courses")
    .select("available_in_subscription")
    .eq("id", courseId)
    .maybeSingle();

  const isEligibleForSubscription =
    course?.available_in_subscription === true && coursePrice < PREMIUM_SUBSCRIPTION_CAP_CENTS;

  if (hasActiveSubscription && isEligibleForSubscription) {
    return {
      canAccessCourse: true,
      accessType: "subscription",
      restrictions: ["Acceso mientras suscripción esté activa"],
    };
  }

  return {
    canAccessCourse: false,
    accessType: "none",
    restrictions: [`Este programa requiere compra individual (${formatPrice(coursePrice)})`],
  };
}

export function checkPaymentStatus(paymentSchedule: unknown): boolean {
  const schedule = Array.isArray(paymentSchedule) ? paymentSchedule : [];
  const now = new Date();

  const overduePayments = schedule.filter((payment) => {
    if (!payment || typeof payment !== "object") return false;
    const typed = payment as { paid?: boolean; due_date?: string };
    return !typed.paid && !!typed.due_date && new Date(typed.due_date) < now;
  });

  return overduePayments.length === 0;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "USD" }).format(cents / 100);
}
