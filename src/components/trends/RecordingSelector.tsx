import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
    return <div className="text-center py-4">Loading recordings...</div>;
  }

  if (recordings.length === 0) {
    return <div className="text-center py-4">No recordings found</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Select up to 3 rounds for analysis
      </p>
      <div className="space-y-2">
        {recordings.map((recording) => {
          const isSelected = selectedRecordings.includes(recording.id);
          const isDisabled = !isSelected && selectedRecordings.length >= 3;

          return (
            <div
              key={recording.id}
              className="flex items-start space-x-3 p-3 rounded-lg border bg-card"
            >
              <Checkbox
                id={recording.id}
                checked={isSelected}
                onCheckedChange={() => handleToggle(recording.id)}
                disabled={isDisabled}
              />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor={recording.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {format(new Date(recording.created_at), "MMM d, yyyy")}
                </Label>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {recording.transcription?.substring(0, 100)}...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecordingSelector;