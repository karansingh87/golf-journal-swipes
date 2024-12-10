import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { format } from "date-fns";
import { Pencil, Trash2, ChevronDown, ChevronUp, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface Recording {
  id: string;
  audio_url: string;
  transcription: string;
  analysis: string;
  duration: number;
  created_at: string;
}

const RecordingHistory = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editedTranscription, setEditedTranscription] = useState("");
  const session = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4 space-y-4">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recorder
        </Button>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recording History</h2>
      
      {recordings.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No recordings yet</p>
      ) : (
        recordings.map((recording) => (
          <div
            key={recording.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">
                {format(new Date(recording.created_at), "MMM d, yyyy h:mm a")}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(recording)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(recording.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
                <button
                  onClick={() => setExpandedId(expandedId === recording.id ? null : recording.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {expandedId === recording.id ? (
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            {expandedId === recording.id && (
              <div className="mt-2 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Transcription</h3>
                  {editingId === recording.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editedTranscription}
                        onChange={(e) => setEditedTranscription(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md text-gray-700"
                        rows={4}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave(recording.id)}
                          className="px-3 py-1 text-sm bg-golf-green text-white rounded hover:bg-golf-accent"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {recording.transcription}
                    </p>
                  )}
                </div>
                {recording.analysis && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Analysis</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {recording.analysis}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecordingHistory;