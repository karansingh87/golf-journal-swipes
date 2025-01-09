import type { PepTalk } from '../pep-talk';

export interface PepTalkTable {
  Row: PepTalk;
  Insert: Omit<PepTalk, 'id' | 'created_at' | 'updated_at'>;
  Update: Partial<Omit<PepTalk, 'id'>>;
}