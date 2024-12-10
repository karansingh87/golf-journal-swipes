import { Pause, Mic, History, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
}: RecordingControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center gap-12 px-4">
      <button
        onClick={() => navigate('/history')}
        className="w-12 h-12 bg-green-950/30 rounded-full flex items-center justify-center border border-green-500/20 transition-all duration-200 hover:bg-green-900/40"
      >
        <History className="w-6 h-6 text-green-400" />
      </button>

      {isRecording ? (
        <button
          onClick={isPaused ? onResume : onPause}
          className="w-16 h-16 bg-green-950/30 rounded-full flex items-center justify-center border border-green-500/20 transition-all duration-200 hover:bg-green-900/40 active:scale-95 relative group"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md group-hover:blur-lg transition-all" />
          {isPaused ? (
            <div className="flex flex-col items-center relative">
              <Mic className="w-8 h-8 text-green-400" />
              <span className="text-xs text-green-400 mt-1">Continue</span>
            </div>
          ) : (
            <Pause className="w-8 h-8 text-green-400 relative" />
          )}
        </button>
      ) : (
        <button
          onClick={onStart}
          className="w-16 h-16 bg-green-950/30 rounded-full flex items-center justify-center border border-green-500/20 transition-all duration-200 hover:bg-green-900/40 active:scale-95 relative group"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md group-hover:blur-lg transition-all" />
          <Mic className="w-8 h-8 text-green-400 relative" />
        </button>
      )}

      <button
        onClick={() => {}} // Placeholder for insights
        className="w-12 h-12 bg-green-950/30 rounded-full flex items-center justify-center border border-green-500/20 transition-all duration-200 hover:bg-green-900/40"
      >
        <Eye className="w-6 h-6 text-green-400" />
      </button>
    </div>
  );
};

export default RecordingControls;