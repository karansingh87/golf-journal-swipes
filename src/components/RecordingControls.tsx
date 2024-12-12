import { Pause, Mic, History, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "./recorder/ControlButton";
import { motion, AnimatePresence } from "framer-motion";

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onCancel: () => void;
}

const RecordingControls = ({
  isRecording,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
}: RecordingControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-8 sm:gap-10 px-4">
        <ControlButton
          icon={History}
          onClick={() => navigate('/notes')}
          variant="secondary"
        />

        <ControlButton
          icon={isRecording && !isPaused ? Pause : Mic}
          onClick={isRecording ? (isPaused ? onResume : onPause) : onStart}
          isLarge
          isActive={isRecording}
          isPaused={isPaused}
          variant="primary"
        />

        <ControlButton
          icon={Eye}
          onClick={() => {}} // Placeholder for insights
          variant="secondary"
        />
      </div>

      <AnimatePresence>
        {isRecording && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={onStop}
            className="px-6 py-2 text-sm font-medium text-golf-green hover:text-golf-green/90 
                     transition-colors duration-200"
          >
            Finish Recording
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecordingControls;