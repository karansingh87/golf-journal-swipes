import { Pause, Mic, History, Check } from "lucide-react";
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
    <div className="fixed bottom-0 inset-x-0 pb-8 pt-4 bg-gradient-to-t from-background to-transparent">
      <div className="flex items-center justify-between max-w-md mx-auto px-12">
        <ControlButton
          icon={History}
          onClick={() => navigate('/notes')}
          variant="secondary"
          size="small"
        />

        <ControlButton
          icon={isRecording && !isPaused ? Pause : Mic}
          onClick={isRecording ? (isPaused ? onResume : onPause) : onStart}
          isLarge
          isActive={isRecording}
          isPaused={isPaused}
          variant="dark"
        />

        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ControlButton
                icon={Check}
                onClick={onStop}
                variant="secondary"
                size="small"
                className="text-white hover:text-white/90"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecordingControls;