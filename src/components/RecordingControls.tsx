import { Pause, Mic, Notebook } from "lucide-react";
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
      <div className="relative flex items-center justify-center max-w-md mx-auto px-12">
        <AnimatePresence>
          {!isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute left-0"
            >
              <ControlButton
                icon={Notebook}
                onClick={() => navigate('/notes')}
                variant="secondary"
                size="medium"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {isRecording && !isPaused && (
            <div className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#ACE580"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="289.02652413026095"
                  strokeDashoffset="216.76989309769572"
                  style={{
                    filter: 'drop-shadow(0 0 2px #ACE580)',
                  }}
                />
              </svg>
            </div>
          )}
          <ControlButton
            icon={isRecording && !isPaused ? Pause : Mic}
            onClick={isRecording ? (isPaused ? onResume : onPause) : onStart}
            isLarge
            isActive={isRecording}
            isPaused={isPaused}
            variant="dark"
          />
        </div>

        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-0"
            >
              <ControlButton
                text="End"
                onClick={onStop}
                variant="secondary"
                size="medium"
                className="text-white hover:text-white/90 min-w-[48px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecordingControls;