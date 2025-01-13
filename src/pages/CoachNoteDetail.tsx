import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import CoachNoteHeader from "@/components/coach-notes/CoachNoteHeader";

const CoachNoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: note, isLoading } = useQuery({
    queryKey: ['coach_note', id],
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

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('coaching_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Note deleted successfully");
      navigate('/coach_notes');
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleTogglePublic = async () => {
    try {
      const { error } = await supabase
        .from('coaching_notes')
        .update({ is_public: !note?.is_public })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Note is now ${!note?.is_public ? 'public' : 'private'}`);
    } catch (error) {
      console.error("Error updating note visibility:", error);
      toast.error("Failed to update note visibility");
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/shared/coach_notes/${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy link");
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
        <p className="text-lg text-muted-foreground">Note not found</p>
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

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <CoachNoteHeader
          createdAt={note.created_at}
          isPublic={note.is_public}
          onDelete={handleDelete}
          onTogglePublic={handleTogglePublic}
          onShare={handleShare}
        />

        <ScrollArea className="flex-1">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ReactMarkdown>{note.notes}</ReactMarkdown>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CoachNoteDetail;