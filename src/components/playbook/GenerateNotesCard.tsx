import { type FC } from "react";
import { Target } from "lucide-react";

interface GenerateNotesCardProps {
  onClick: () => void;
}

const GenerateNotesCard: FC<GenerateNotesCardProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-4 px-5 bg-gradient-to-br from-emerald-50/80 to-teal-100/80 
        backdrop-blur-sm hover:from-emerald-100 hover:to-teal-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <Target className="w-4 h-4 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-sm leading-none mb-1.5">Lesson Prep</h3>
        <p className="text-xs text-muted-foreground/80 leading-tight">
          Prepare for your next coaching lesson
        </p>
      </div>
    </button>
  );
};

export default GenerateNotesCard;
