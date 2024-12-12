import { format } from "date-fns";
import { Pencil, Trash2, PlayCircle, PauseCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Progress } from "./ui/progress";

interface RecordingCardProps {
  recording: {
    id: string;
    audio_url: string;
    transcription: string;
    analysis: string;
    duration: number;
    created_at: string;
  };
  onEdit: (recording: any) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  editedTranscription: string;
  onEditChange: (value: string) => void;
  onSave: (id: string) => Promise<void>;
  onCancelEdit: () => void;
  defaultExpanded: boolean;
}

const RecordingCard = ({
  recording,
  onEdit,
  onDelete,
  isEditing,
  editedTranscription,
  onEditChange,
  onSave,
  onCancelEdit,
  defaultExpanded,
}: RecordingCardProps) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const togglePlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) {
      audioRef.current = new Audio(recording.audio_url);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleCardClick = () => {
    navigate(`/recording/${recording.id}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <Card 
      onClick={handleCardClick}
      className={cn(
        "mb-1 transition-all duration-300 hover:shadow-lg cursor-pointer",
        "rounded-2xl border border-border/50 backdrop-blur-sm active:scale-[0.99]",
        "bg-white/80"
      )}
    >
      <CardHeader className="flex flex-col gap-4 py-5 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full relative transition-all duration-300",
                isPlaying && "bg-golf-green/10"
              )}
              onClick={togglePlayback}
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
            <div className="flex flex-col">
              <div className="text-sm font-medium">
                {format(new Date(recording.created_at), "MMM d, yyyy")}
              </div>
              <div className="text-xs text-muted-foreground">
                {format(new Date(recording.created_at), "h:mm a")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleAction(e, () => onEdit(recording))}
              className="h-9 w-9"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleAction(e, () => onDelete(recording.id))}
              className="h-9 w-9"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>

        {recording.transcription && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {recording.transcription}
          </div>
        )}

        {isPlaying && (
          <div className="space-y-2">
            <Progress value={progress} className="h-1" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(recording.duration || 0)}</span>
            </div>
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default RecordingCard;