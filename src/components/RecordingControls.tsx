import { Pause, Mic, NotebookPen, Keyboard } from "lucide-react";
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
  onSwitchToText?: () => void;
}

const RecordingControls = ({
  isRecording,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
  onSwitchToText,
}: RecordingControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 inset-x-0 pb-8 pt-4 bg-gradient-to-t from-background to-transparent">
      <div className="flex items-center justify-between max-w-md mx-auto px-12">
        <ControlButton
          icon={NotebookPen}
          onClick={() => navigate('/playbook')}
          variant="dark"
          size="medium"
        />

        <div className="relative">
          {isRecording && !isPaused && (
            <div className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#18181B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="289.02652413026095"
                  strokeDashoffset="216.76989309769572"
                  style={{
                    filter: 'drop-shadow(0 0 2px #18181B)',
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
          {isRecording ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ControlButton
                text="End"
                onClick={onStop}
                variant="dark"
                size="medium"
                className="text-white hover:text-white/90 min-w-[48px]"
              />
            </motion.div>
          ) : (
            <ControlButton
              icon={Keyboard}
              onClick={onSwitchToText}
              variant="dark"
              size="medium"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecordingControls;