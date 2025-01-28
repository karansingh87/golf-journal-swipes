import { LineChart } from "lucide-react";
import { useTrendsInfo } from "@/hooks/useTrendsInfo";
import TrendsNotification from "@/components/trends/TrendsNotification";

interface TrendsCardProps {
  onClick: () => void;
}

const TrendsCard = ({ onClick }: TrendsCardProps) => {
  const { data: trendsInfo } = useTrendsInfo();
  const showNotification = trendsInfo?.newRecordingsCount >= 3;

  return (
    <button
      onClick={onClick}
      className="w-full py-4 px-5 bg-zinc-150/80 
        backdrop-blur-sm hover:bg-zinc-900 hover:text-white rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        relative"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <LineChart className="w-4 h-4 text-zinc-950 group-hover:text-white" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-sm leading-none mb-1.5">Trends</h3>
        <p className="text-xs text-muted-foreground/80 leading-tight">
          {showNotification 
            ? "Your new trends are ready!"
            : "Analyze patterns and progress over time"
          }
        </p>
      </div>
      <TrendsNotification show={showNotification} />
    </button>
  );
};

export default TrendsCard;