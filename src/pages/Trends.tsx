import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import AnalysisCard from "@/components/recording-detail/analysis/AnalysisCard";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";

interface TrendPattern {
  type: 'power_moves' | 'mental_edge' | 'breakthroughs' | 'smart_plays' | 'progress_zone';
  title: string;
  description: string;
  supporting_evidence: string;
  confidence_score: number;
  timespan: string;
  build_on_this: string;
}

interface TrendAnalysisMetadata {
  sessions_analyzed: number;
  date_range: string;
  total_insights_found: number;
  confidence_level: number;
}

interface Trend {
  patterns: TrendPattern[];
  analysis_metadata: TrendAnalysisMetadata;
  created_at: string;
}

type DbTrend = Database['public']['Tables']['trends']['Row'];

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
        // Type guard to ensure patterns is an array and transform it
        const patterns = Array.isArray(data.patterns) 
          ? data.patterns.map((pattern: any): TrendPattern => ({
              type: pattern.type || 'power_moves',
              title: pattern.title || '',
              description: pattern.description || '',
              supporting_evidence: pattern.supporting_evidence || '',
              confidence_score: Number(pattern.confidence_score) || 0,
              timespan: pattern.timespan || '',
              build_on_this: pattern.build_on_this || ''
            }))
          : [];

        // Type guard and transform analysis_metadata
        const rawMetadata = data.analysis_metadata as Record<string, any>;
        const metadata: TrendAnalysisMetadata = {
          sessions_analyzed: Number(rawMetadata?.sessions_analyzed) || 0,
          date_range: String(rawMetadata?.date_range || ''),
          total_insights_found: Number(rawMetadata?.total_insights_found) || 0,
          confidence_level: Number(rawMetadata?.confidence_level) || 0
        };

        const transformedTrend: Trend = {
          patterns,
          analysis_metadata: metadata,
          created_at: data.created_at || new Date().toISOString()
        };
        
        setTrends(transformedTrend);
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

      // Fetch the new trends after a short delay
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
                    content={`${pattern.description}\n\n**Evidence:** ${pattern.supporting_evidence}\n\n**Timespan:** ${pattern.timespan}\n\n**Build on this:** ${pattern.build_on_this}`}
                    index={index}
                  />
                ))}
              </div>
              
              <div className="text-sm text-muted-foreground mt-4">
                <p>Analysis based on {trends.analysis_metadata.sessions_analyzed} sessions</p>
                <p>Date range: {trends.analysis_metadata.date_range}</p>
                <p>Total insights found: {trends.analysis_metadata.total_insights_found}</p>
                <p>Confidence level: {trends.analysis_metadata.confidence_level}%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;