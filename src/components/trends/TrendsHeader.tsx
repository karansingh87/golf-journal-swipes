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
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => navigate('/playbook')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-golf-gray-text-primary text-left">
          Trends
        </h1>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground pl-9 text-left">
        {lastUpdateTime && (
          <span>
            Updated {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default TrendsHeader;