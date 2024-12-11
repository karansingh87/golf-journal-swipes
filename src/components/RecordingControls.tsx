import { Pause, Mic, History, Eye, Square } from "lucide-react";
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
  onStop,
}: RecordingControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-3 px-4 pb-6">
      {isRecording && (
        <button
          onClick={onStop}
          className="mb-1 px-5 py-1.5 bg-green-950/30 rounded-full flex items-center justify-center gap-2 border border-green-500/20 transition-all duration-200 hover:bg-green-900/40"
        >
          <Square className="w-4 h-4 text-green-400 fill-green-400" />
          <span className="text-green-400 text-sm">Finish</span>
        </button>
      )}
      
      <div className="flex items-center justify-center gap-6 sm:gap-8">
        <button
          onClick={() => navigate('/history')}
          className="w-10 h-10 bg-green-950/30 rounded-full flex items-center justify-center border border-green-500/20 transition-all duration-200 hover:bg-green-900/40"
        >
          <History className="w-5 h-5 text-green-400" />
        </button>

        {isRecording ? (
          <button
            onClick={isPaused ? onResume : onPause}
            className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-95 relative group
              ${isPaused 
                ? 'bg-green-950/30 border-green-500/20 hover:bg-green-900/40' 
                : 'bg-green-500/80 border-red-500/50 hover:bg-green-500/90 animate-pulse'
              }`}
          >
            <div className={`absolute inset-0 rounded-full blur-md group-hover:blur-lg transition-all
              ${isPaused ? 'bg-green-500/20' : 'bg-green-500/40'}`} 
            />
            {isPaused ? (
              <Mic className="w-7 h-7 text-green-400 relative" />
            ) : (
              <Pause className="w-7 h-7 text-green-950 relative" />
            )}
          </button>
        ) : (
          <button
            onClick={onStart}
            className="w-14 h-14 bg-green-950/30 rounded-full flex items-center justify-center border border-green-500/20 transition-all duration-200 hover:bg-green-900/40 active:scale-95 relative group"
          >
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md group-hover:blur-lg transition-all" />
            <Mic className="w-7 h-7 text-green-400 relative" />
          </button>
        )}

        <button
          onClick={() => {}} // Placeholder for insights
          className="w-10 h-10 bg-green-950/30 rounded-full flex items-center justify-center border border-green-500/20 transition-all duration-200 hover:bg-green-900/40"
        >
          <Eye className="w-5 h-5 text-green-400" />
        </button>
      </div>
    </div>
  );
};

export default RecordingControls;