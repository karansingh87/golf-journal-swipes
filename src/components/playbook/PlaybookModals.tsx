import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RecordingSelectionModal from "./RecordingSelectionModal";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

interface PlaybookModalsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAction: "coaching" | "pep_talk" | null;
  selectedRecordings: string[];
  recordings: {
    id: string;
    transcription: string;
    created_at: string;
  }[];
}

const PlaybookModals = ({
  isOpen,
  onClose,
  selectedAction,
  selectedRecordings,
  recordings = [],
}: PlaybookModalsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const session = useSession();
  const [isGeneratingPepTalk, setIsGeneratingPepTalk] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedRecordings);

  const handleGeneratePepTalk = async () => {
    if (!session?.user?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to generate a pep talk",
      });
      return;
    }

    try {
      setIsGeneratingPepTalk(true);
      
      const { data: pepTalk, error } = await supabase.functions.invoke('generate-pep-talk', {
        body: {
          recording_ids: selectedIds,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pep talk generated successfully",
      });

      onClose();
      if (pepTalk?.id) {
        navigate(`/pep_talk/${pepTalk.id}`);
      } else {
        throw new Error('No pep talk ID returned from database');
      }

    } catch (error) {
      console.error('Error generating pep talk:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate pep talk",
      });
    } finally {
      setIsGeneratingPepTalk(false);
    }
  };

  const handleGenerateCoachingNote = async () => {
    // Implementation for generating coaching note
  };

  const handleRecordingSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(recordingId => recordingId !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isGeneratingPepTalk && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="relative">
          {isGeneratingPepTalk && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Generating your pep talk...
                </p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              {selectedAction === "coaching" ? "Generate Coaching Note" : "Generate Pep Talk"}
            </h2>
            
            <RecordingSelectionModal
              isOpen={isOpen}
              onClose={onClose}
              selectedRecordings={selectedIds}
              onSelect={handleRecordingSelect}
              onGenerate={selectedAction === "coaching" ? handleGenerateCoachingNote : handleGeneratePepTalk}
              isGenerating={isGeneratingPepTalk}
              recordings={recordings}
            />

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isGeneratingPepTalk}
              >
                Cancel
              </Button>
              <Button
                onClick={selectedAction === "coaching" ? handleGenerateCoachingNote : handleGeneratePepTalk}
                disabled={selectedIds.length === 0 || isGeneratingPepTalk}
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaybookModals;
