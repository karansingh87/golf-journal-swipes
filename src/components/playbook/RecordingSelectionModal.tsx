import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Recording {
  id: string;
  transcription: string;
  created_at: string;
}

interface RecordingSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordings: Recording[];
  selectedRecordings: string[];
  onSelect: (id: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const RecordingSelectionModal = ({
  isOpen,
  onClose,
  recordings,
  selectedRecordings,
  onSelect,
  onGenerate,
  isGenerating,
}: RecordingSelectionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 gap-0 bg-white rounded-xl">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle>Select Recordings</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] px-4">
          <div className="space-y-2 pb-4">
            {recordings?.slice(0, 10).map((recording) => (
              <button
                key={recording.id}
                className={`w-full p-3 rounded-lg border text-left transition-all
                  ${
                    selectedRecordings.includes(recording.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-accent"
                  }`}
                onClick={() => onSelect(recording.id)}
              >
                <p className="text-sm font-medium line-clamp-2">
                  {recording.transcription?.slice(0, 100)}...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(recording.created_at), "MMM d, yyyy")}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end gap-2 p-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9"
          >
            Cancel
          </Button>
          <Button
            onClick={onGenerate}
            disabled={selectedRecordings.length === 0 || isGenerating}
            className="h-9"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Notes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordingSelectionModal;