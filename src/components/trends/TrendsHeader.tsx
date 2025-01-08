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
    <div className="border-b border-zinc-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -ml-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
            onClick={() => navigate('/playbook')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-inter text-base font-medium text-zinc-700">
            Trends
          </h1>
        </div>
        
        {lastUpdateTime && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">
              Updated {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-zinc-50"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-3 w-3 text-zinc-400 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendsHeader;