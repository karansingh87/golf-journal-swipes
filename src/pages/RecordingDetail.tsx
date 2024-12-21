import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import RecordingCard from "@/components/RecordingCard";

interface Recording {
  id: string;
  audio_url: string;
  transcription: string;
  analysis: string;
  duration: number;
  created_at: string;
  session_type: "course" | "practice";
}

const RecordingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recording, setRecording] = useState<Recording | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTranscription, setEditedTranscription] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecording = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from("recordings")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setRecording(data);
      } catch (error) {
        console.error("Error fetching recording:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load recording",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecording();
  }, [id, toast]);

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

      setRecording(prev => 
        prev ? { ...prev, transcription: editedTranscription } : null
      );
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

      toast({
        title: "Success",
        description: "Recording deleted successfully",
      });
      navigate('/notes');
    } catch (error) {
      console.error("Error deleting recording:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete recording",
      });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-4xl mx-auto py-6 space-y-4">
        <div className="space-y-4 px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/notes')}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-foreground">Recording Details</h1>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recording ? (
            <RecordingCard
              recording={recording}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isEditing={editingId === recording.id}
              editedTranscription={editedTranscription}
              onEditChange={setEditedTranscription}
              onSave={handleSave}
              onCancelEdit={() => setEditingId(null)}
              defaultExpanded={true}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Recording not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordingDetail;