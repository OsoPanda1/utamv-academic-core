// NOTA: módulo placeholder. La lógica de suscripciones/installments aún no está
// implementada en BD. Mantenemos las firmas para futura integración.
export interface AccessControl {
  canAccessCourse: boolean;
  accessType: "subscription" | "purchased" | "installment" | "none";
  restrictions?: string[];
}

export async function checkCourseAccess(
  _userId: string,
  _courseId: string,
  _coursePrice: number,
): Promise<AccessControl> {
  return {
    canAccessCourse: false,
    accessType: "none",
    restrictions: ["Suscripciones aún no habilitadas. Usa la inscripción individual del curso."],
  };
}

export function checkPaymentStatus(paymentSchedule: unknown): boolean {
  const schedule = Array.isArray(paymentSchedule) ? paymentSchedule : [];
  const now = new Date();
  return !schedule.some((payment) => {
    if (!payment || typeof payment !== "object") return false;
    const typed = payment as { paid?: boolean; due_date?: string };
    return !typed.paid && !!typed.due_date && new Date(typed.due_date) < now;
  });
}
