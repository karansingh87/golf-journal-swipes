import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDuration } from "@/lib/utils";

interface TranscriptionSegment {
  text: string;
  start: number;
  end: number;
}

interface TranscriptionTabProps {
  transcription: string | null;
}

const TranscriptionTab = ({ transcription }: TranscriptionTabProps) => {
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
    <div className="px-6 py-8">
      {segments.length > 0 ? (
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
      ) : (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-border/50">
          <p className="text-sm text-muted-foreground">
            No transcription available
          </p>
        </div>
      )}
    </div>
  );
};

export default TranscriptionTab;