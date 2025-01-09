export interface CoachingNotesTable {
  Row: {
    created_at: string | null;
    id: string;
    notes: string;
    recording_ids: string[];
    updated_at: string | null;
    user_id: string;
  };
  Insert: {
    created_at?: string | null;
    id?: string;
    notes: string;
    recording_ids: string[];
    updated_at?: string | null;
    user_id: string;
  };
  Update: {
    created_at?: string | null;
    id?: string;
    notes?: string;
    recording_ids?: string[];
    updated_at?: string | null;
    user_id?: string;
  };
}