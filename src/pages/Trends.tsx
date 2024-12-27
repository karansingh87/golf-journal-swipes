import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import AnalysisCard from "@/components/recording-detail/analysis/AnalysisCard";
import { Database } from "@/integrations/supabase/types";

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

  useEffect(() => {
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
          // Validate and transform the patterns array
          const patterns = Array.isArray(data.patterns) 
            ? data.patterns.map((pattern: any): TrendPattern => ({
                type: pattern.type,
                title: pattern.title,
                description: pattern.description,
                supporting_evidence: pattern.supporting_evidence,
                confidence_score: pattern.confidence_score,
                timespan: pattern.timespan,
                build_on_this: pattern.build_on_this
              }))
            : [];

          // Validate and transform the analysis metadata
          const metadata = typeof data.analysis_metadata === 'object' ? {
            sessions_analyzed: Number(data.analysis_metadata.sessions_analyzed) || 0,
            date_range: String(data.analysis_metadata.date_range) || '',
            total_insights_found: Number(data.analysis_metadata.total_insights_found) || 0,
            confidence_level: Number(data.analysis_metadata.confidence_level) || 0
          } : {
            sessions_analyzed: 0,
            date_range: '',
            total_insights_found: 0,
            confidence_level: 0
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

    fetchTrends();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-4xl mx-auto py-6 space-y-6">
        <div className="space-y-6 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Trends</h1>
          </div>
          <SegmentedNav />
          
          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center text-muted-foreground">
                Loading trends...
              </div>
            </div>
          ) : !trends ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center text-muted-foreground">
                No trends available yet. Add at least 3 recordings to see your progress!
              </div>
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