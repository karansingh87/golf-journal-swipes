import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecordPlaceholderCard = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/record")}
      className="w-full py-4 px-5 bg-zinc-900/80 
        backdrop-blur-sm hover:bg-zinc-900/90 rounded-2xl 
        shadow-md transition-all duration-200
        hover:shadow-lg hover:shadow-zinc-900/20
        flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <Mic className="w-4 h-4 text-white" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-sm leading-none mb-1.5 text-white">Record</h3>
        <p className="text-xs text-white/80 leading-tight">
          Record your golf swing thoughts and notes
        </p>
      </div>
    </button>
  );
};

export default RecordPlaceholderCard;