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
      <div className="flex flex-col px-5 py-6 space-y-2">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -ml-1.5 hover:bg-zinc-50"
            onClick={() => navigate('/playbook')}
          >
            <ArrowLeft className="h-[18px] w-[18px] text-zinc-900" />
          </Button>
          <h1 className="font-inter text-[22px] font-semibold tracking-tight text-zinc-900 ml-3">
            TRENDS
          </h1>
        </div>
        
        {lastUpdateTime && (
          <div className="flex items-center gap-2 ml-9">
            <span className="text-[15px] text-zinc-500">
              Last updated {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-zinc-50"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 text-zinc-600 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendsHeader;