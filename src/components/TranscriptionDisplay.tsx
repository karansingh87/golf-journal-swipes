interface TranscriptionDisplayProps {
  transcription: string;
  isTranscribing: boolean;
}

const TranscriptionDisplay = ({ transcription, isTranscribing }: TranscriptionDisplayProps) => {
  if (!transcription && !isTranscribing) return null;

  return (
    <div className="w-full mb-20">
      {isTranscribing && (
        <p className="text-gray-600 text-center mb-4">Transcribing your recording...</p>
      )}
      {transcription && (
        <p className="text-gray-600 text-lg leading-relaxed">
          {transcription}
        </p>
      )}
    </div>
  );
};

export default TranscriptionDisplay;