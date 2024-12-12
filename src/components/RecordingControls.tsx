import { Pause, Mic, History, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "./recorder/ControlButton";

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
    <div className="flex items-center justify-center gap-8 sm:gap-10 px-4">
      <ControlButton
        icon={History}
        onClick={() => navigate('/notes')}
      />

      <ControlButton
        icon={isRecording && !isPaused ? Pause : Mic}
        onClick={isRecording ? (isPaused ? onResume : onPause) : onStart}
        isLarge
        isActive={isRecording}
        isPaused={isPaused}
      />

      <ControlButton
        icon={Eye}
        onClick={() => {}} // Placeholder for insights
      />
    </div>
  );
};

export default RecordingControls;