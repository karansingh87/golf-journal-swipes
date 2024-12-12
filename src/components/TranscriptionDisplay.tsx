import { Loader2 } from "lucide-react";

interface TranscriptionDisplayProps {
  transcription: string;
  isTranscribing: boolean;
}

const TranscriptionDisplay = ({ transcription, isTranscribing }: TranscriptionDisplayProps) => {
  if (!transcription && !isTranscribing) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mb-20 px-4">
      {isTranscribing && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px] animate-in fade-in duration-200 z-50">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
            <p className="text-golf-green/80 text-sm font-medium">
              Processing your recording...
            </p>
          </div>
        </div>
      )}
      {transcription && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {transcription}
          </p>
        </div>
      )}
    </div>
  );
};

export default TranscriptionDisplay;