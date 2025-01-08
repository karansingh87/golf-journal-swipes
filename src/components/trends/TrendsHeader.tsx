import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TrendsHeaderProps {
  lastUpdateTime: Date | null;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

const TrendsHeader = ({ lastUpdateTime, onRefresh, isLoading }: TrendsHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="h-14 backdrop-blur-sm border-b border-zinc-800/10 bg-white/80">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 hover:bg-zinc-50"
              onClick={() => navigate('/playbook')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-inter text-lg font-semibold uppercase tracking-wider text-zinc-900">
              Trends
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-zinc-50"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      {lastUpdateTime && (
        <div className="px-6 py-2 bg-zinc-50/80 border-b border-zinc-100">
          <span className="text-xs text-zinc-500">
            Last updated {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}
          </span>
        </div>
      )}
    </div>
  );
};

export default TrendsHeader;