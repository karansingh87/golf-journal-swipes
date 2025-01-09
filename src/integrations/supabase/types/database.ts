import { Json } from './json';
import { PepTalk } from './pep-talk';
import { Tables } from './tables';

export type Database = {
  public: {
    Tables: Tables;
    Views: {
      admin_status: {
        Row: {
          id: string | null;
          is_admin: boolean | null;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: {
      achievement_type:
        | "power_moves"
        | "mental_edge"
        | "breakthroughs"
        | "smart_plays"
        | "progress_zone";
      coaching_frequency:
        | "regularly"
        | "occasionally"
        | "past_experience"
        | "never";
      handicap_range:
        | "scratch_or_better"
        | "1_5"
        | "6_10"
        | "11_15"
        | "16_20"
        | "21_25"
        | "26_plus"
        | "new_to_golf";
      pep_talk_section_type:
        | "hot_right_now"
        | "working_well"
        | "go_to_shots"
        | "scoring_zones"
        | "confidence_builders";
      session_type: "course" | "practice";
      tracking_habit:
        | "no_tracking"
        | "mental_notes"
        | "phone_notes"
        | "dedicated_journal";
    };
  };
};

export type { Json, PepTalk };