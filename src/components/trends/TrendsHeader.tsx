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
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-inter text-base font-semibold bg-zinc-800/95 text-zinc-100 px-2.5 py-1 rounded-md">
            TRENDS
          </h1>
          
          {lastUpdateTime && (
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-medium">
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
        
        <Button
          variant="ghost"
          size="sm"
          className="mt-4 -ml-2 text-zinc-500 hover:text-zinc-600 hover:bg-zinc-50"
          onClick={() => navigate('/playbook')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Playbook
        </Button>
      </div>
    </div>
  );
};

export default TrendsHeader;