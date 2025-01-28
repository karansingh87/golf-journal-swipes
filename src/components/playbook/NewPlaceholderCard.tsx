import { Flame } from "lucide-react";

interface NewPlaceholderCardProps {
  onClick: () => void;
}

const NewPlaceholderCard = ({ onClick }: NewPlaceholderCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-4 px-5 bg-zinc-200/80 
        backdrop-blur-sm hover:bg-zinc-900 hover:text-white rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <Flame className="w-4 h-4 text-zinc-950 group-hover:text-white" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-sm leading-none mb-1.5">Pep Talk</h3>
        <p className="text-xs text-muted-foreground/80 leading-tight">
          Get a confidence boost before your next round
        </p>
      </div>
    </button>
  );
};

export default NewPlaceholderCard;