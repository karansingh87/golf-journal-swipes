export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          age: number | null;
          coaching_frequency:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null;
          display_name: string | null;
          email: string | null;
          handicap_range: Database["public"]["Enums"]["handicap_range"] | null;
          id: string;
          is_admin: boolean | null;
          location: string | null;
          onboarding_completed: boolean | null;
          onboarding_last_step: number | null;
          onboarding_skipped: boolean | null;
          tracking_habit: Database["public"]["Enums"]["tracking_habit"] | null;
          updated_at: string | null;
        };
        Insert: {
          age?: number | null;
          coaching_frequency?:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null;
          display_name?: string | null;
          email?: string | null;
          handicap_range?: Database["public"]["Enums"]["handicap_range"] | null;
          id: string;
          is_admin?: boolean | null;
          location?: string | null;
          onboarding_completed?: boolean | null;
          onboarding_last_step?: number | null;
          onboarding_skipped?: boolean | null;
          tracking_habit?: Database["public"]["Enums"]["tracking_habit"] | null;
          updated_at?: string | null;
        };
        Update: {
          age?: number | null;
          coaching_frequency?:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null;
          display_name?: string | null;
          email?: string | null;
          handicap_range?: Database["public"]["Enums"]["handicap_range"] | null;
          id?: string;
          is_admin?: boolean | null;
          location?: string | null;
          onboarding_completed?: boolean | null;
          onboarding_last_step?: number | null;
          onboarding_skipped?: boolean | null;
          tracking_habit?: Database["public"]["Enums"]["tracking_habit"] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      prompt_config: {
        Row: {
          created_at: string | null;
          id: string;
          prompt: string;
          trends_prompt: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          prompt: string;
          trends_prompt?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          prompt?: string;
          trends_prompt?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      prompt_history: {
        Row: {
          changed_at: string | null;
          changed_by: string | null;
          id: string;
          old_value: string;
          prompt_config_id: string;
          prompt_type: string;
        };
        Insert: {
          changed_at?: string | null;
          changed_by?: string | null;
          id?: string;
          old_value: string;
          prompt_config_id: string;
          prompt_type: string;
        };
        Update: {
          changed_at?: string | null;
          changed_by?: string | null;
          id?: string;
          old_value?: string;
          prompt_config_id: string;
          prompt_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "prompt_history_prompt_config_id_fkey"
            columns: ["prompt_config_id"]
            isOneToOne: false
            referencedRelation: "prompt_config"
            referencedColumns: ["id"]
          },
        ];
      };
      recordings: {
        Row: {
          analysis: string | null;
          audio_url: string | null;
          created_at: string | null;
          duration: number | null;
          id: string;
          insights: string | null;
          is_public: boolean | null;
          session_type: Database["public"]["Enums"]["session_type"];
          transcription: string | null;
          user_id: string;
        };
        Insert: {
          analysis?: string | null;
          audio_url?: string | null;
          created_at?: string | null;
          duration?: number | null;
          id?: string;
          insights?: string | null;
          is_public?: boolean | null;
          session_type: Database["public"]["Enums"]["session_type"];
          transcription?: string | null;
          user_id: string;
        };
        Update: {
          analysis?: string | null;
          audio_url?: string | null;
          created_at?: string | null;
          duration?: number | null;
          id?: string;
          insights?: string | null;
          is_public?: boolean | null;
          session_type?: Database["public"]["Enums"]["session_type"];
          transcription?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      trends: {
        Row: {
          analyzed_recordings: string[];
          created_at: string | null;
          id: string;
          last_analysis_at: string | null;
          milestone_type: string | null;
          trends_output: string | null;
          user_id: string;
        };
        Insert: {
          analyzed_recordings: string[];
          created_at?: string | null;
          id?: string;
          last_analysis_at?: string | null;
          milestone_type?: string | null;
          trends_output?: string | null;
          user_id: string;
        };
        Update: {
          analyzed_recordings?: string[];
          created_at?: string | null;
          id?: string;
          last_analysis_at?: string | null;
          milestone_type?: string | null;
          trends_output?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      coaching_frequency: "regularly" | "occasionally" | "past_experience" | "never";
      handicap_range:
        | "scratch_or_better"
        | "1_5"
        | "6_10"
        | "11_15"
        | "16_20"
        | "21_25"
        | "26_plus"
        | "new_to_golf";
      tracking_habit:
        | "no_tracking"
        | "mental_notes"
        | "phone_notes"
        | "dedicated_journal";
      session_type: "course" | "practice";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  }
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
