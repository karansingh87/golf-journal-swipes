export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          age: number | null
          email: string | null
          id: string
          is_admin: boolean | null
          location: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          email?: string | null
          id: string
          is_admin?: boolean | null
          location?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
          location?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prompt_config: {
        Row: {
          created_at: string | null
          id: string
          prompt: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          prompt: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          prompt?: string
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
          session_type?: Database["public"]["Enums"]["session_type"]
          transcription?: string | null
          user_id?: string
        }
        Relationships: []
      }
      trends: {
        Row: {
          analysis_metadata: Json
          analyzed_recordings: string[]
          created_at: string | null
          id: string
          last_analysis_at: string | null
          patterns: Json
          user_id: string
        }
        Insert: {
          analysis_metadata: Json
          analyzed_recordings: string[]
          created_at?: string | null
          id?: string
          last_analysis_at?: string | null
          patterns: Json
          user_id: string
        }
        Update: {
          analysis_metadata?: Json
          analyzed_recordings?: string[]
          created_at?: string | null
          id?: string
          last_analysis_at?: string | null
          patterns?: Json
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      should_generate_trends: {
        Args: {
          user_uuid: string
        }
        Returns: boolean
      }
    }
    Enums: {
      achievement_type:
        | "power_moves"
        | "mental_edge"
        | "breakthroughs"
        | "smart_plays"
        | "progress_zone"
      session_type: "course" | "practice"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
