import { LineChart, BellDot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TrendsCard = () => {
  const navigate = useNavigate();
  const session = useSession();

  const { data: trendsInfo } = useQuery({
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

  const showNotification = trendsInfo?.newRecordingsCount >= 3;

  return (
    <button
      onClick={() => navigate('/trends')}
      className="w-full py-6 px-6 bg-gradient-to-br from-amber-50/80 to-orange-100/80
        backdrop-blur-sm hover:from-amber-100 hover:to-orange-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-4 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        relative"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <LineChart className="w-5 h-5 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-base leading-none mb-2">View Trends</h3>
        <p className="text-sm text-muted-foreground/80 leading-tight">
          Analyze patterns and progress over time
        </p>
      </div>
      {showNotification && (
        <div className="absolute top-4 right-4">
          <BellDot className="w-5 h-5 text-destructive animate-pulse" strokeWidth={2.5} />
        </div>
      )}
    </button>
  );
};

export default TrendsCard;