import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, CheckSquare, Square, PlusSquare } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

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

const RECORDINGS_PER_PAGE = 5;

const RecordingSelectionModal = ({
  isOpen,
  onClose,
  recordings,
  selectedRecordings,
  onSelect,
  onGenerate,
  isGenerating,
}: RecordingSelectionModalProps) => {
  const [displayCount, setDisplayCount] = useState(RECORDINGS_PER_PAGE);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + RECORDINGS_PER_PAGE);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 gap-0 bg-white rounded-xl">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle>Select up to 3 Recordings</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] px-4">
          <div className="space-y-2 pb-4">
            {recordings?.slice(0, displayCount).map((recording) => (
              <button
                key={recording.id}
                className={`w-full p-3 rounded-lg border text-left transition-all flex items-center gap-3
                  ${
                    selectedRecordings.includes(recording.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-accent"
                  }`}
                onClick={() => onSelect(recording.id)}
              >
                {selectedRecordings.includes(recording.id) ? (
                  <CheckSquare className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">
                    {recording.transcription?.slice(0, 100)}...
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(recording.created_at), "MMM d, yyyy")}
                  </p>
                </div>
              </button>
            ))}
            
            {displayCount < (recordings?.length || 0) && (
              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={handleLoadMore}
              >
                <PlusSquare className="w-4 h-4 mr-2" />
                Load More
              </Button>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between gap-2 p-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedRecordings.length}/3 selected
          </p>
          <div className="flex gap-2">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordingSelectionModal;