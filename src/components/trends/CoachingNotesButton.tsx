import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RecordingSelector from "./RecordingSelector";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const CoachingNotesButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecordings, setSelectedRecordings] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerateNotes = async () => {
    if (selectedRecordings.length === 0) {
      toast({
        title: "No recordings selected",
        description: "Please select at least one recording to generate coaching notes.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-coaching-notes', {
        body: { recordingIds: selectedRecordings }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Coaching notes generated successfully",
      });

      // Navigate to the new coaching notes detail view
      navigate(`/coaching-notes/${data.notes.id}`);
      setIsOpen(false);
    } catch (error) {
      console.error('Error generating coaching notes:', error);
      toast({
        title: "Error",
        description: "Failed to generate coaching notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <ClipboardList className="h-4 w-4" />
        <span>Generate Coach Notes</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[360px] p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Select Recordings
            </DialogTitle>
          </DialogHeader>
          
          <RecordingSelector
            selectedRecordings={selectedRecordings}
            onSelectionChange={setSelectedRecordings}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleGenerateNotes}
              disabled={selectedRecordings.length === 0 || isLoading}
              className="h-8"
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CoachingNotesButton;