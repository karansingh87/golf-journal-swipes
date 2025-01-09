import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import RecordingSelectionModal from "./RecordingSelectionModal";
import CoachingActionModal from "./CoachingActionModal";

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
    try {
      const response = await supabase.functions.invoke('generate-pep-talk', {
        body: {
          recording_ids: selectedRecordings,
          userId: (await supabase.auth.getUser()).data.user?.id
        },
      });

      if (!response.data) {
        throw new Error('Failed to generate pep talk');
      }

      // Clear selection and close modal
      setSelectedRecordings([]);
      setIsPepTalkModalOpen(false);
      
      // Navigate to the new pep talk detail page
      navigate(`/pep_talk/${response.data.id}`);
      
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

      <RecordingSelectionModal
        isOpen={isSelectionModalOpen || isPepTalkModalOpen}
        onClose={() => {
          setIsSelectionModalOpen(false);
          setIsPepTalkModalOpen(false);
          setSelectedRecordings([]);
        }}
        recordings={recordings || []}
        selectedRecordings={selectedRecordings}
        onSelect={handleRecordingSelect}
        onGenerate={isPepTalkModalOpen ? handleGeneratePepTalk : handleGenerate}
        isGenerating={isGenerating}
        modalTitle={isPepTalkModalOpen ? "Generate Pep Talk" : "Select Recordings"}
        generateButtonText={isPepTalkModalOpen ? "Generate Pep Talk" : "Generate Notes"}
      />
    </>
  );
};

export default PlaybookModals;