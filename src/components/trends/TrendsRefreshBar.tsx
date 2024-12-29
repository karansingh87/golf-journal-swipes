import { RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface TrendsRefreshBarProps {
  lastUpdateTime: Date | null;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
  recordingsCount: number;
}

const TrendsRefreshBar = ({ lastUpdateTime, onRefresh, isLoading, recordingsCount }: TrendsRefreshBarProps) => {
  const { toast } = useToast();

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
  );
};

export default TrendsRefreshBar;