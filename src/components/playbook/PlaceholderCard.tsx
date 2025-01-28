import { NotebookPen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlaceholderCard = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/notes")}
      className="w-full py-4 px-5 bg-zinc-400/80 
        backdrop-blur-sm hover:bg-zinc-300 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <NotebookPen className="w-4 h-4 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-sm leading-none mb-1.5">Notes</h3>
        <p className="text-xs text-muted-foreground/80 leading-tight">
          Browse your recorded notes and transcripts
        </p>
      </div>
    </button>
  );
};

export default PlaceholderCard;