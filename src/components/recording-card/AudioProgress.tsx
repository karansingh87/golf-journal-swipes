import { Progress } from "@/components/ui/progress";

interface AudioProgressProps {
  progress: number;
  currentTime: number;
  duration: number;
}

const AudioProgress = ({ progress, currentTime, duration }: AudioProgressProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-1" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration || 0)}</span>
      </div>
    </div>
  );
};

export default AudioProgress;