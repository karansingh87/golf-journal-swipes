import { PepTalk } from './database';

export interface Tables {
  pep_talk: {
    Row: PepTalk;
    Insert: Omit<PepTalk, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<PepTalk, 'id'>>;
  };
      coaching_notes: {
        Row: {
          created_at: string | null
          id: string
          notes: string
          recording_ids: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes: string
          recording_ids: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
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
      profiles: {
        Row: {
          age: number | null
          coaching_frequency:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null
          display_name: string | null
          email: string | null
          handicap_range: Database["public"]["Enums"]["handicap_range"] | null
          id: string
          is_admin: boolean | null
          location: string | null
          onboarding_completed: boolean | null
          onboarding_last_step: number | null
          onboarding_skipped: boolean | null
          tracking_habit: Database["public"]["Enums"]["tracking_habit"] | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          coaching_frequency?:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null
          display_name?: string | null
          email?: string | null
          handicap_range?: Database["public"]["Enums"]["handicap_range"] | null
          id: string
          is_admin?: boolean | null
          location?: string | null
          onboarding_completed?: boolean | null
          onboarding_last_step?: number | null
          onboarding_skipped?: boolean | null
          tracking_habit?: Database["public"]["Enums"]["tracking_habit"] | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          coaching_frequency?:
            | Database["public"]["Enums"]["coaching_frequency"]
            | null
          display_name?: string | null
          email?: string | null
          handicap_range?: Database["public"]["Enums"]["handicap_range"] | null
          id?: string
          is_admin?: boolean | null
          location?: string | null
          onboarding_completed?: boolean | null
          onboarding_last_step?: number | null
          onboarding_skipped?: boolean | null
          tracking_habit?: Database["public"]["Enums"]["tracking_habit"] | null
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
}
