import { format } from "date-fns";
import { Pencil, Trash2, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

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
      <CardHeader className="flex flex-row items-center justify-between py-5 px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={(e) => handleAction(e, () => {
              console.log("Play audio:", recording.audio_url);
            })}
          >
            <PlayCircle className="h-7 w-7 text-primary" />
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
      </CardHeader>
    </Card>
  );
};

export default RecordingCard;