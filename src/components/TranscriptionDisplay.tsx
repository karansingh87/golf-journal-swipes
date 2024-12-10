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
        <div className="flex flex-col items-center justify-center space-y-2 py-8">
          <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
          <p className="text-gray-600 text-center">
            Processing your recording...
          </p>
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