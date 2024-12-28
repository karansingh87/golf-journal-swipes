import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import AnalysisCard from "@/components/recording-detail/analysis/AnalysisCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { Trend, TrendPattern, TrendAnalysisMetadata } from "@/types/trends";

const Trends = () => {
  const [trends, setTrends] = useState<Trend | null>(null);
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

      if (data) {
        const patterns = data.patterns as TrendPattern[];
        const analysis_metadata = data.analysis_metadata as TrendAnalysisMetadata;
        
        setTrends({
          patterns,
          analysis_metadata,
          created_at: data.created_at || new Date().toISOString()
        });
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

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-4xl mx-auto py-6 space-y-6">
        <div className="space-y-6 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Trends</h1>
            <Button 
              onClick={generateTrends} 
              disabled={generating}
              variant="outline"
            >
              {generating ? "Generating..." : "Generate Trends"}
            </Button>
          </div>
          <SegmentedNav />
          
          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center text-muted-foreground">
                Loading trends...
              </div>
            </div>
          ) : !trends ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
              <div className="text-center text-muted-foreground">
                No trends available yet. Add at least 3 recordings to see your progress!
              </div>
              <Button 
                onClick={generateTrends} 
                disabled={generating}
                variant="default"
              >
                {generating ? "Generating..." : "Generate Trends"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-6">
                {trends.patterns.map((pattern, index) => (
                  <AnalysisCard
                    key={pattern.title}
                    title={pattern.title}
                    content={`${pattern.insight}\n\n**Evidence:** ${pattern.pattern_evidence}\n\n**Timespan:** ${pattern.observation_window}\n\n**Deeper Meaning:** ${pattern.deeper_meaning}`}
                    index={index}
                    strengthRating={pattern.strength_rating}
                  />
                ))}
              </div>
              
              <div className="text-sm text-muted-foreground mt-4">
                <p>Analysis based on {trends.analysis_metadata.sessions_reviewed} sessions</p>
                <p>Time period: {trends.analysis_metadata.time_period}</p>
                <p>Pattern confidence: {trends.analysis_metadata.pattern_confidence}%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;