import { useState, useEffect } from "react";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PatternCard from "@/components/trends/PatternCard";

const Trends = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trendsData, setTrendsData] = useState<any | null>(null);
  const [recordingsCount, setRecordingsCount] = useState<number>(0);
  const [milestone, setMilestone] = useState<string | null>(null);
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

    fetchRecordingsCount();
  }, [session.user.id]);

  const fetchTrends = async () => {
    const { data: trends } = await supabase
      .from('trends')
      .select('trends_output, milestone_type')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (trends?.trends_output) {
      try {
        const parsedTrends = JSON.parse(trends.trends_output);
        setTrendsData(parsedTrends);
        setMilestone(trends.milestone_type);
      } catch (error) {
        console.error('Error parsing trends data:', error);
        toast({
          title: "Error",
          description: "Failed to parse trends data.",
          variant: "destructive",
        });
      }
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
        body: { user_id: session.user.id }
      });
      
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
          {/* Header section */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <h1 className="text-2xl font-semibold text-foreground">Trends</h1>
            <Button 
              onClick={generateTrends} 
              disabled={isLoading || recordingsCount < 3}
              className="min-w-[150px]"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Trends
            </Button>
          </div>
          
          <SegmentedNav />
          
          {recordingsCount < 3 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need at least 3 recordings to generate trends. You currently have {recordingsCount} recording{recordingsCount !== 1 ? 's' : ''}.
              </AlertDescription>
            </Alert>
          )}
          
          {milestone && (
            <Alert>
              <AlertDescription>
                🎉 {milestone === 'return' 
                  ? "Welcome back! Here's an analysis of your recent progress." 
                  : `Congratulations on reaching your ${milestone} recording milestone!`}
              </AlertDescription>
            </Alert>
          )}
          
          {trendsData ? (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {trendsData.patterns?.map((pattern: any, index: number) => (
                <PatternCard key={index} pattern={pattern} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center text-muted-foreground">
                {recordingsCount >= 3 
                  ? "No trends data available. Click \"Generate Trends\" to create new trends."
                  : "Record more sessions to unlock trends analysis."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;
