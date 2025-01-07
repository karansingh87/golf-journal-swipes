import { MessageSquare } from "lucide-react";

interface GenerateNotesCardProps {
  onClick: () => void;
}

const GenerateNotesCard = ({ onClick }: GenerateNotesCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-4.5 px-4.5 bg-card hover:bg-accent rounded-2xl border transition-colors 
        flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="relative w-9 h-9 flex items-center justify-center">
        <div className="absolute inset-0 bg-zinc-100 rounded-full group-hover:bg-zinc-50 
          transition-colors duration-200" />
        <MessageSquare className="w-5 h-5 text-zinc-950 relative z-10" />
      </div>
      <div className="text-left">
        <h3 className="font-medium text-base leading-none mb-1">Generate Coaching Notes</h3>
        <p className="text-xs text-muted-foreground leading-tight">
          Analyze your recordings and get personalized insights
        </p>
      </div>
    </button>
  );
};

export default GenerateNotesCard;