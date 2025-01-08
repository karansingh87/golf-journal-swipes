import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import RecordingCard from "./RecordingCard";

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

interface RecordingHistoryProps {
  searchQuery: string;
}

const RecordingHistory = ({ searchQuery }: RecordingHistoryProps) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    fetchRecordings();
  }, [session]);

  const fetchRecordings = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRecordings(data || []);
    } catch (error) {
      console.error("Error fetching recordings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch recordings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('recordings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Recording deleted successfully",
      });
      setRecordings(recordings.filter(recording => recording.id !== id));
    } catch (error) {
      console.error("Error deleting recording:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete recording",
      });
    }
  };

  const filteredRecordings = recordings.filter((recording) => {
    const matchesSearch = searchQuery
      ? recording.transcription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recording.analysis?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 px-2 pt-2 sm:px-6 lg:px-8">
      {filteredRecordings.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchQuery ? "No notes match your search" : "No notes yet"}
        </div>
      ) : (
        <div className="grid gap-2 sm:gap-3">
          {filteredRecordings.map((recording) => (
            <RecordingCard
              key={recording.id}
              recording={recording}
              isEditing={editingId === recording.id}
              onDelete={() => handleDelete(recording.id)}
              onEdit={() => {}}
              editedTranscription=""
              onEditChange={() => {}}
              onSave={async () => {}}
              onCancelEdit={() => {}}
              defaultExpanded={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordingHistory;