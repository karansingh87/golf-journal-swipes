import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import RecordingSelectionModal from "./RecordingSelectionModal";
import CoachingActionModal from "./CoachingActionModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PepTalkDisplay from "./PepTalkDisplay";
import { supabase } from "@/integrations/supabase/client";

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
  const [pepTalkContent, setPepTalkContent] = useState<any>(null);
  const [isGeneratingPepTalk, setIsGeneratingPepTalk] = useState(false);
  const [isPepTalkSelectionOpen, setIsPepTalkSelectionOpen] = useState(false);
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
      setIsGeneratingPepTalk(true);
      const { data, error } = await supabase.functions.invoke('generate-pep-talk', {
        body: { recording_ids: selectedRecordings }
      });

      if (error) throw error;

      setPepTalkContent(data.content);
      setSelectedRecordings([]);
      setIsPepTalkSelectionOpen(false);
      setIsPepTalkModalOpen(true);
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

  return (
    <>
      <CoachingActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onViewLatest={handleViewLatest}
        onCreateNew={handleCreateNew}
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
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      <RecordingSelectionModal
        isOpen={isPepTalkSelectionOpen}
        onClose={() => {
          setIsPepTalkSelectionOpen(false);
          setSelectedRecordings([]);
        }}
        recordings={recordings || []}
        selectedRecordings={selectedRecordings}
        onSelect={handleRecordingSelect}
        onGenerate={handleGeneratePepTalk}
        isGenerating={isGeneratingPepTalk}
      />

      <Dialog open={isPepTalkModalOpen} onOpenChange={setIsPepTalkModalOpen}>
        <DialogContent className="max-w-2xl">
          {pepTalkContent && <PepTalkDisplay content={pepTalkContent} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaybookModals;