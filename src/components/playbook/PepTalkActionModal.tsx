import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Flag, History, Flame } from "lucide-react";
import { useState } from "react";

interface PepTalkActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPast: () => void;
  onCreateNew: () => void;
}

const PepTalkActionModal = ({ isOpen, onClose, onViewPast, onCreateNew }: PepTalkActionModalProps) => {
  const [step, setStep] = useState<'intro' | 'action'>('intro');

  const handleCreateNew = () => {
    if (step === 'intro') {
      setStep('action');
    } else {
      onCreateNew();
      setStep('intro'); // Reset for next time
    }
  };

  const handleClose = () => {
    setStep('intro'); // Reset step when closing
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-sm p-4 bg-white rounded-[16px] shadow-lg animate-scale-in">
        {step === 'intro' ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Flame className="w-8 h-8 text-zinc-950 fill-current" />
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-zinc-950">
                Pick Recent Rounds
              </h2>
              <p className="text-sm text-zinc-500">
                Choose up to 3 moments for your confidence boost
              </p>
            </div>

            <button
              onClick={handleCreateNew}
              className="w-full p-3 mt-2 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get a Pep Talk
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center text-zinc-950">
              Pep Talk
            </h2>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCreateNew}
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
                      New Pep Talk
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Use your best rounds to boost confidence
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
                      Past Pep Talks
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Browse previous pep talks
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PepTalkActionModal;