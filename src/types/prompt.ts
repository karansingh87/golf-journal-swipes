export type PromptType = 'analysis' | 'trends' | 'coaching' | 'pep_talk';

export interface PromptConfiguration {
  id: string;
  type: PromptType;
  content: string;
  model_provider: string;
  model_name: string;
  is_latest: boolean;
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
}