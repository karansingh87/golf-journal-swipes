interface PepTalkItem {
  aspect?: string;
  detail?: string;
  proof?: string;
  type?: string;
  what?: string;
  when?: string;
  situation?: string;
  your_move?: string;
  last_success?: string;
  distance?: string;
  club?: string;
  pattern?: string;
  moment?: string;
  why_special?: string;
  repeatable_element?: string;
}

export interface PepTalkContent {
  hot_right_now: PepTalkItem[];
  working_well: PepTalkItem[];
  go_to_shots: PepTalkItem[];
  scoring_zones: PepTalkItem[];
  confidence_builders: PepTalkItem[];
}

export interface PepTalk {
  id: string;
  user_id: string;
  content: PepTalkContent;
  recording_ids: string[];
  created_at: string | null;
  updated_at: string | null;
}