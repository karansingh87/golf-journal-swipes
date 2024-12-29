import { Brain, Share2, Star, Target, TrendingUp, AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardHeaderProps {
  type: string;
  onShare: (e: React.MouseEvent) => void;
}

export const getIcon = (type: string) => {
  switch (type) {
    case "hidden_strength":
      return Star;
    case "mental_signature":
      return Brain;
    case "strategic_instinct":
      return Target;
    case "growth_indicator":
      return TrendingUp;
    case "game_changing":
      return AlertOctagon;
    default:
      return Star;
  }
};

export const getTypeLabel = (type: string) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const CardHeader = ({ type, onShare }: CardHeaderProps) => {
  const Icon = getIcon(type);
  
  return (
    <div className="relative z-10 space-y-8">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 opacity-70 hover:opacity-100 z-20"
        onClick={onShare}
      >
        <Share2 className="h-5 w-5 text-black/70" />
      </Button>
      
      <div className="flex items-center gap-2 text-sm tracking-wide text-black/70 uppercase">
        <Icon className="h-4 w-4" />
        <span className="font-medium">{getTypeLabel(type)}</span>
      </div>
    </div>
  );
};

export default CardHeader;