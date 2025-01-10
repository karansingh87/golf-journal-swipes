import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import CoachingNoteDisplay from "@/components/playbook/CoachingNoteDisplay";

const SharedCoachNote = () => {
  const { id } = useParams();

  const { data: note, isLoading } = useQuery({
    queryKey: ['shared_coaching_note', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coaching_notes')
        .select('*')
        .eq('id', id)
        .eq('is_public', true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-14">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-14">
        <p className="text-lg text-muted-foreground">This coaching note is not available or has been made private</p>
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mt-4"
        >
          Go back
        </Button>
      </div>
    );
  }

  const parsedNotes = JSON.parse(note.notes);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4 pt-20">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-golf-gray-text-primary mb-2">
                Shared Coaching Note
              </h1>
              <p className="text-sm text-golf-gray-text-secondary">
                {format(new Date(note.created_at), "MMMM d, yyyy")} • {format(new Date(note.created_at), "h:mm a")} • Based on {note.recording_ids.length} recording{note.recording_ids.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden bg-white/80">
          <CoachingNoteDisplay note={parsedNotes} />
        </div>
      </div>
    </div>
  );
};

export default SharedCoachNote;