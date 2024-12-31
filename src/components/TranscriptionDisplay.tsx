import { Loader2 } from "lucide-react";
import { formatDuration } from "@/lib/utils";

interface TranscriptionSegment {
  text: string;
  start: number;
  end: number;
}

interface TranscriptionDisplayProps {
  transcription: string;
  isTranscribing: boolean;
}

const TranscriptionDisplay = ({ transcription, isTranscribing }: TranscriptionDisplayProps) => {
  if (!transcription && !isTranscribing) return null;

  // Parse the transcription if it's in JSON format
  const segments: TranscriptionSegment[] = transcription 
    ? (() => {
        try {
          const parsed = JSON.parse(transcription);
          return parsed.segments || [];
        } catch {
          // If parsing fails, treat it as a single segment without timestamps
          return [{
            text: transcription,
            start: 0,
            end: 0
          }];
        }
      })()
    : [];

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
      {segments.length > 0 && (
        <div className="space-y-6">
          {segments.map((segment, index) => (
            <div 
              key={index}
              className="group relative flex gap-6 rounded-lg border border-border/50 bg-background p-4 transition-colors hover:bg-muted/50"
            >
              {segment.start > 0 && (
                <div className="w-24 flex-shrink-0 text-sm text-muted-foreground">
                  {formatDuration(segment.start)}
                </div>
              )}
              <div className="flex-1">
                <p className="text-[15px] leading-relaxed text-foreground">
                  {segment.text.trim()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranscriptionDisplay;