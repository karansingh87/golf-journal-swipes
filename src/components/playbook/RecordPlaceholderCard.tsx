import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecordPlaceholderCard = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/record")}
      className="w-full py-4 px-5 bg-gradient-to-br from-rose-50/80 to-pink-100/80 
        backdrop-blur-sm hover:from-rose-100 hover:to-pink-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <Mic className="w-4 h-4 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-sm leading-none mb-1.5">Record</h3>
        <p className="text-xs text-muted-foreground/80 leading-tight">
          Record your golf swing thoughts and notes
        </p>
      </div>
    </button>
  );
};

export default RecordPlaceholderCard;