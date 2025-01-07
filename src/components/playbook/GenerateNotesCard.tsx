import { type FC } from "react";

interface GenerateNotesCardProps {
  onClick: () => void;
}

const GenerateNotesCard: FC<GenerateNotesCardProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-8 px-6 bg-gradient-to-br from-purple-50/80 to-indigo-100/80 
        backdrop-blur-sm hover:from-purple-100 hover:to-indigo-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-4 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-10 h-10 flex items-center justify-center pt-1">
        <img 
          src="/lovable-uploads/51c81539-1d3d-4e04-823d-61425adb5abd.png"
          alt="Coach icon"
          className="w-6 h-6"
        />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-base leading-none mb-2">Generate Coaching Notes</h3>
        <p className="text-sm text-muted-foreground/80 leading-tight">
          Analyze your recordings and get personalized insights
        </p>
      </div>
    </button>
  );
};

export default GenerateNotesCard;