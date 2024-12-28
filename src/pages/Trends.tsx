import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import TrendsHeader from "@/components/trends/TrendsHeader";

const Trends = () => {
  const [trendsData, setTrendsData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();
  const session = useSession();

  const fetchTrends = async () => {
    try {
      const { data, error } = await supabase
        .from('trends')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching trends:', error);
        return;
      }

      if (data?.trends_output) {
        setTrendsData(data.trends_output);
      }
    } catch (error) {
      console.error('Error in fetchTrends:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTrends = async () => {
    if (!session?.user?.id) return;
    
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-trends', {
        body: { user_id: session.user.id }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Trends generation started. Please wait a moment and refresh.",
      });

      setTimeout(fetchTrends, 3000);
    } catch (error) {
      console.error('Error generating trends:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate trends. Please try again.",
      });
    } finally {
      setGenerating(false);
    }
  };

  useState(() => {
    fetchTrends();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-4xl mx-auto py-6 space-y-6">
        <div className="space-y-6 px-4 sm:px-6 md:px-8">
          <TrendsHeader onGenerateTrends={generateTrends} generating={generating} />
          <SegmentedNav />
          
          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center text-muted-foreground">
                Loading trends...
              </div>
            </div>
          ) : !trendsData ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
              <div className="text-center text-muted-foreground">
                No trends available yet. Add at least 3 recordings to see your progress!
              </div>
            </div>
          ) : (
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
              <pre className="whitespace-pre-wrap overflow-x-auto">
                {trendsData}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;