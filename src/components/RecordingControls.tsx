import { Pause, Mic, History, Eye, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-3 px-4 pb-6">
      {isRecording && (
        <button
          onClick={onStop}
          className={`mb-1 px-5 py-1.5 rounded-full flex items-center justify-center gap-2 transition-all duration-200
            ${isDark 
              ? 'bg-green-950/30 border border-green-500/20 hover:bg-green-900/40 text-green-400' 
              : 'bg-golf-sand hover:bg-golf-sand/80 text-golf-gray border border-golf-sand'
            }`}
        >
          <Square className="w-4 h-4 fill-current" />
          <span className="text-sm">Finish</span>
        </button>
      )}
      
      <div className="flex items-center justify-center gap-6 sm:gap-8">
        <button
          onClick={() => navigate('/history')}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200
            ${isDark 
              ? 'bg-green-950/30 border-green-500/20 hover:bg-green-900/40 text-green-400' 
              : 'bg-golf-sand hover:bg-golf-sand/80 text-golf-gray border-golf-sand'
            }`}
        >
          <History className="w-5 h-5" />
        </button>

        {isRecording ? (
          <button
            onClick={isPaused ? onResume : onPause}
            className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-95 relative
              ${isPaused 
                ? isDark 
                  ? 'bg-green-950/30 border-green-500/20 hover:bg-green-900/40'
                  : 'bg-golf-sand border-golf-sand hover:bg-golf-sand/80'
                : isDark
                  ? 'bg-green-500 border-red-500/50 hover:bg-green-500/90'
                  : 'bg-golf-green border-golf-green hover:bg-golf-green/90'
              }`}
          >
            {isDark && (
              <div className={`absolute inset-0 rounded-full blur-md transition-all
                ${isPaused ? 'bg-green-500/20' : 'bg-green-500/40'}`} 
              />
            )}
            {isPaused ? (
              <Mic className={`w-7 h-7 relative ${isDark ? 'text-green-400' : 'text-golf-gray'}`} />
            ) : (
              <Pause className={`w-7 h-7 relative ${isDark ? 'text-green-950' : 'text-white'}`} />
            )}
          </button>
        ) : (
          <button
            onClick={onStart}
            className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-green-900/40 active:scale-95 relative
              ${isDark 
                ? 'bg-green-950/30 border-green-500/20' 
                : 'bg-golf-sand border-golf-sand hover:bg-golf-sand/80'
              }`}
          >
            {isDark && (
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md transition-all" />
            )}
            <Mic className={`w-7 h-7 relative ${isDark ? 'text-green-400' : 'text-golf-gray'}`} />
          </button>
        )}

        <button
          onClick={() => {}} // Placeholder for insights
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200
            ${isDark 
              ? 'bg-green-950/30 border-green-500/20 hover:bg-green-900/40 text-green-400' 
              : 'bg-golf-sand hover:bg-golf-sand/80 text-golf-gray border-golf-sand'
            }`}
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RecordingControls;