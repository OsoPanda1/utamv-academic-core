import { supabase } from "@/integrations/supabase/client";

export type TelemetryEventType = "campus.visit" | "campus.course_open" | "campus.lesson_completed" | "campus.error";

export interface TelemetryEventPayload {
  eventType: TelemetryEventType;
  userId?: string;
  courseId?: string;
  lessonId?: string;
  metadata?: Record<string, unknown>;
}

export async function logTelemetryEvent(payload: TelemetryEventPayload): Promise<void> {
  const { error } = await supabase.from("telemetry_events").insert({
    event_type: payload.eventType,
    user_id: payload.userId ?? null,
    course_id: payload.courseId ?? null,
    lesson_id: payload.lessonId ?? null,
    metadata: payload.metadata ?? {},
  });

  if (error) {
    console.error("Failed to log telemetry event", error);
  }
}
