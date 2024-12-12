import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import PlayButton from "./recording-card/PlayButton";
import RecordingCardHeader from "./recording-card/CardHeader";
import AudioProgress from "./recording-card/AudioProgress";

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
      <div className="flex flex-col gap-4 py-5 px-6">
        <div className="flex items-start gap-4">
          <PlayButton
            isPlaying={isPlaying}
            progress={progress}
            onClick={togglePlayback}
          />
          <div className="flex-1">
            <RecordingCardHeader
              createdAt={recording.created_at}
              onEdit={(e) => handleAction(e, () => onEdit(recording))}
              onDelete={(e) => handleAction(e, () => onDelete(recording.id))}
            />
            {recording.transcription && (
              <div className="text-sm text-muted-foreground line-clamp-2 mt-3">
                {recording.transcription}
              </div>
            )}
          </div>
        </div>

        {isPlaying && (
          <AudioProgress
            progress={progress}
            currentTime={currentTime}
            duration={recording.duration}
          />
        )}
      </div>
    </Card>
  );
};

export default RecordingCard;