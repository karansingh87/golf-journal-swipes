import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";

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
  onSave: (id: string) => void;
  onCancelEdit: () => void;
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
}: RecordingCardProps) => {
  const [showTranscription, setShowTranscription] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(true);

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="text-sm text-gray-600">
          {format(new Date(recording.created_at), "MMM d, yyyy h:mm a")}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(recording)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(recording.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Transcription</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTranscription(!showTranscription)}
            >
              {showTranscription ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {showTranscription && (
            isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editedTranscription}
                  onChange={(e) => onEditChange(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md text-gray-700"
                  rows={4}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={onCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => onSave(recording.id)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 whitespace-pre-wrap">
                {recording.transcription}
              </p>
            )
          )}
        </div>

        {recording.analysis && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Analysis</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAnalysis(!showAnalysis)}
              >
                {showAnalysis ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {showAnalysis && (
              <p className="text-gray-700 whitespace-pre-wrap">
                {recording.analysis}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecordingCard;