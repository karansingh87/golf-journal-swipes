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
      <DialogContent className="bg-golf-white border-golf-gray-card">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center text-golf-gray-text-primary">
            Select Session Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onSelect("course")}
              className="flex flex-col items-center gap-3 p-6 rounded-lg bg-golf-gray-light border border-golf-gray-card hover:bg-golf-white hover:shadow-card-light transition-all duration-200"
            >
              <Flag className="w-8 h-8 text-golf-green" />
              <h3 className="text-lg font-medium text-golf-gray-text-primary">Course Play</h3>
              <p className="text-sm text-golf-gray-text-secondary text-center">
                Record your thoughts during an actual round
              </p>
            </button>

            <button
              onClick={() => onSelect("practice")}
              className="flex flex-col items-center gap-3 p-6 rounded-lg bg-golf-gray-light border border-golf-gray-card hover:bg-golf-white hover:shadow-card-light transition-all duration-200"
            >
              <Target className="w-8 h-8 text-golf-green" />
              <h3 className="text-lg font-medium text-golf-gray-text-primary">Practice Session</h3>
              <p className="text-sm text-golf-gray-text-secondary text-center">
                Track your practice and training progress
              </p>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionTypeModal;