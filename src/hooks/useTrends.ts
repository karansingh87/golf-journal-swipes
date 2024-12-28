import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTrends = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [trendsData, setTrendsData] = useState<any | null>(null);
  const [recordingsCount, setRecordingsCount] = useState<number>(0);
  const [milestone, setMilestone] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLatestTrends = async () => {
    try {
      setIsLoading(true);
      const { data: trends, error } = await supabase
        .from('trends')
        .select('trends_output, milestone_type')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === '503') {
          toast({
            title: "Server Temporarily Unavailable",
            description: "We're experiencing some technical difficulties. Please try again in a few minutes.",
            variant: "destructive",
          });
        } else {
          console.error('Error fetching trends:', error);
        }
        return;
      }

      if (trends?.trends_output) {
        try {
          const cleanTrendsOutput = trends.trends_output.replace(/```json\n|\n```/g, '');
          const parsedTrends = JSON.parse(cleanTrendsOutput);
          setTrendsData(parsedTrends);
          setMilestone(trends.milestone_type);
        } catch (error) {
          console.error('Error parsing trends data:', error);
          toast({
            title: "Error",
            description: "There was a problem processing your trends data. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error in fetchLatestTrends:', error);
      toast({
        title: "Connection Error",
        description: "Unable to reach the server. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecordingsCount = async () => {
    try {
      const { count, error } = await supabase
        .from('recordings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);
      
      if (error) {
        if (error.code === '503') {
          toast({
            title: "Server Temporarily Unavailable",
            description: "We're experiencing some technical difficulties. Please try again in a few minutes.",
            variant: "destructive",
          });
        }
        return;
      }
      
      setRecordingsCount(count || 0);
    } catch (error) {
      console.error('Error fetching recordings count:', error);
      toast({
        title: "Connection Error",
        description: "Unable to reach the server. Please check your internet connection and try again.",
        variant: "destructive",
      });
    }
  };

  const generateTrends = async () => {
    if (recordingsCount < 3) {
      toast({
        title: "Not enough recordings",
        description: "You need at least 3 recordings to generate trends.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.functions.invoke('generate-trends', {
        body: { user_id: userId }
      });
      
      if (error) {
        if (error.code === '503') {
          toast({
            title: "Server Temporarily Unavailable",
            description: "We're experiencing some technical difficulties. Please try again in a few minutes.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Success",
        description: "Trends generation started. Please wait a moment and refresh.",
      });

      // Fetch the latest trends after a short delay
      setTimeout(() => {
        fetchLatestTrends();
      }, 3000);
    } catch (error) {
      console.error('Error generating trends:', error);
      toast({
        title: "Connection Error",
        description: "Unable to reach the server. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    trendsData,
    recordingsCount,
    milestone,
    fetchLatestTrends,
    fetchRecordingsCount,
    generateTrends
  };
};