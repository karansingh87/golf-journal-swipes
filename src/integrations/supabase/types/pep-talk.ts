export interface PepTalkSection {
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
  hot_right_now: PepTalkSection[];
  working_well: PepTalkSection[];
  go_to_shots: PepTalkSection[];
  scoring_zones: PepTalkSection[];
  confidence_builders: PepTalkSection[];
}

export interface PepTalk {
  id: string;
  user_id: string;
  content: PepTalkContent;
  recording_ids: string[];
  created_at: string | null;
  updated_at: string | null;
}