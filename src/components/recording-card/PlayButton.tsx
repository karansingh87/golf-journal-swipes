import { PlayCircle, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  isPlaying: boolean;
  progress: number;
  onClick: (e: React.MouseEvent) => void;
}

const PlayButton = ({ isPlaying, progress, onClick }: PlayButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-12 w-12 rounded-full relative transition-all duration-300",
        "min-h-[48px] min-w-[48px]",
        isPlaying && "bg-golf-green/10"
      )}
      onClick={onClick}
    >
      {isPlaying ? (
        <PauseCircle className={cn(
          "h-7 w-7 text-primary transition-all duration-300",
          isPlaying && "text-golf-green animate-pulse"
        )} />
      ) : (
        <PlayCircle className="h-7 w-7 text-primary" />
      )}
      {isPlaying && (
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            className="text-golf-green/20"
            strokeWidth="2"
            stroke="currentColor"
            fill="transparent"
            r="23"
            cx="24"
            cy="24"
          />
          <circle
            className="text-golf-green transition-all duration-200"
            strokeWidth="2"
            strokeDasharray={`${progress * 1.44} 144`}
            stroke="currentColor"
            fill="transparent"
            r="23"
            cx="24"
            cy="24"
          />
        </svg>
      )}
    </Button>
  );
};

export default PlayButton;