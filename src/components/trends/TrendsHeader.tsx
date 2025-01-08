import { RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TrendsHeaderProps {
  lastUpdateTime: Date | null;
  isLoading: boolean;
  onRefresh: () => void;
}

const TrendsHeader = ({ lastUpdateTime, isLoading, onRefresh }: TrendsHeaderProps) => {
  return (
    <div className="px-6 py-2 pt-2 flex items-center justify-between">
      <span className="text-xs font-light text-zinc-300">
        {lastUpdateTime ? `Updated ${formatDistanceToNow(lastUpdateTime)} ago` : 'No updates yet'}
      </span>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="text-zinc-300 hover:text-foreground transition-colors"
      >
        <RefreshCw 
          className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
          strokeWidth={2}
        />
      </button>
    </div>
  );
};

export default TrendsHeader;