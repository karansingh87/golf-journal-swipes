import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import CoachingNoteDisplay from "@/components/playbook/CoachingNoteDisplay";

const CoachNoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: note, isLoading } = useQuery({
    queryKey: ['coaching_note', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coaching_notes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground mb-4">Note not found</p>
        <Button variant="ghost" onClick={() => navigate('/coach_notes')}>
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
                Coaching Notes
              </h1>
              <p className="text-sm text-golf-gray-text-secondary">
                {format(new Date(note.created_at), "MMMM d, yyyy")} • {format(new Date(note.created_at), "h:mm a")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden bg-white/80">
          <CoachingNoteDisplay note={parsedNotes} />
        </div>
      </div>
    </div>
  );
};

export default CoachNoteDetail;