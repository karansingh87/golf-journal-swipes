export interface PepTalk {
  id: string;
  user_id: string;
  content: PepTalkContent;
  recording_ids: string[];
  created_at: string | null;
  updated_at: string | null;
}

export interface PepTalkContent {
  hot_right_now: Array<{
    aspect: string;
    detail: string;
    proof: string;
  }>;
  working_well: Array<{
    type: string;
    what: string;
    when: string;
  }>;
  go_to_shots: Array<{
    situation: string;
    your_move: string;
    last_success: string;
  }>;
  scoring_zones: Array<{
    distance: string;
    club: string;
    pattern: string;
  }>;
  confidence_builders: Array<{
    moment: string;
    why_special: string;
    repeatable_element: string;
  }>;
}