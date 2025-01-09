import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PepTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const PepTalkModal = ({
  isOpen,
  onClose,
  onGenerate,
  isGenerating,
}: PepTalkModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[360px] p-0 gap-0 bg-white rounded-xl">
        <DialogHeader className="p-3 pb-2 border-b">
          <DialogTitle className="text-sm font-medium">Generate Pep Talk</DialogTitle>
        </DialogHeader>
        
        <div className="p-3">
          <p className="text-sm text-muted-foreground">
            Generate a personalized pep talk based on your last 3 recordings to boost your confidence and motivation.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 p-3 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-8 text-xs px-3"
          >
            Cancel
          </Button>
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="h-8 text-xs px-3"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Pep Talk"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PepTalkModal;