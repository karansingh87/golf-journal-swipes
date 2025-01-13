import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import RecordingSelectionModal from "./RecordingSelectionModal";
import CoachingActionModal from "./CoachingActionModal";
import PepTalkActionModal from "./PepTalkActionModal";
import { useSession } from "@supabase/auth-helpers-react";

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
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<'notes' | 'pepTalk'>('notes');
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();

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
    setCurrentFlow('notes');
    setIsActionModalOpen(false);
    setIsSelectionModalOpen(true);
    setSelectedRecordings([]);
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
    setIsGeneratingNotes(true);
    try {
      await onGenerateNotes(selectedRecordings);
      setSelectedRecordings([]);
      setIsSelectionModalOpen(false);
    } catch (error) {
      console.error('Error generating notes:', error);
      toast({
        title: "Error",
        description: "Failed to generate notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  const handleGeneratePepTalk = async () => {
    setIsGeneratingPepTalk(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-pep-talk', {
        body: {
          recording_ids: selectedRecordings,
          userId: session?.user?.id
        }
      });

      if (error) {
        throw error;
      }

      console.log('Pep talk generated:', data);
      
      setSelectedRecordings([]);
      setIsSelectionModalOpen(false);
      
      if (data?.id) {
        navigate(`/pep_talk/${data.id}`);
      }
      
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
    setCurrentFlow('pepTalk');
    setIsPepTalkModalOpen(false);
    setIsSelectionModalOpen(true);
    setSelectedRecordings([]);
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
        recordings={recordings?.filter(rec => rec.user_id === session?.user?.id) || []}
        selectedRecordings={selectedRecordings}
        onSelect={handleRecordingSelect}
        onGenerate={currentFlow === 'notes' ? handleGenerate : handleGeneratePepTalk}
        isGenerating={currentFlow === 'notes' ? isGeneratingNotes : isGeneratingPepTalk}
        modalTitle={currentFlow === 'notes' ? "Generate Lesson Prep" : "Generate Pep Talk"}
        generateButtonText={currentFlow === 'notes' ? "Generate Notes" : "Generate Pep Talk"}
      />
    </>
  );
};

export default PlaybookModals;