import { LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTrendsInfo } from "@/hooks/useTrendsInfo";
import TrendsNotification from "@/components/trends/TrendsNotification";

const TrendsCard = () => {
  const navigate = useNavigate();
  const { data: trendsInfo } = useTrendsInfo();
  const showNotification = trendsInfo?.newRecordingsCount >= 3;

  return (
    <button
      onClick={() => navigate('/trends')}
      className="w-full py-6 px-6 bg-gradient-to-br from-amber-50/80 to-orange-100/80
        backdrop-blur-sm hover:from-amber-100 hover:to-orange-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-4 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        relative"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <LineChart className="w-5 h-5 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-base leading-none mb-2">View Trends</h3>
        <p className="text-sm text-muted-foreground/80 leading-tight">
          Analyze patterns and progress over time
        </p>
      </div>
      <TrendsNotification show={showNotification} />
    </button>
  );
};

export default TrendsCard;