import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import RecordingCard from "./RecordingCard";
import { FilterType } from "./history/FilterPills";

interface Recording {
  id: string;
  audio_url: string;
  transcription: string;
  analysis: string;
  duration: number;
  created_at: string;
}

interface RecordingHistoryProps {
  searchQuery: string;
  filter: FilterType;
}

const RecordingHistory = ({ searchQuery, filter }: RecordingHistoryProps) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTranscription, setEditedTranscription] = useState("");
  const [searchParams] = useSearchParams();
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    fetchRecordings();
  }, [session?.user?.id]);

  const fetchRecordings = async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("recordings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecordings(data || []);
    } catch (error) {
      console.error("Error fetching recordings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load recordings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (recording: Recording) => {
    setEditingId(recording.id);
    setEditedTranscription(recording.transcription);
  };

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from("recordings")
        .update({ transcription: editedTranscription })
        .eq("id", id);

      if (error) throw error;

      setRecordings(recordings.map(rec => 
        rec.id === id ? { ...rec, transcription: editedTranscription } : rec
      ));
      setEditingId(null);
      
      toast({
        title: "Success",
        description: "Transcription updated successfully",
      });
    } catch (error) {
      console.error("Error updating transcription:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update transcription",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("recordings")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setRecordings(recordings.filter(rec => rec.id !== id));
      toast({
        title: "Success",
        description: "Recording deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting recording:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete recording",
      });
    }
  };

  const filteredRecordings = recordings.filter(recording => {
    const matchesSearch = searchQuery
      ? recording.transcription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recording.analysis?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesFilter = filter === "all" ? true : true; // Implement specific filter logic here

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const expandedRecordingId = searchParams.get('recordingId');

  return (
    <div className="w-full space-y-4">
      {filteredRecordings.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery || filter !== "all"
            ? "No recordings match your search"
            : "No recordings yet"}
        </div>
      ) : (
        filteredRecordings.map((recording) => (
          <RecordingCard
            key={recording.id}
            recording={recording}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isEditing={editingId === recording.id}
            editedTranscription={editedTranscription}
            onEditChange={setEditedTranscription}
            onSave={handleSave}
            onCancelEdit={() => setEditingId(null)}
            defaultExpanded={recording.id === expandedRecordingId}
          />
        ))
      )}
    </div>
  );
};

export default RecordingHistory;