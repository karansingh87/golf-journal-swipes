import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptionTabProps {
  transcription: string | null;
}

const TranscriptionTab = ({ transcription }: TranscriptionTabProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-380px)] px-6 pt-6">
      <div className="prose prose-sm max-w-none">
        <p className="text-base leading-relaxed text-golf-gray-text-secondary whitespace-pre-wrap">
          {transcription || "No transcription available"}
        </p>
      </div>
    </ScrollArea>
  );
};

export default TranscriptionTab;