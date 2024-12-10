import { format } from "date-fns";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <div className="text-sm text-gray-600">
            {format(new Date(recording.created_at), "MMM d, yyyy h:mm a")}
          </div>
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
      {isExpanded && (
        <CardContent className="p-4">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="transcription">Transcription</TabsTrigger>
            </TabsList>
            <TabsContent value="analysis" className="mt-4">
              <div className="text-gray-700 prose prose-sm max-w-none">
                <ReactMarkdown>{recording.analysis}</ReactMarkdown>
              </div>
            </TabsContent>
            <TabsContent value="transcription" className="mt-4">
              {isEditing ? (
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
                <div className="text-gray-700 whitespace-pre-wrap">
                  {recording.transcription}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default RecordingCard;