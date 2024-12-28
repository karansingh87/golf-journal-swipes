import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { TrendOutput } from "@/types/trends";
import TrendsHeader from "@/components/trends/TrendsHeader";
import TrendsContent from "@/components/trends/TrendsContent";
import { Button } from "@/components/ui/button";
import { Json } from "@/types/database";

// Type guard to validate TrendOutput structure
function isTrendOutput(json: Json): json is TrendOutput {
  if (typeof json !== 'object' || !json) return false;
  
  const candidate = json as any;
  return (
    Array.isArray(candidate.patterns) &&
    typeof candidate.metadata === 'object' &&
    candidate.metadata !== null &&
    typeof candidate.metadata.sessions_analyzed === 'number' &&
    typeof candidate.metadata.date_range === 'string' &&
    typeof candidate.metadata.analysis_confidence === 'number'
  );
}

const Trends = () => {
  const [trends, setTrends] = useState<TrendOutput | null>(null);
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
        // Validate the data structure before setting it
        if (isTrendOutput(data.trends_output)) {
          setTrends(data.trends_output);
        } else {
          console.error('Invalid trends output format:', data.trends_output);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Invalid trends data format",
          });
        }
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

  const formatContent = (pattern: any) => {
    if (!pattern?.supporting_details) {
      console.warn('Pattern is missing supporting details:', pattern);
      return pattern.primary_insight || 'No insight available';
    }
    return `${pattern.primary_insight}\n\n**Evidence:** ${pattern.supporting_details.evidence}\n\n**Context:** ${pattern.supporting_details.context}\n\n**Significance:** ${pattern.supporting_details.significance}`;
  };

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
            <TrendsContent trends={trends} formatContent={formatContent} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;