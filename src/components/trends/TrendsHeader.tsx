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
      <div className="border-b border-zinc-100">
        <div className="flex items-center justify-between py-4 px-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 hover:bg-zinc-50"
              onClick={() => navigate('/playbook')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-inter text-lg font-semibold uppercase tracking-wider text-zinc-600">
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
        <div className="px-2 py-2 bg-zinc-50/50">
          <span className="text-xs text-zinc-500">
            Last updated {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}
          </span>
        </div>
      )}
    </div>
  );
};

export default TrendsHeader;