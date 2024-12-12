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
      <DialogContent className="w-full max-w-2xl p-6 bg-white rounded-[20px] shadow-lg animate-scale-in">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-golf-gray-text-primary">
            Select Session Type
          </h2>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={() => onSelect("course")}
              className="group w-full p-6 rounded-2xl bg-golf-gray-light hover:bg-white transition-all duration-200 
                hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-golf-green/20"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-golf-green/10 rounded-full group-hover:bg-golf-green/20 
                    transition-colors duration-200" />
                  <Flag className="w-8 h-8 text-golf-green" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-semibold text-golf-gray-text-primary">
                    Course Play
                  </h3>
                  <p className="text-sm text-golf-gray-text-secondary">
                    Record your thoughts during an actual round
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSelect("practice")}
              className="group w-full p-6 rounded-2xl bg-golf-gray-light hover:bg-white transition-all duration-200 
                hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-golf-green/20"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-golf-green/10 rounded-full group-hover:bg-golf-green/20 
                    transition-colors duration-200" />
                  <Target className="w-8 h-8 text-golf-green" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-semibold text-golf-gray-text-primary">
                    Practice Session
                  </h3>
                  <p className="text-sm text-golf-gray-text-secondary">
                    Track your practice and training progress
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