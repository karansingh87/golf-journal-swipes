import { Tables } from './database'

export type TablesInsert<T extends keyof Tables> = Tables[T] extends { Insert: any }
  ? Tables[T]['Insert']
  : never

export type TablesUpdate<T extends keyof Tables> = Tables[T] extends { Update: any }
  ? Tables[T]['Update']
  : never

export type Database = {
  public: {
    Tables: Tables
    Views: {
      [_ in never]: never
    }
    Functions: {
      should_generate_trends: {
        Args: { user_uuid: string }
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
      session_type: SessionType
    }
  }
}