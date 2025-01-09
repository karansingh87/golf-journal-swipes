import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Flag, History } from "lucide-react";

interface PepTalkActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPast: () => void;
  onCreateNew: () => void;
}

const PepTalkActionModal = ({ isOpen, onClose, onViewPast, onCreateNew }: PepTalkActionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm p-4 bg-white rounded-[16px] shadow-lg animate-scale-in">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-center text-zinc-950">
            Pep Talk
          </h2>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={onCreateNew}
              className="group w-full p-3 rounded-xl bg-zinc-100 hover:bg-white transition-all duration-200 
                hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-zinc-200 rounded-full group-hover:bg-zinc-100 
                    transition-colors duration-200" />
                  <Flag className="w-5 h-5 text-zinc-950 relative z-10" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-medium text-zinc-950">
                    Create New
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Generate a new pep talk
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onViewPast}
              className="group w-full p-3 rounded-xl bg-zinc-100 hover:bg-white transition-all duration-200 
                hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-zinc-200 rounded-full group-hover:bg-zinc-100 
                    transition-colors duration-200" />
                  <History className="w-5 h-5 text-zinc-950 relative z-10" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-medium text-zinc-950">
                    View Past
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Browse previous pep talks
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PepTalkActionModal;