import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CoachingActionModal from "./CoachingActionModal";
import PepTalkModal from "./PepTalkModal";

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

      toast({
        title: "Success!",
        description: "Your pep talk has been generated.",
      });

      // Close the modal and show the pep talk
      setIsPepTalkModalOpen(false);
      
      // TODO: Navigate to pep talk view or show in a new modal
      console.log('Generated pep talk:', pepTalk);

    } catch (error) {
      console.error("Error generating pep talk:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate pep talk. Please try again.",
      });
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
        isGenerating={isGenerating}
        onGenerate={handlePepTalkGenerate}
      />
    </>
  );
};

export default PlaybookModals;