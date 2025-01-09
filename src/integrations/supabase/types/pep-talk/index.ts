export * from './content';
export * from './section-types';

export interface PepTalk {
  id: string;
  user_id: string;
  content: PepTalkContent;
  recording_ids: string[];
  created_at: string | null;
  updated_at: string | null;
}