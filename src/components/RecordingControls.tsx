import { Pause, Square, Mic, X } from "lucide-react";

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
  onCancel,
}: RecordingControlsProps) => {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center gap-12 px-4">
      <button
        onClick={onCancel}
        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
      >
        <X className="w-6 h-6 text-gray-600" />
      </button>

      {isRecording ? (
        <>
          <button
            onClick={isPaused ? onResume : onPause}
            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200 active:scale-95"
          >
            {isPaused ? (
              <div className="flex flex-col items-center">
                <Mic className="w-8 h-8 text-gray-900" />
                <span className="text-xs text-gray-600 mt-1">Continue</span>
              </div>
            ) : (
              <Pause className="w-8 h-8 text-gray-900" />
            )}
          </button>
          <button
            onClick={onStop}
            className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"
          >
            <Square className="w-6 h-6 text-red-600" />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onStart}
            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200 active:scale-95"
          >
            <Mic className="w-8 h-8 text-gray-900" />
          </button>
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
            <div className="w-6 h-1 bg-gray-600 rounded-full" />
          </div>
        </>
      )}
    </div>
  );
};

export default RecordingControls;