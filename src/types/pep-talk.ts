import type { Json } from "@/integrations/supabase/types";

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
  [key: string]: PepTalkItem[] | undefined;
}

export interface PepTalk {
  id: string;
  user_id: string;
  content: string;
  recording_ids: string[];
  created_at: string | null;
  updated_at: string | null;
}

export function isPepTalkContent(json: unknown): json is PepTalkContent {
  if (typeof json !== 'object' || json === null) return false;
  
  const content = json as Record<string, unknown>;
  const requiredKeys = [
    'hot_right_now',
    'working_well',
    'go_to_shots',
    'scoring_zones',
    'confidence_builders'
  ];
  
  return requiredKeys.every(key => 
    Array.isArray(content[key])
  );
}