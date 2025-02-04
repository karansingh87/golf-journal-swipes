import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Flag, Target } from "lucide-react";

interface SessionTypeModalProps {
  isOpen: boolean;
  onSelect: (type: "course" | "practice") => void;
  onClose: () => void;
}

const SessionTypeModal = ({ isOpen, onSelect, onClose }: SessionTypeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm p-4 bg-white rounded-[16px] shadow-lg animate-scale-in">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-center text-zinc-950">
            Select Session Type
          </h2>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onSelect("course")}
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
                    Course Play
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Journal your round
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSelect("practice")}
              className="group w-full p-3 rounded-xl bg-zinc-100 hover:bg-white transition-all duration-200 
                hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-zinc-200 rounded-full group-hover:bg-zinc-100 
                    transition-colors duration-200" />
                  <Target className="w-5 h-5 text-zinc-950 relative z-10" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-medium text-zinc-950">
                    Practice Session
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Track practice progress
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

export default SessionTypeModal;