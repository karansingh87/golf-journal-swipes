import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import CardHeader from "./recording-card/CardHeader";

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
        "bg-white/80 p-5"
      )}
    >
      <div className="flex flex-col">
        <CardHeader
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
    </Card>
  );
};

export default RecordingCard;