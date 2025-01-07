import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface RecordingSelectorProps {
  selectedRecordings: string[];
  onSelectionChange: (recordings: string[]) => void;
}

const RecordingSelector = ({ selectedRecordings, onSelectionChange }: RecordingSelectorProps) => {
  const { data: recordings, isLoading } = useQuery({
    queryKey: ['recordings-for-notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recordings')
        .select('id, created_at, transcription')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleToggle = (recordingId: string) => {
    if (selectedRecordings.includes(recordingId)) {
      onSelectionChange(selectedRecordings.filter(id => id !== recordingId));
    } else if (selectedRecordings.length < 3) {
      onSelectionChange([...selectedRecordings, recordingId]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!recordings?.length) {
    return (
      <div className="text-center text-sm text-muted-foreground p-4">
        No recordings found
      </div>
    );
  }

  return (
    <ScrollArea className="h-[280px] pr-4">
      <div className="space-y-2">
        {recordings.map((recording) => {
          const isSelected = selectedRecordings.includes(recording.id);
          const isDisabled = !isSelected && selectedRecordings.length >= 3;
          
          return (
            <div
              key={recording.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => handleToggle(recording.id)}
                disabled={isDisabled}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">
                  {format(new Date(recording.created_at), "MMM d, yyyy • h:mm a")}
                </p>
                <p className="text-sm truncate mt-1">
                  {recording.transcription?.substring(0, 60)}...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default RecordingSelector;