import { LandPlot } from "lucide-react";

interface NewPlaceholderCardProps {
  onClick: () => void;
}

const NewPlaceholderCard = ({ onClick }: NewPlaceholderCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-6 px-6 bg-gradient-to-br from-blue-50/80 to-cyan-100/80
        backdrop-blur-sm hover:from-blue-100 hover:to-cyan-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-4 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <LandPlot className="w-5 h-5 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-base leading-none mb-2">Pep Talk</h3>
        <p className="text-sm text-muted-foreground/80 leading-tight">
          Get a confidence boost before your next round
        </p>
      </div>
    </button>
  );
};

export default NewPlaceholderCard;