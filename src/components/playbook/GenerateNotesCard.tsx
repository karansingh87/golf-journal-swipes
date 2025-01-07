import { MessageSquare } from "lucide-react";

interface GenerateNotesCardProps {
  onClick: () => void;
}

const GenerateNotesCard = ({ onClick }: GenerateNotesCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-card hover:bg-accent rounded-[32px] border transition-colors 
        flex flex-col items-start gap-1 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="relative w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-2xl mb-2">
        <MessageSquare className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-base leading-none">Generate Coaching Notes</h3>
      <p className="text-sm text-muted-foreground leading-tight">
        Analyze your recordings
      </p>
    </button>
  );
};

export default GenerateNotesCard;