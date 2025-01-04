import { Loader2 } from "lucide-react";

interface RecordingStatusProps {
  isTranscribing: boolean;
}

const RecordingStatus = ({ isTranscribing }: RecordingStatusProps) => {
  if (!isTranscribing) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-[2px] z-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
        <p className="text-golf-green/80 text-sm font-medium">
          Processing your recording...
        </p>
      </div>
    </div>
  );
};

export default RecordingStatus;