import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

const supabaseUrl = "https://ffrdieftaulfjaymmexb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcmRpZWZ0YXVsZmpheW1tZXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NTQ4MDAsImV4cCI6MjAyNjAzMDgwMH0.mYqQF9RzrkNkGUGnQMqQVXXTFPd8QO2Hy_9yOOPZAQE";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});