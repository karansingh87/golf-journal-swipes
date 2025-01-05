import { RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
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
        // Get recordings created after the last trends update
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
    <div className="space-y-2 pt-4">
      {newRecordingsCount >= 3 && (
        <Alert className="mb-2">
          <AlertDescription>
            You have {newRecordingsCount} new recordings since your last trends analysis. Consider refreshing your trends for updated insights.
          </AlertDescription>
        </Alert>
      )}
      <div className="w-full max-w-[90vw] mx-auto px-4 flex items-center justify-end gap-2 text-sm text-muted-foreground py-2">
        {lastUpdateTime && (
          <span>
            Updated {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleRefresh}
          disabled={isLoading || recordingsCount < 3}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default TrendsRefreshBar;