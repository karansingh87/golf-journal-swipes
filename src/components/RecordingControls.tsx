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
    <div className="flex flex-col items-center gap-6">
      {isRecording && (
        <button
          onClick={onStop}
          className={`px-5 py-1.5 rounded-full flex items-center justify-center gap-2 transition-all duration-200
            ${isDark 
              ? 'bg-green-950/30 border border-green-500/20 hover:bg-green-900/40 text-green-400' 
              : 'bg-golf-sand hover:bg-golf-sand/80 text-golf-gray border border-golf-sand'
            }`}
        >
          <Square className="w-4 h-4 fill-current" />
          <span className="text-sm">Finish</span>
        </button>
      )}
      
      <div className="flex items-center justify-center gap-8 sm:gap-10">
        <button
          onClick={() => navigate('/history')}
          className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200
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
            className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-200
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
            className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-green-900/40 active:scale-95 relative
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
          className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200
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