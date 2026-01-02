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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      coaching_notes: {
        Row: {
          created_at: string | null
          id: string
          is_public: boolean | null
          notes: string
          recording_ids: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          notes: string
          recording_ids: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          notes?: string
          recording_ids?: string[]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      color_config: {
        Row: {
          colors: Json
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          colors: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          colors?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      pep_talk: {
        Row: {
          content: string
          created_at: string | null
          id: string
          recording_ids: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          recording_ids: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          recording_ids?: string[]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          coaching_frequency:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null
          current_period_end: string | null
          display_name: string | null
          email: string | null
          handicap_range: Database["public"]["Enums"]["handicap_range"] | null
          has_had_trial: boolean | null
          has_pro_access: boolean
          id: string
          is_admin: boolean | null
          location: string | null
          onboarding_completed: boolean | null
          onboarding_last_step: number | null
          onboarding_skipped: boolean | null
          stripe_customer_id: string | null
          subscription_status: string | null
          subscription_tier: string | null
          tracking_habit: Database["public"]["Enums"]["tracking_habit"] | null
          trial_end: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          coaching_frequency?:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null
          current_period_end?: string | null
          display_name?: string | null
          email?: string | null
          handicap_range?: Database["public"]["Enums"]["handicap_range"] | null
          has_had_trial?: boolean | null
          has_pro_access?: boolean
          id: string
          is_admin?: boolean | null
          location?: string | null
          onboarding_completed?: boolean | null
          onboarding_last_step?: number | null
          onboarding_skipped?: boolean | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          tracking_habit?: Database["public"]["Enums"]["tracking_habit"] | null
          trial_end?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          coaching_frequency?:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null
          current_period_end?: string | null
          display_name?: string | null
          email?: string | null
          handicap_range?: Database["public"]["Enums"]["handicap_range"] | null
          has_had_trial?: boolean | null
          has_pro_access?: boolean
          id?: string
          is_admin?: boolean | null
          location?: string | null
          onboarding_completed?: boolean | null
          onboarding_last_step?: number | null
          onboarding_skipped?: boolean | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          tracking_habit?: Database["public"]["Enums"]["tracking_habit"] | null
          trial_end?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prompt_config: {
        Row: {
          coaching_prompt: string | null
          created_at: string | null
          id: string
          model_name: string
          model_provider: string
          pep_talk_prompt: string | null
          prompt: string
          trends_prompt: string | null
          updated_at: string | null
        }
        Insert: {
          coaching_prompt?: string | null
          created_at?: string | null
          id?: string
          model_name?: string
          model_provider?: string
          pep_talk_prompt?: string | null
          prompt: string
          trends_prompt?: string | null
          updated_at?: string | null
        }
        Update: {
          coaching_prompt?: string | null
          created_at?: string | null
          id?: string
          model_name?: string
          model_provider?: string
          pep_talk_prompt?: string | null
          prompt?: string
          trends_prompt?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prompt_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          old_value: string
          prompt_config_id: string
          prompt_type: string
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          old_value: string
          prompt_config_id: string
          prompt_type: string
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          old_value?: string
          prompt_config_id?: string
          prompt_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_history_prompt_config_id_fkey"
            columns: ["prompt_config_id"]
            isOneToOne: false
            referencedRelation: "prompt_config"
            referencedColumns: ["id"]
          },
        ]
      }
      recordings: {
        Row: {
          analysis: string | null
          audio_url: string | null
          created_at: string | null
          duration: number | null
          id: string
          insights: string | null
          is_public: boolean | null
          session_type: Database["public"]["Enums"]["session_type"]
          transcription: string | null
          user_id: string
        }
        Insert: {
          analysis?: string | null
          audio_url?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          insights?: string | null
          is_public?: boolean | null
          session_type: Database["public"]["Enums"]["session_type"]
          transcription?: string | null
          user_id: string
        }
        Update: {
          analysis?: string | null
          audio_url?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          insights?: string | null
          is_public?: boolean | null
          session_type?: Database["public"]["Enums"]["session_type"]
          transcription?: string | null
          user_id?: string
        }
        Relationships: []
      }
      trends: {
        Row: {
          analyzed_recordings: string[]
          created_at: string | null
          id: string
          last_analysis_at: string | null
          milestone_type: string | null
          trends_output: string | null
          user_id: string
        }
        Insert: {
          analyzed_recordings: string[]
          created_at?: string | null
          id?: string
          last_analysis_at?: string | null
          milestone_type?: string | null
          trends_output?: string | null
          user_id: string
        }
        Update: {
          analyzed_recordings?: string[]
          created_at?: string | null
          id?: string
          last_analysis_at?: string | null
          milestone_type?: string | null
          trends_output?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { user_id: string }; Returns: boolean }
      set_app_context: { Args: { context: string }; Returns: string }
    }
    Enums: {
      achievement_type:
        | "power_moves"
        | "mental_edge"
        | "breakthroughs"
        | "smart_plays"
        | "progress_zone"
      coaching_frequency:
        | "regularly"
        | "occasionally"
        | "past_experience"
        | "never"
      handicap_range:
        | "scratch_or_better"
        | "1_5"
        | "6_10"
        | "11_15"
        | "16_20"
        | "21_25"
        | "26_plus"
        | "new_to_golf"
      pep_talk_section_type:
        | "hot_right_now"
        | "working_well"
        | "go_to_shots"
        | "scoring_zones"
        | "confidence_builders"
      prompt_type: "analysis" | "trends" | "coaching" | "pep_talk"
      session_type: "course" | "practice"
      tracking_habit:
        | "no_tracking"
        | "mental_notes"
        | "phone_notes"
        | "dedicated_journal"
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
      achievement_type: [
        "power_moves",
        "mental_edge",
        "breakthroughs",
        "smart_plays",
        "progress_zone",
      ],
      coaching_frequency: [
        "regularly",
        "occasionally",
        "past_experience",
        "never",
      ],
      handicap_range: [
        "scratch_or_better",
        "1_5",
        "6_10",
        "11_15",
        "16_20",
        "21_25",
        "26_plus",
        "new_to_golf",
      ],
      pep_talk_section_type: [
        "hot_right_now",
        "working_well",
        "go_to_shots",
        "scoring_zones",
        "confidence_builders",
      ],
      prompt_type: ["analysis", "trends", "coaching", "pep_talk"],
      session_type: ["course", "practice"],
      tracking_habit: [
        "no_tracking",
        "mental_notes",
        "phone_notes",
        "dedicated_journal",
      ],
    },
  },
} as const
