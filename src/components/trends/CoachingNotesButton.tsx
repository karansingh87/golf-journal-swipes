import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import RecordingSelector from "./RecordingSelector";

export const CoachingNotesButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecordings, setSelectedRecordings] = useState<string[]>([]);
  const session = useSession();
  const { toast } = useToast();

  const handleGenerateNotes = async () => {
    if (!session || selectedRecordings.length === 0) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('generate-coaching-notes', {
        body: {
          recordingIds: selectedRecordings,
          userId: session.user.id,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Coaching notes generated successfully!",
      });

      setIsOpen(false);
      setSelectedRecordings([]);
    } catch (error) {
      console.error('Error generating coaching notes:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate coaching notes. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Brain className="h-4 w-4" />
        Generate Coach Notes
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[360px] p-4">
          <DialogHeader className="px-1">
            <DialogTitle className="text-base">Generate Coaching Notes</DialogTitle>
          </DialogHeader>
          
          <div className="py-2">
            <RecordingSelector
              selectedRecordings={selectedRecordings}
              onSelectionChange={setSelectedRecordings}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
              className="h-8"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateNotes}
              disabled={selectedRecordings.length === 0 || isLoading}
              className="h-8"
            >
              {isLoading ? "Generating..." : "Generate Notes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};