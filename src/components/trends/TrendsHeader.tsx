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
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 -ml-3 hover:bg-zinc-50"
              onClick={() => navigate('/playbook')}
            >
              <ArrowLeft className="h-5 w-5 text-zinc-900" />
            </Button>
            <h1 className="font-inter text-lg font-semibold tracking-tight text-zinc-700">
              TRENDS
            </h1>
          </div>
        </div>
      </div>
      {lastUpdateTime && (
        <div className="px-4 py-2 bg-zinc-50/30 border-b border-zinc-100">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-500 font-medium">
              Last updated {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 hover:bg-zinc-50"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-3.5 w-3.5 text-zinc-700 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsHeader;