import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import CoachingNoteDisplay from "@/components/playbook/CoachingNoteDisplay";

const CoachNoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: note, isLoading } = useQuery({
    queryKey: ['coaching_note', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coaching_notes')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('coaching_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Coaching note deleted successfully",
      });
      navigate('/coach_notes');
    } catch (error) {
      console.error("Error deleting coaching note:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete coaching note",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <p className="text-lg text-muted-foreground">Coaching note not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate('/coach_notes')}
          className="mt-4"
        >
          Go back to notes
        </Button>
      </div>
    );
  }

  const parsedNotes = JSON.parse(note.notes);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => navigate('/coach_notes')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-golf-gray-text-primary mb-2">
                Coaching Note
              </h1>
              <p className="text-sm text-golf-gray-text-secondary">
                {format(new Date(note.created_at), "MMMM d, yyyy")} • {format(new Date(note.created_at), "h:mm a")} • Based on {note.recording_ids.length} recording{note.recording_ids.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden bg-white/80">
          <CoachingNoteDisplay note={parsedNotes} />
        </div>
      </div>
    </div>
  );
};

export default CoachNoteDetail;