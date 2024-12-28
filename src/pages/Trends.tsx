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
        // Type assertion with validation
        const patterns = data.patterns as unknown as TrendPattern[];
        const analysis_metadata = data.analysis_metadata as unknown as TrendAnalysisMetadata;
        
        // Validate the data structure
        if (
          Array.isArray(patterns) && 
          patterns.every(pattern => 
            'type' in pattern && 
            'primary_insight' in pattern && 
            'supporting_details' in pattern &&
            'confidence_score' in pattern &&
            'timespan' in pattern &&
            typeof pattern.supporting_details === 'object' &&
            'evidence' in pattern.supporting_details &&
            'context' in pattern.supporting_details &&
            'significance' in pattern.supporting_details
          ) &&
          analysis_metadata &&
          'sessions_analyzed' in analysis_metadata &&
          'date_range' in analysis_metadata &&
          'analysis_confidence' in analysis_metadata
        ) {
          setTrends({
            patterns,
            analysis_metadata,
            created_at: data.created_at || new Date().toISOString()
          });
        } else {
          console.error('Invalid trends data structure:', data);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Invalid trends data structure received.",
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

  const formatContent = (pattern: TrendPattern) => {
    return `${pattern.primary_insight}\n\n**Evidence:** ${pattern.supporting_details.evidence}\n\n**Context:** ${pattern.supporting_details.context}\n\n**Significance:** ${pattern.supporting_details.significance}`;
  };

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
                    key={pattern.primary_insight}
                    title={pattern.primary_insight}
                    content={formatContent(pattern)}
                    index={index}
                    strengthRating={pattern.confidence_score}
                  />
                ))}
              </div>
              
              <div className="text-sm text-muted-foreground mt-4">
                <p>Analysis based on {trends.analysis_metadata.sessions_analyzed} sessions</p>
                <p>Time period: {trends.analysis_metadata.date_range}</p>
                <p>Pattern confidence: {trends.analysis_metadata.analysis_confidence}%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;