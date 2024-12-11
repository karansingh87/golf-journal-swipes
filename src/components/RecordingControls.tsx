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
}: RecordingControlsProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center gap-8 sm:gap-10 px-4">
      <button
        onClick={() => navigate('/history')}
        className={`relative z-10 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center border transition-all duration-200 touch-manipulation
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
          className={`relative z-10 w-16 h-16 min-w-[64px] min-h-[64px] rounded-full flex items-center justify-center border transition-all duration-200 touch-manipulation
            ${isPaused 
              ? isDark 
                ? 'bg-green-950/30 border-green-500/20 hover:bg-green-900/40'
                : 'bg-golf-sand border-golf-sand hover:bg-golf-sand/80'
              : isDark
                ? 'bg-green-500 border-green-500/50 hover:bg-green-500/90'
                : 'bg-golf-green border-golf-green hover:bg-golf-green/90'
            }`}
        >
          {isDark && (
            <div className={`absolute inset-0 rounded-full blur-md transition-opacity
              ${isPaused ? 'bg-green-500/20' : 'bg-green-500/40'}`} 
            />
          )}
          {isPaused ? (
            <Mic className={`relative z-20 w-7 h-7 ${isDark ? 'text-green-400' : 'text-golf-gray'}`} />
          ) : (
            <Pause className={`relative z-20 w-7 h-7 ${isDark ? 'text-green-950' : 'text-white'}`} />
          )}
        </button>
      ) : (
        <button
          onClick={onStart}
          className={`relative z-10 w-16 h-16 min-w-[64px] min-h-[64px] rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-green-900/40 active:scale-95 touch-manipulation
            ${isDark 
              ? 'bg-green-950/30 border-green-500/20' 
              : 'bg-golf-sand border-golf-sand hover:bg-golf-sand/80'
            }`}
        >
          {isDark && (
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md transition-opacity" />
          )}
          <Mic className={`relative z-20 w-7 h-7 ${isDark ? 'text-green-400' : 'text-golf-gray'}`} />
        </button>
      )}

      <button
        onClick={() => {}} // Placeholder for insights
        className={`relative z-10 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center border transition-all duration-200 touch-manipulation
          ${isDark 
            ? 'bg-green-950/30 border-green-500/20 hover:bg-green-900/40 text-green-400' 
            : 'bg-golf-sand hover:bg-golf-sand/80 text-golf-gray border-golf-sand'
          }`}
      >
        <Eye className="w-5 h-5" />
      </button>
    </div>
  );
};

export default RecordingControls;