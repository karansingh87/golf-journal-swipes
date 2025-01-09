import { PepTalkContent } from './pep-talk';
import { SessionType, HandicapRange, CoachingFrequency, TrackingHabit } from './enums';

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
      recordings: {
        Row: {
          id: string;
          user_id: string;
          audio_url: string | null;
          transcription: string | null;
          duration: number | null;
          created_at: string | null;
          analysis: string | null;
          session_type: SessionType;
          insights: string | null;
          is_public: boolean | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          audio_url?: string | null;
          transcription?: string | null;
          duration?: number | null;
          created_at?: string | null;
          analysis?: string | null;
          session_type: SessionType;
          insights?: string | null;
          is_public?: boolean | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          audio_url?: string | null;
          transcription?: string | null;
          duration?: number | null;
          created_at?: string | null;
          analysis?: string | null;
          session_type?: SessionType;
          insights?: string | null;
          is_public?: boolean | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          age: number | null;
          location: string | null;
          email: string | null;
          updated_at: string | null;
          is_admin: boolean | null;
          display_name: string | null;
          handicap_range: HandicapRange | null;
          tracking_habit: TrackingHabit | null;
          coaching_frequency: CoachingFrequency | null;
          onboarding_completed: boolean | null;
          onboarding_skipped: boolean | null;
          onboarding_last_step: number | null;
        };
      };
    };
    Enums: {
      session_type: SessionType;
      handicap_range: HandicapRange;
      coaching_frequency: CoachingFrequency;
      tracking_habit: TrackingHabit;
    };
  };
}