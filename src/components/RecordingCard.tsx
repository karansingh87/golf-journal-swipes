import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ChevronDown, ChevronUp, Trash2, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import TranscriptionDisplay from "./TranscriptionDisplay";

interface Recording {
  id: string;
  created_at: string;
  audio_url: string | null;
  transcription: string | null;
  analysis: string | null;
  insights: string | null;
  duration: number;
  session_type: "course" | "practice";
}

interface RecordingCardProps {
  recording: Recording;
  isEditing: boolean;
  onDelete: () => void;
  onEdit: () => void;
  editedTranscription: string;
  onEditChange: (value: string) => void;
  onSave: () => Promise<void>;
  onCancelEdit: () => void;
  defaultExpanded?: boolean;
}

const getHeadline = (analysis: string | null): string => {
  if (!analysis) return "Golf Session";
  
  try {
    const parsedAnalysis = JSON.parse(analysis);
    const headlineSection = parsedAnalysis.sections?.find(
      (section: any) => section.type === "headline"
    );
    if (!headlineSection) return "Golf Session";
    return Array.isArray(headlineSection.content)
      ? headlineSection.content[0]
      : headlineSection.content;
  } catch (error) {
    console.error("Error parsing analysis:", error);
    return "Golf Session";
  }
};

const RecordingCard = ({
  recording,
  isEditing,
  onDelete,
  onEdit,
  editedTranscription,
  onEditChange,
  onSave,
  onCancelEdit,
  defaultExpanded = false,
}: RecordingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="w-full overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              to={`/recording/${recording.id}`}
              className="text-lg font-semibold hover:text-primary transition-colors"
            >
              {getHeadline(recording.analysis)}
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onSave()}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleExpand}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
        <div
          className={cn(
            "mt-4 transition-all duration-200",
            isExpanded ? "block" : "hidden"
          )}
        >
          {isEditing ? (
            <textarea
              value={editedTranscription}
              onChange={(e) => onEditChange(e.target.value)}
              className="w-full min-h-[200px] p-2 border rounded"
            />
          ) : (
            <TranscriptionDisplay
              transcription={recording.transcription || ""}
              isTranscribing={false}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default RecordingCard;