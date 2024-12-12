import { PlayCircle, PauseCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
        "relative h-12 w-12 rounded-full transition-all duration-300",
        isPlaying && "bg-golf-green hover:bg-golf-green/90"
      )}
      onClick={onClick}
    >
      {isPlaying ? (
        <PauseCircle className={cn(
          "h-7 w-7 transition-all duration-300",
          isPlaying ? "text-white" : "text-primary"
        )} />
      ) : (
        <PlayCircle className="h-7 w-7 text-golf-green" />
      )}
      {isPlaying && progress > 0 && (
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            className="text-white/10"
            strokeWidth="2"
            stroke="currentColor"
            fill="transparent"
            r="23"
            cx="24"
            cy="24"
          />
          <circle
            className="text-white transition-all duration-200"
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