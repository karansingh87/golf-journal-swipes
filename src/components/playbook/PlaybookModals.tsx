import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CoachingActionModal from "./CoachingActionModal";
import PepTalkModal from "./PepTalkModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface PlaybookModalsProps {
  recordings?: any[];
  latestNoteId?: string;
  isGenerating: boolean;
  onGenerateNotes: (selectedRecordings: string[]) => Promise<void>;
  isActionModalOpen: boolean;
  setIsActionModalOpen: (open: boolean) => void;
  isPepTalkModalOpen: boolean;
  setIsPepTalkModalOpen: (open: boolean) => void;
}

const PlaybookModals = ({ 
  recordings, 
  latestNoteId, 
  isGenerating, 
  onGenerateNotes,
  isActionModalOpen,
  setIsActionModalOpen,
  isPepTalkModalOpen,
  setIsPepTalkModalOpen
}: PlaybookModalsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGeneratingPepTalk, setIsGeneratingPepTalk] = useState(false);

  const handleViewLatest = () => {
    if (latestNoteId) {
      navigate(`/coach_notes/${latestNoteId}`);
    } else {
      toast({
        title: "No Notes Found",
        description: "You haven't generated any coaching notes yet.",
        variant: "destructive",
      });
    }
    setIsActionModalOpen(false);
  };

  const handleCreateNew = () => {
    setIsActionModalOpen(false);
    const lastThreeRecordings = recordings?.slice(0, 3).map(r => r.id) || [];
    onGenerateNotes(lastThreeRecordings);
  };

  const handlePepTalkGenerate = async () => {
    try {
      setIsGeneratingPepTalk(true);
      const lastThreeRecordings = recordings?.slice(0, 3) || [];
      
      if (lastThreeRecordings.length === 0) {
        toast({
          title: "No Recordings Found",
          description: "You need at least one recording to generate a pep talk.",
          variant: "destructive",
        });
        return;
      }

      const { data: pepTalk, error } = await supabase.functions.invoke('generate-pep-talk', {
        body: { recordings: lastThreeRecordings }
      });

      if (error) throw error;

      const { data: savedPepTalk, error: saveError } = await supabase
        .from('pep_talk')
        .insert({
          content: JSON.stringify(pepTalk.content),
          recording_ids: lastThreeRecordings.map(r => r.id),
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (saveError) throw saveError;

      toast({
        title: "Success!",
        description: "Your pep talk has been generated.",
      });

      // Close the modal and navigate to the pep talk detail page
      setIsPepTalkModalOpen(false);
      navigate(`/pep_talk/${savedPepTalk.id}`);

    } catch (error) {
      console.error("Error generating pep talk:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate pep talk. Please try again.",
      });
    } finally {
      setIsGeneratingPepTalk(false);
    }
  };

  return (
    <>
      <CoachingActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onViewLatest={handleViewLatest}
        onCreateNew={handleCreateNew}
      />

      <PepTalkModal
        isOpen={isPepTalkModalOpen}
        onClose={() => setIsPepTalkModalOpen(false)}
        isGenerating={isGeneratingPepTalk}
        onGenerate={handlePepTalkGenerate}
      />

      {/* Loading overlay */}
      <Dialog open={isGeneratingPepTalk} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px] text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h3 className="font-medium text-lg">Generating Your Pep Talk</h3>
            <p className="text-sm text-muted-foreground">
              Analyzing your recordings and crafting personalized motivation...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaybookModals;
