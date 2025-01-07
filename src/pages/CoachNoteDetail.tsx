import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CoachingNoteDisplay from "@/components/playbook/CoachingNoteDisplay";

const CoachNoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: note, isLoading } = useQuery({
    queryKey: ['coachNote', id],
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
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/coach_notes')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Notes
        </Button>
        
        {note && (
          <CoachingNoteDisplay note={JSON.parse(note.notes)} />
        )}
      </div>
    </div>
  );
};

export default CoachNoteDetail;