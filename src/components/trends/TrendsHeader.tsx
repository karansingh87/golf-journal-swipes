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
        <div className="flex flex-col py-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 hover:bg-zinc-50 -ml-1 mb-1"
            onClick={() => navigate('/playbook')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-inter text-lg font-semibold uppercase tracking-wider text-zinc-600 px-1">
            Trends
          </h1>
          <div className="absolute right-6 top-4">
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