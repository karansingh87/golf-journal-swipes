import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import TrendsContent from "@/components/trends/TrendsContent";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import { useToast } from "@/hooks/use-toast";
import TrendsHeader from "@/components/trends/TrendsHeader";
import { useTrendsInfo } from "@/hooks/useTrendsInfo";

const Trends = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trendsData, setTrendsData] = useState<any | null>(null);
  const [recordingsCount, setRecordingsCount] = useState<number>(0);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const { data: trendsInfo } = useTrendsInfo();
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!session) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    const fetchRecordingsCount = async () => {
      const { count } = await supabase
        .from('recordings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);
      
      setRecordingsCount(count || 0);
    };

    const fetchLatestTrends = async () => {
      try {
        const { data: trends, error } = await supabase
          .from('trends')
          .select('trends_output, milestone_type, last_analysis_at')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (trends?.trends_output) {
          try {
            const cleanTrendsOutput = trends.trends_output.replace(/```json\n|\n```/g, '');
            const parsedTrends = JSON.parse(cleanTrendsOutput);
            setTrendsData(parsedTrends);
            setMilestone(trends.milestone_type);
            setLastUpdateTime(new Date(trends.last_analysis_at));
          } catch (error) {
            console.error('Error parsing trends data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching latest trends:', error);
      }
    };

    fetchRecordingsCount();
    fetchLatestTrends();
  }, [session.user.id]);

  // Auto-refresh when there are 3 or more new recordings
  useEffect(() => {
    if (trendsInfo?.newRecordingsCount >= 3 && !isLoading) {
      generateTrends();
    }
  }, [trendsInfo?.newRecordingsCount]);

  const generateTrends = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.functions.invoke('generate-trends', {
        body: { user_id: session.user.id }
      });
      
      if (error) throw error;

      // Fetch the latest trends after a short delay
      setTimeout(async () => {
        const { data: trends, error: fetchError } = await supabase
          .from('trends')
          .select('trends_output, milestone_type, last_analysis_at')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (trends?.trends_output) {
          try {
            const cleanTrendsOutput = trends.trends_output.replace(/```json\n|\n```/g, '');
            const parsedTrends = JSON.parse(cleanTrendsOutput);
            setTrendsData(parsedTrends);
            setMilestone(trends.milestone_type);
            setLastUpdateTime(new Date(trends.last_analysis_at));
          } catch (error) {
            console.error('Error parsing trends data:', error);
          }
        }
      }, 3000);
    } catch (error) {
      console.error('Error generating trends:', error);
      toast({
        title: "Error",
        description: "Failed to generate trends. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto pt-14">
        <PageBreadcrumb currentPage="Trends" />
        <TrendsHeader
          lastUpdateTime={lastUpdateTime}
          isLoading={isLoading}
          onRefresh={generateTrends}
        />
        <div className="px-2 sm:px-6 lg:px-8 pt-4">
          <TrendsContent
            trendsData={trendsData}
            recordingsCount={recordingsCount}
            milestone={milestone}
            isLoading={isLoading}
            hasNewRecordings={trendsInfo?.newRecordingsCount >= 3}
          />
        </div>
      </div>
    </div>
  );
};

export default Trends;