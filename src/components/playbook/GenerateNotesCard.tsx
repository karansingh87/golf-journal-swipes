import { type FC } from "react";
import { Target } from "lucide-react";

interface GenerateNotesCardProps {
  onClick: () => void;
}

const GenerateNotesCard: FC<GenerateNotesCardProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-6 px-6 bg-gradient-to-br from-purple-50/80 to-indigo-100/80 
        backdrop-blur-sm hover:from-purple-100 hover:to-indigo-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-4 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <Target className="w-5 h-5 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-base leading-none mb-2">Coach Summary</h3>
        <p className="text-sm text-muted-foreground/80 leading-tight">
          Get a clear discussion plan for your next lesson
        </p>
      </div>
    </button>
  );
};

export default GenerateNotesCard;