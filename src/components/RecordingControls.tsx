import { Pause, Mic, History } from "lucide-react";
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
          size="medium"
        />

        <div className="relative">
          {isRecording && !isPaused && (
            <div className="absolute inset-0 w-full h-full">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  className="stroke-[#ACE580]"
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: '302',
                    strokeDashoffset: '302',
                    animation: 'dash 4s linear infinite',
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