import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { CoachingNotesButton } from "./CoachingNotesButton";

interface TrendsRefreshBarProps {
  lastUpdateTime: Date | null;
  onRefresh: () => void;
  isLoading: boolean;
  recordingsCount: number;
}

const TrendsRefreshBar = ({
  lastUpdateTime,
  onRefresh,
  isLoading,
  recordingsCount,
}: TrendsRefreshBarProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading || recordingsCount < 3}
          className={isLoading ? "animate-spin" : ""}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        {lastUpdateTime && (
          <p className="text-sm text-muted-foreground">
            Last updated: {format(lastUpdateTime, "MMM d, yyyy h:mm a")}
          </p>
        )}
      </div>
      <CoachingNotesButton />
    </div>
  );
};

export default TrendsRefreshBar;