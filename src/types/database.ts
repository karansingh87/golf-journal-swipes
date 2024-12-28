export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type SessionType = "course" | "practice"

export interface Tables {
  profiles: {
    Row: {
      age: number | null
      email: string | null
      id: string
      is_admin: boolean | null
      location: string | null
      updated_at: string | null
    }
  }
  prompt_config: {
    Row: {
      created_at: string | null
      id: string
      prompt: string
      trends_prompt: string | null
      updated_at: string | null
    }
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
  }
  recordings: {
    Row: {
      analysis: string | null
      audio_url: string | null
      created_at: string | null
      duration: number | null
      id: string
      insights: string | null
      session_type: SessionType
      transcription: string | null
      user_id: string
    }
  }
  trends: {
    Row: {
      analyzed_recordings: string[]
      created_at: string | null
      id: string
      last_analysis_at: string | null
      trends_output: Json | null
      user_id: string
    }
  }
}