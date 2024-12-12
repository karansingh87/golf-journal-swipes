import { format } from "date-fns";
import { Pencil, Trash2, ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

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
  defaultExpanded?: boolean;
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
  defaultExpanded = false,
}: RecordingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  return (
    <Card className={cn(
      "mb-4 transition-all duration-300 hover:shadow-lg",
      "rounded-2xl border border-border/50 backdrop-blur-sm",
      isDark ? "bg-black/40 hover:shadow-[0_0_15px_rgba(74,222,128,0.1)]" : "bg-white/80"
    )}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => {
              // Add audio playback logic here
              console.log("Play audio:", recording.audio_url);
            }}
          >
            <PlayCircle className="h-6 w-6 text-primary" />
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
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(recording)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(recording.id)}
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 pt-0">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="transcription">Transcription</TabsTrigger>
            </TabsList>
            <TabsContent value="analysis" className="mt-4">
              <div className="text-gray-700 prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{recording.analysis}</ReactMarkdown>
              </div>
            </TabsContent>
            <TabsContent value="transcription" className="mt-4">
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={editedTranscription}
                    onChange={(e) => onEditChange(e.target.value)}
                    className="w-full p-2 border border-border rounded-md bg-background/50"
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
                <div className="text-foreground whitespace-pre-wrap">
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
