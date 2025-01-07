import { MessageSquare } from "lucide-react";

interface GenerateNotesCardProps {
  onClick: () => void;
}

const GenerateNotesCard = ({ onClick }: GenerateNotesCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-6 px-3 bg-gradient-to-br from-purple-50 to-indigo-100 
        backdrop-blur-sm hover:from-purple-100 hover:to-indigo-200 rounded-2xl 
        border border-white/20 shadow-sm transition-all duration-200
        flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/80 rounded-full group-hover:bg-white/90 
          transition-colors duration-200" />
        <MessageSquare className="w-3.5 h-3.5 text-zinc-950 relative z-10" />
      </div>
      <div className="text-left">
        <h3 className="font-medium text-sm leading-none mb-0.5">Generate Coaching Notes</h3>
        <p className="text-[10px] text-muted-foreground leading-tight">
          Analyze your recordings and get personalized insights
        </p>
      </div>
    </button>
  );
};

export default GenerateNotesCard;