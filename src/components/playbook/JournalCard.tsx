import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JournalCard = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/record")}
      className="w-full py-4 px-4 bg-gradient-to-br from-purple-50/80 to-indigo-100/80 
        backdrop-blur-sm hover:from-purple-100 hover:to-indigo-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <Mic className="w-4 h-4 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-sm leading-none mb-1.5">Journal Now</h3>
        <p className="text-xs text-muted-foreground/80 leading-tight">
          Capture your golf thoughts via voice or text
        </p>
      </div>
    </button>
  );
};

export default JournalCard;