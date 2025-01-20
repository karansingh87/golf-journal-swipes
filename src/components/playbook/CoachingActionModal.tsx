import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, Plus, Target } from "lucide-react";

interface CoachingActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewLatest: () => void;
  onCreateNew: () => void;
}

const CoachingActionModal = ({ isOpen, onClose, onViewLatest, onCreateNew }: CoachingActionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm p-4 bg-white rounded-[16px] shadow-lg animate-scale-in">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full" />
            <Target className="w-6 h-6 text-primary relative z-10" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-zinc-950">
              Prepare for Your Lesson
            </h2>
            <p className="text-sm text-zinc-500">
              Organize your recent rounds into focused notes for your coach.
            </p>
            <p className="text-xs text-zinc-400">
              Choose up to 3 rounds to include
            </p>
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={onCreateNew}
              className="w-full p-3 rounded-xl bg-primary text-white hover:bg-primary/90 
                transition-colors duration-200 font-medium"
            >
              New Lesson Prep
            </button>
            
            <button
              onClick={onViewLatest}
              className="w-full p-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 
                transition-colors duration-200 text-zinc-900 font-medium"
            >
              View Past Notes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoachingActionModal;