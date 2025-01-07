import { MessageSquare } from "lucide-react";

interface GenerateNotesCardProps {
  onClick: () => void;
}

const GenerateNotesCard = ({ onClick }: GenerateNotesCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-card hover:bg-accent rounded-2xl border transition-colors 
        flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-zinc-100 rounded-full group-hover:bg-zinc-50 
          transition-colors duration-200" />
        <MessageSquare className="w-4 h-4 text-zinc-950 relative z-10" />
      </div>
      <div className="text-left">
        <h3 className="font-medium text-base">Generate Coaching Notes</h3>
        <p className="text-xs text-muted-foreground">
          Analyze your recordings and get personalized insights
        </p>
      </div>
    </button>
  );
};

export default GenerateNotesCard;