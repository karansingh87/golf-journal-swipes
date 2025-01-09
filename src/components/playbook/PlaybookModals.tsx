import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import RecordingSelectionModal from "./RecordingSelectionModal";
import CoachingActionModal from "./CoachingActionModal";
import PepTalkActionModal from "./PepTalkActionModal";

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
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [selectedRecordings, setSelectedRecordings] = useState<string[]>([]);
  const [isGeneratingPepTalk, setIsGeneratingPepTalk] = useState(false);
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
    setIsSelectionModalOpen(true);
  };

  const handleRecordingSelect = (id: string) => {
    setSelectedRecordings(prev => {
      if (prev.includes(id)) {
        return prev.filter(recordingId => recordingId !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleGenerate = async () => {
    await onGenerateNotes(selectedRecordings);
    setSelectedRecordings([]);
    setIsSelectionModalOpen(false);
  };

  const handleGeneratePepTalk = async () => {
    setIsGeneratingPepTalk(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-pep-talk', {
        body: {
          recording_ids: selectedRecordings,
          userId: (await supabase.auth.getUser()).data.user?.id
        }
      });

      if (error) {
        throw error;
      }

      console.log('Pep talk generated:', data);
      
      // Clear selection and close modal
      setSelectedRecordings([]);
      setIsPepTalkModalOpen(false);
      
      // Navigate to the pep talk detail page
      if (data?.id) {
        navigate(`/pep_talk/${data.id}`);
      }
      
      // Show success toast
      toast({
        title: "Pep Talk Generated",
        description: "Your personalized pep talk is ready!",
      });
      
    } catch (error) {
      console.error('Error generating pep talk:', error);
      toast({
        title: "Error",
        description: "Failed to generate pep talk. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPepTalk(false);
    }
  };

  const handleViewPastPepTalks = () => {
    setIsPepTalkModalOpen(false);
    navigate('/pep_talks');
  };

  const handleCreateNewPepTalk = () => {
    setIsPepTalkModalOpen(false);
    setIsSelectionModalOpen(true);
  };

  return (
    <>
      <CoachingActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onViewLatest={handleViewLatest}
        onCreateNew={handleCreateNew}
      />

      <PepTalkActionModal
        isOpen={isPepTalkModalOpen}
        onClose={() => setIsPepTalkModalOpen(false)}
        onViewPast={handleViewPastPepTalks}
        onCreateNew={handleCreateNewPepTalk}
      />

      <RecordingSelectionModal
        isOpen={isSelectionModalOpen}
        onClose={() => {
          setIsSelectionModalOpen(false);
          setSelectedRecordings([]);
        }}
        recordings={recordings || []}
        selectedRecordings={selectedRecordings}
        onSelect={handleRecordingSelect}
        onGenerate={handleGeneratePepTalk}
        isGenerating={isGeneratingPepTalk}
        modalTitle="Generate Pep Talk"
        generateButtonText="Generate Pep Talk"
      />
    </>
  );
};

export default PlaybookModals;