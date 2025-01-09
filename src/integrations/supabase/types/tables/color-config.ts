import { Json } from '../json';

export interface ColorConfigTable {
  Row: {
    colors: Json;
    created_at: string | null;
    created_by: string | null;
    id: string;
    is_active: boolean | null;
    name: string;
    updated_at: string | null;
    updated_by: string | null;
  };
  Insert: {
    colors: Json;
    created_at?: string | null;
    created_by?: string | null;
    id?: string;
    is_active?: boolean | null;
    name: string;
    updated_at?: string | null;
    updated_by?: string | null;
  };
  Update: {
    colors?: Json;
    created_at?: string | null;
    created_by?: string | null;
    id?: string;
    is_active?: boolean | null;
    name?: string;
    updated_at?: string | null;
    updated_by?: string | null;
  };
}