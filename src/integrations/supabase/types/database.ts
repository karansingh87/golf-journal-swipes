import { PepTalkContent } from './pep-talk';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      pep_talk: {
        Row: {
          id: string;
          user_id: string;
          content: PepTalkContent;
          recording_ids: string[];
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: PepTalkContent;
          recording_ids: string[];
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: PepTalkContent;
          recording_ids?: string[];
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      coaching_notes: {
        Row: {
          created_at: string | null;
          id: string;
          notes: string;
          recording_ids: string[];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          notes: string;
          recording_ids: string[];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          notes?: string;
          recording_ids?: string[];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      color_config: {
        Row: {
          colors: Json;
          created_at: string | null;
          created_by: string | null;
          id: string;
          is_active: boolean | null;
          name: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          colors: Json;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          is_active?: boolean | null;
          name: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          colors?: Json;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          is_active?: boolean | null;
          name?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [];
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
  };
}
