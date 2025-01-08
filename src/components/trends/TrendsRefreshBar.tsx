import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TrendsRefreshBarProps {
  lastUpdateTime: Date | null;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
  recordingsCount: number;
}

const TrendsRefreshBar = ({ lastUpdateTime, onRefresh, isLoading, recordingsCount }: TrendsRefreshBarProps) => {
  const { toast } = useToast();
  const [newRecordingsCount, setNewRecordingsCount] = useState(0);

  useEffect(() => {
    const checkNewRecordings = async () => {
      if (!lastUpdateTime) {
        setNewRecordingsCount(recordingsCount);
        return;
      }

      try {
        const { count } = await supabase
          .from('recordings')
          .select('*', { count: 'exact', head: true })
          .gt('created_at', lastUpdateTime.toISOString());

        console.log('New recordings since last trends:', count);
        setNewRecordingsCount(count || 0);
      } catch (error) {
        console.error('Error checking new recordings:', error);
        setNewRecordingsCount(0);
      }
    };

    checkNewRecordings();
  }, [lastUpdateTime, recordingsCount]);

  const handleRefresh = async () => {
    if (recordingsCount < 3) {
      toast({
        title: "Not enough recordings",
        description: "You need at least 3 recordings to generate trends.",
        variant: "destructive",
      });
      return;
    }
    await onRefresh();
  };

  return (
    <div>
      {newRecordingsCount >= 3 && (
        <Alert className="mb-1">
          <AlertDescription>
            You have new recordings since your last trends analysis. Refresh for updated insights.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default TrendsRefreshBar;