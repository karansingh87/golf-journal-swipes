import { useState } from "react";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Trends = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trendsData, setTrendsData] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTrends = async () => {
    const { data: trends } = await supabase
      .from('trends')
      .select('trends_output')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (trends?.trends_output) {
      setTrendsData(trends.trends_output);
    }
  };

  const generateTrends = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.functions.invoke('generate-trends');
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Trends generation started. Please wait a moment and refresh.",
      });

      // Fetch the latest trends after a short delay
      setTimeout(fetchTrends, 3000);
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
      <div className="max-w-4xl mx-auto py-6 space-y-6">
        <div className="space-y-6 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Trends</h1>
            <Button 
              onClick={generateTrends} 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Trends
            </Button>
          </div>
          <SegmentedNav />
          
          {trendsData ? (
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {trendsData}
              </pre>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center text-muted-foreground">
                No trends data available. Click "Generate Trends" to create new trends.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;