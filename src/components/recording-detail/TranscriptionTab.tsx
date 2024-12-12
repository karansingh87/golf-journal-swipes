import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptionTabProps {
  transcription: string | null;
}

const TranscriptionTab = ({ transcription }: TranscriptionTabProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-300px)] px-6 py-4">
      <div className="text-foreground whitespace-pre-wrap">
        {transcription || "No transcription available"}
      </div>
    </ScrollArea>
  );
};

export default TranscriptionTab;