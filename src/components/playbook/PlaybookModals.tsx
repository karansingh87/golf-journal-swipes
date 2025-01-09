import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RecordingSelectionModal from "./RecordingSelectionModal";
import { supabase } from "@/integrations/supabase/client";

interface PlaybookModalsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAction: "coaching" | "pep_talk" | null;
  selectedRecordings: string[];
}

const PlaybookModals = ({
  isOpen,
  onClose,
  selectedAction,
  selectedRecordings,
}: PlaybookModalsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isGeneratingPepTalk, setIsGeneratingPepTalk] = useState(false);

  const handleGeneratePepTalk = async () => {
    try {
      setIsGeneratingPepTalk(true);
      
      const response = await fetch('/api/generate-pep-talk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recording_ids: selectedRecordings,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate pep talk');
      }

      const pepTalkContent = await response.json();

      const { data: pepTalk, error: saveError } = await supabase
        .from('pep_talk')
        .insert({
          content: JSON.stringify(pepTalkContent),
          recording_ids: selectedRecordings,
        })
        .select()
        .single();

      if (saveError) throw saveError;

      toast({
        title: "Success",
        description: "Pep talk generated successfully",
      });

      onClose();
      // Ensure we have a valid ID before navigating
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

  return (
    <>
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
                selectedRecordings={selectedRecordings}
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
                  disabled={selectedRecordings.length === 0 || isGeneratingPepTalk}
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaybookModals;
