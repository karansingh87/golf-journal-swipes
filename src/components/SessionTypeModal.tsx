import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Flag, Target } from "lucide-react";

interface SessionTypeModalProps {
  isOpen: boolean;
  onSelect: (type: "course" | "practice") => void;
}

const SessionTypeModal = ({ isOpen, onSelect }: SessionTypeModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-black/95 border-green-500/20 text-white">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center text-green-400">
            Select Session Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onSelect("course")}
              className="flex flex-col items-center gap-3 p-6 rounded-lg bg-green-950/30 border border-green-500/20 hover:bg-green-900/40 transition-all duration-200"
            >
              <Flag className="w-8 h-8 text-green-400" />
              <h3 className="text-lg font-medium text-green-400">Course Play</h3>
              <p className="text-sm text-green-400/60 text-center">
                Record your thoughts during an actual round
              </p>
            </button>

            <button
              onClick={() => onSelect("practice")}
              className="flex flex-col items-center gap-3 p-6 rounded-lg bg-green-950/30 border border-green-500/20 hover:bg-green-900/40 transition-all duration-200"
            >
              <Target className="w-8 h-8 text-green-400" />
              <h3 className="text-lg font-medium text-green-400">Practice Session</h3>
              <p className="text-sm text-green-400/60 text-center">
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