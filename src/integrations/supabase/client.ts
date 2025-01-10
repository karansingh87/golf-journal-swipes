import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ffrdieftaulfjaymmexb.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcmRpZWZ0YXVsZmpheW1tZXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3ODA5NzksImV4cCI6MjA0OTM1Njk3OX0.C-vtcsDCmGQQRFQiNqngVDf-GAd00dt1lxGd2Y_RVXE";

// Ensure URL doesn't have any trailing colons or slashes
const cleanUrl = supabaseUrl.replace(/[:\/]+$/, '');

export const supabase = createClient<Database>(cleanUrl, supabaseAnonKey);