import { LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrendsCard = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/trends')}
      className="w-full p-4 bg-card hover:bg-accent rounded-[32px] border transition-colors 
        flex flex-col items-start gap-1 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="relative w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-2xl mb-2">
        <LineChart className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-base leading-none">View Trends</h3>
      <p className="text-sm text-muted-foreground leading-tight">
        Track your progress
      </p>
    </button>
  );
};

export default TrendsCard;