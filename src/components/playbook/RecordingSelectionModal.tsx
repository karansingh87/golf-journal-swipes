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
      <DialogContent className="max-w-[360px] p-0 gap-0 bg-white rounded-xl">
        <DialogHeader className="p-3 pb-2 border-b">
          <DialogTitle className="text-sm font-medium">Select Recordings</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[400px] px-3">
          <div className="space-y-1.5 py-2">
            {recordings?.slice(0, displayCount).map((recording) => (
              <button
                key={recording.id}
                className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-start gap-2.5
                  ${
                    selectedRecordings.includes(recording.id)
                      ? "border-primary/20 bg-primary/5"
                      : "border-border/40 hover:bg-accent/40"
                  }`}
                onClick={() => onSelect(recording.id)}
              >
                {selectedRecordings.includes(recording.id) ? (
                  <CheckSquare className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground/70 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed text-foreground/90 line-clamp-2">
                    {recording.transcription?.slice(0, 80)}...
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {format(new Date(recording.created_at), "MMM d, yyyy")}
                  </p>
                </div>
              </button>
            ))}
            
            {displayCount < (recordings?.length || 0) && (
              <Button
                variant="ghost"
                className="w-full h-8 text-xs"
                onClick={handleLoadMore}
              >
                <PlusSquare className="w-3.5 h-3.5 mr-1.5" />
                Load More
              </Button>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between gap-2 p-3 border-t">
          <p className="text-xs text-muted-foreground">
            {selectedRecordings.length}/3 selected
          </p>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-8 text-xs px-3"
            >
              Cancel
            </Button>
            <Button
              onClick={onGenerate}
              disabled={selectedRecordings.length === 0 || isGenerating}
              className="h-8 text-xs px-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
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