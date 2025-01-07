import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Recording {
  id: string;
  created_at: string;
  transcription: string;
}

interface RecordingSelectorProps {
  selectedRecordings: string[];
  onSelectionChange: (ids: string[]) => void;
}

const RecordingSelector = ({
  selectedRecordings,
  onSelectionChange,
}: RecordingSelectorProps) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!session) return;

      try {
        const { data, error } = await supabase
          .from('recordings')
          .select('id, created_at, transcription')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setRecordings(data || []);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecordings();
  }, [session]);

  const handleToggle = (id: string) => {
    if (selectedRecordings.includes(id)) {
      onSelectionChange(selectedRecordings.filter(r => r !== id));
    } else if (selectedRecordings.length < 3) {
      onSelectionChange([...selectedRecordings, id]);
    }
  };

  if (isLoading) {
    return <div className="text-center py-3 text-sm">Loading recordings...</div>;
  }

  if (recordings.length === 0) {
    return <div className="text-center py-3 text-sm">No recordings found</div>;
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground px-1">
        Select up to 3 rounds for analysis
      </p>
      <ScrollArea className="h-[240px]">
        <div className="space-y-1.5 pr-2">
          {recordings.map((recording) => {
            const isSelected = selectedRecordings.includes(recording.id);
            const isDisabled = !isSelected && selectedRecordings.length >= 3;

            return (
              <div
                key={recording.id}
                className="flex items-start gap-2 p-2 rounded-md border bg-card"
              >
                <Checkbox
                  id={recording.id}
                  checked={isSelected}
                  onCheckedChange={() => handleToggle(recording.id)}
                  disabled={isDisabled}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <Label
                    htmlFor={recording.id}
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {format(new Date(recording.created_at), "MMM d, yyyy")}
                  </Label>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {recording.transcription?.substring(0, 50)}...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecordingSelector;