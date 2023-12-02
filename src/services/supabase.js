import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rsnybbwcorbsuupfaphb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbnliYndjb3Jic3V1cGZhcGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MzgwMTksImV4cCI6MjAxNjQxNDAxOX0.tpgGsbX0OjZ9oCzW2XOKBY-X0YhExkzbmMkoCRoK_zQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
