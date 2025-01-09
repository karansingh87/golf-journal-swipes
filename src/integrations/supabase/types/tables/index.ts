import type { PepTalkTable } from './pep-talk';
import type { Json } from '../json';

export interface Tables {
  pep_talk: PepTalkTable;
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
  };
  profiles: {
    Row: {
      age: number | null;
      coaching_frequency: 'regularly' | 'occasionally' | 'past_experience' | 'never' | null;
      display_name: string | null;
      email: string | null;
      handicap_range: 'scratch_or_better' | '1_5' | '6_10' | '11_15' | '16_20' | '21_25' | '26_plus' | 'new_to_golf' | null;
      id: string;
      is_admin: boolean | null;
      location: string | null;
      onboarding_completed: boolean | null;
      onboarding_last_step: number | null;
      onboarding_skipped: boolean | null;
      tracking_habit: 'no_tracking' | 'mental_notes' | 'phone_notes' | 'dedicated_journal' | null;
      updated_at: string | null;
    };
    Insert: {
      age?: number | null;
      coaching_frequency?: 'regularly' | 'occasionally' | 'past_experience' | 'never' | null;
      display_name?: string | null;
      email?: string | null;
      handicap_range?: 'scratch_or_better' | '1_5' | '6_10' | '11_15' | '16_20' | '21_25' | '26_plus' | 'new_to_golf' | null;
      id: string;
      is_admin?: boolean | null;
      location?: string | null;
      onboarding_completed?: boolean | null;
      onboarding_last_step?: number | null;
      onboarding_skipped?: boolean | null;
      tracking_habit?: 'no_tracking' | 'mental_notes' | 'phone_notes' | 'dedicated_journal' | null;
      updated_at?: string | null;
    };
    Update: {
      age?: number | null;
      coaching_frequency?: 'regularly' | 'occasionally' | 'past_experience' | 'never' | null;
      display_name?: string | null;
      email?: string | null;
      handicap_range?: 'scratch_or_better' | '1_5' | '6_10' | '11_15' | '16_20' | '21_25' | '26_plus' | 'new_to_golf' | null;
      id?: string;
      is_admin?: boolean | null;
      location?: string | null;
      onboarding_completed?: boolean | null;
      onboarding_last_step?: number | null;
      onboarding_skipped?: boolean | null;
      tracking_habit?: 'no_tracking' | 'mental_notes' | 'phone_notes' | 'dedicated_journal' | null;
      updated_at?: string | null;
    };
  };
  prompt_config: {
    Row: {
      coaching_prompt: string | null;
      created_at: string | null;
      id: string;
      model_name: string;
      model_provider: string;
      prompt: string;
      trends_prompt: string | null;
      updated_at: string | null;
    };
    Insert: {
      coaching_prompt?: string | null;
      created_at?: string | null;
      id?: string;
      model_name?: string;
      model_provider?: string;
      prompt: string;
      trends_prompt?: string | null;
      updated_at?: string | null;
    };
    Update: {
      coaching_prompt?: string | null;
      created_at?: string | null;
      id?: string;
      model_name?: string;
      model_provider?: string;
      prompt?: string;
      trends_prompt?: string | null;
      updated_at?: string | null;
    };
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
      session_type: 'course' | 'practice';
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
      session_type: 'course' | 'practice';
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
      session_type?: 'course' | 'practice';
      transcription?: string | null;
      user_id?: string;
    };
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
  };
}
