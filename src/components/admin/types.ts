import { Json } from "@/integrations/supabase/types";

export interface ColorConfig {
  id: string;
  name: string;
  colors: Record<string, string>;
  is_active: boolean;
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

export type ColorConfigResponse = {
  id: string;
  name: string;
  colors: Json;
  is_active: boolean;
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

export const transformColorConfig = (config: ColorConfigResponse): ColorConfig => {
  return {
    ...config,
    colors: config.colors as Record<string, string>,
  };
};