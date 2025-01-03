import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

const supabaseUrl = "https://ffrdieftaulfjaymmexb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcmRpZWZ0YXVsZmpheW1tZXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3ODA5NzksImV4cCI6MjA0OTM1Njk3OX0.C-vtcsDCmGQQRFQiNqngVDf-GAd00dt1lxGd2Y_RVXE";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: "pkce",
    storage: localStorage,
    storageKey: "golflog-auth-token",
    debug: true
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
});