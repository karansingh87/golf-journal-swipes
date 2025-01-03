import { PostgrestError } from "@supabase/supabase-js";

export type QueryResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

export const handleQueryResponse = <T>(response: QueryResponse<T>) => {
  if (response.error) {
    console.error('Supabase query error:', response.error);
    throw response.error;
  }
  return response.data;
};

export const isQueryError = (error: unknown): error is PostgrestError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'details' in error
  );
};