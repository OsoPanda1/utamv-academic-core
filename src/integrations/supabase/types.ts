export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_sessions: {
        Row: {
          context: string | null
          created_at: string
          id: string
          messages: Json | null
          session_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          messages?: Json | null
          session_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          messages?: Json | null
          session_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          code: string
          color: string
          created_at: string
          criteria: Json
          description: string
          icon: string
          id: string
          name: string
          tier: string
          tokens_reward: number
        }
        Insert: {
          code: string
          color?: string
          created_at?: string
          criteria?: Json
          description: string
          icon?: string
          id?: string
          name: string
          tier?: string
          tokens_reward?: number
        }
        Update: {
          code?: string
          color?: string
          created_at?: string
          criteria?: Json
          description?: string
          icon?: string
          id?: string
          name?: string
          tier?: string
          tokens_reward?: number
        }
        Relationships: []
      }
      block_utamv_chain: {
        Row: {
          block_hash: string
          block_index: number
          certificate_id: string
          certificate_number: string
          course_id: string
          created_at: string
          data_hash: string
          id: number
          nonce: string
          previous_hash: string
          user_id: string
        }
        Insert: {
          block_hash: string
          block_index: number
          certificate_id: string
          certificate_number: string
          course_id: string
          created_at?: string
          data_hash: string
          id?: number
          nonce: string
          previous_hash: string
          user_id: string
        }
        Update: {
          block_hash?: string
          block_index?: number
          certificate_id?: string
          certificate_number?: string
          course_id?: string
          created_at?: string
          data_hash?: string
          id?: number
          nonce?: string
          previous_hash?: string
          user_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          blockchain_hash: string | null
          certificate_number: string
          course_id: string
          final_score: number | null
          hours_completed: number | null
          id: string
          issued_at: string
          metadata: Json | null
          pdf_url: string | null
          qr_code_url: string | null
          user_id: string
          verification_url: string | null
        }
        Insert: {
          blockchain_hash?: string | null
          certificate_number: string
          course_id: string
          final_score?: number | null
          hours_completed?: number | null
          id?: string
          issued_at?: string
          metadata?: Json | null
          pdf_url?: string | null
          qr_code_url?: string | null
          user_id: string
          verification_url?: string | null
        }
        Update: {
          blockchain_hash?: string | null
          certificate_number?: string
          course_id?: string
          final_score?: number | null
          hours_completed?: number | null
          id?: string
          issued_at?: string
          metadata?: Json | null
          pdf_url?: string | null
          qr_code_url?: string | null
          user_id?: string
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_deleted: boolean | null
          is_pinned: boolean | null
          message_type: string | null
          room: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          is_pinned?: boolean | null
          message_type?: string | null
          room?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          is_pinned?: boolean | null
          message_type?: string | null
          room?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          is_free_preview: boolean | null
          learning_objectives: Json | null
          order_index: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_free_preview?: boolean | null
          learning_objectives?: Json | null
          order_index: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_free_preview?: boolean | null
          learning_objectives?: Json | null
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string | null
          certificate_enabled: boolean | null
          created_at: string
          description: string | null
          hours: number | null
          id: string
          instructor_avatar: string | null
          instructor_bio: string | null
          instructor_name: string | null
          is_active: boolean | null
          is_featured: boolean | null
          learning_outcomes: Json | null
          level: string | null
          obe_framework: Json | null
          prerequisites: Json | null
          price_mxn: number | null
          price_usd: number | null
          slug: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          subtitle: string | null
          syllabus: Json | null
          thumbnail_url: string | null
          title: string
          total_lessons: number | null
          total_quizzes: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          certificate_enabled?: boolean | null
          created_at?: string
          description?: string | null
          hours?: number | null
          id?: string
          instructor_avatar?: string | null
          instructor_bio?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          learning_outcomes?: Json | null
          level?: string | null
          obe_framework?: Json | null
          prerequisites?: Json | null
          price_mxn?: number | null
          price_usd?: number | null
          slug: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          subtitle?: string | null
          syllabus?: Json | null
          thumbnail_url?: string | null
          title: string
          total_lessons?: number | null
          total_quizzes?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          certificate_enabled?: boolean | null
          created_at?: string
          description?: string | null
          hours?: number | null
          id?: string
          instructor_avatar?: string | null
          instructor_bio?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          learning_outcomes?: Json | null
          level?: string | null
          obe_framework?: Json | null
          prerequisites?: Json | null
          price_mxn?: number | null
          price_usd?: number | null
          slug?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          subtitle?: string | null
          syllabus?: Json | null
          thumbnail_url?: string | null
          title?: string
          total_lessons?: number | null
          total_quizzes?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          amount_paid_mxn: number | null
          completed_at: string | null
          course_id: string
          enrolled_at: string
          expires_at: string | null
          id: string
          status: string | null
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount_paid_mxn?: number | null
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          expires_at?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount_paid_mxn?: number | null
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          expires_at?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          is_active: boolean | null
          linkedin_url: string | null
          name: string
          sort_order: number | null
          specialties: Json | null
          title: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          linkedin_url?: string | null
          name: string
          sort_order?: number | null
          specialties?: Json | null
          title?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string
          sort_order?: number | null
          specialties?: Json | null
          title?: string | null
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string
          id: string
          last_position_seconds: number | null
          lesson_id: string
          progress_percent: number | null
          updated_at: string
          user_id: string
          watch_time_seconds: number | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id: string
          id?: string
          last_position_seconds?: number | null
          lesson_id: string
          progress_percent?: number | null
          updated_at?: string
          user_id: string
          watch_time_seconds?: number | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          id?: string
          last_position_seconds?: number | null
          lesson_id?: string
          progress_percent?: number | null
          updated_at?: string
          user_id?: string
          watch_time_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          audio_url: string | null
          content: string | null
          course_id: string
          created_at: string
          duration_minutes: number | null
          id: string
          is_free_preview: boolean | null
          module_id: string
          order_index: number
          resources: Json | null
          title: string
          transcript: string | null
          type: string
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          content?: string | null
          course_id: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          module_id: string
          order_index: number
          resources?: Json | null
          title: string
          transcript?: string | null
          type?: string
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string | null
          course_id?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          module_id?: string
          order_index?: number
          resources?: Json | null
          title?: string
          transcript?: string | null
          type?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_stripe_events: {
        Row: {
          event_id: string
          event_type: string
          payload: Json | null
          processed_at: string
        }
        Insert: {
          event_id: string
          event_type: string
          payload?: Json | null
          processed_at?: string
        }
        Update: {
          event_id?: string
          event_type?: string
          payload?: Json | null
          processed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          display_name: string | null
          enrollment_date: string | null
          full_name: string | null
          id: string
          last_active: string | null
          linkedin_url: string | null
          phone: string | null
          profession: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          enrollment_date?: string | null
          full_name?: string | null
          id?: string
          last_active?: string | null
          linkedin_url?: string | null
          phone?: string | null
          profession?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          enrollment_date?: string | null
          full_name?: string | null
          id?: string
          last_active?: string | null
          linkedin_url?: string | null
          phone?: string | null
          profession?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          answers: Json | null
          completed_at: string | null
          course_id: string
          id: string
          passed: boolean | null
          quiz_id: string
          score: number | null
          started_at: string
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          course_id: string
          id?: string
          passed?: boolean | null
          quiz_id: string
          score?: number | null
          started_at?: string
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          course_id?: string
          id?: string
          passed?: boolean | null
          quiz_id?: string
          score?: number | null
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          attempts_allowed: number | null
          course_id: string
          created_at: string
          description: string | null
          id: string
          lesson_id: string | null
          module_id: string
          passing_score: number | null
          questions: Json
          time_limit_minutes: number | null
          title: string
        }
        Insert: {
          attempts_allowed?: number | null
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          lesson_id?: string | null
          module_id: string
          passing_score?: number | null
          questions?: Json
          time_limit_minutes?: number | null
          title: string
        }
        Update: {
          attempts_allowed?: number | null
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          lesson_id?: string | null
          module_id?: string
          passing_score?: number | null
          questions?: Json
          time_limit_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      tamv_federation_ring: {
        Row: {
          created_at: string
          ecg_rhythm: number | null
          id: string
          metadata: Json | null
          node_name: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          ecg_rhythm?: number | null
          id?: string
          metadata?: Json | null
          node_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          ecg_rhythm?: number | null
          id?: string
          metadata?: Json | null
          node_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      tamv_kernel_events: {
        Row: {
          created_at: string
          id: string
          payload: Json | null
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          payload?: Json | null
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          payload?: Json | null
          type?: string
        }
        Relationships: []
      }
      tamvcrums_logs: {
        Row: {
          created_at: string
          ecg_rhythm: number | null
          emotional_state: Json | null
          federation_id: string | null
          id: string
          impact_score: number | null
        }
        Insert: {
          created_at?: string
          ecg_rhythm?: number | null
          emotional_state?: Json | null
          federation_id?: string | null
          id?: string
          impact_score?: number | null
        }
        Update: {
          created_at?: string
          ecg_rhythm?: number | null
          emotional_state?: Json | null
          federation_id?: string | null
          id?: string
          impact_score?: number | null
        }
        Relationships: []
      }
      tts_jobs: {
        Row: {
          attempts: number
          audio_url: string | null
          created_at: string
          duration_ms: number | null
          error_message: string | null
          id: string
          lesson_id: string
          provider: string | null
          status: string
          updated_at: string
        }
        Insert: {
          attempts?: number
          audio_url?: string | null
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          lesson_id: string
          provider?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          attempts?: number
          audio_url?: string | null
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          lesson_id?: string
          provider?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          context: Json | null
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          context?: Json | null
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          context?: Json | null
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_tokens: {
        Row: {
          balance: number
          level: number
          total_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          level?: number
          total_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          level?: number
          total_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      leaderboard_view: {
        Row: {
          avatar_url: string | null
          badges_count: number | null
          display_name: string | null
          lessons_completed: number | null
          level: number | null
          tokens: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_certificate_number: { Args: never; Returns: string }
      get_last_block: {
        Args: never
        Returns: {
          block_hash: string
          block_index: number
        }[]
      }
      grant_badge: {
        Args: { _badge_code: string; _user_id: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "student" | "instructor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "student", "instructor"],
    },
  },
} as const
