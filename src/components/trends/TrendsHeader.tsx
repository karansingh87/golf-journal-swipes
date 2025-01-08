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
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 -ml-1 hover:bg-zinc-50"
              onClick={() => navigate('/playbook')}
            >
              <ArrowLeft className="h-5 w-5 text-zinc-900" />
            </Button>
            <h1 className="font-inter text-[22px] font-semibold tracking-tight text-zinc-900">
              TRENDS
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-zinc-50"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 text-zinc-700 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      {lastUpdateTime && (
        <div className="px-4 py-3 bg-zinc-50/50">
          <span className="text-sm text-zinc-500 font-medium">
            Last updated {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}
          </span>
        </div>
      )}
    </div>
  );
};

export default TrendsHeader;