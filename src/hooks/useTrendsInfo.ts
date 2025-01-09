import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTrendsInfo = () => {
  const session = useSession();

  return useQuery({
    queryKey: ['latest_trends_info'],
    queryFn: async () => {
      const { data: trends } = await supabase
        .from('trends')
        .select('last_analysis_at')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!trends?.last_analysis_at) return { newRecordingsCount: 0 };

      const { count } = await supabase
        .from('recordings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session?.user?.id)
        .gt('created_at', trends.last_analysis_at);

      return { newRecordingsCount: count || 0 };
    },
    enabled: !!session?.user?.id,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};