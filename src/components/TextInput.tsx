import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TextInputProps {
  onSubmit: (text: string) => Promise<void>;
  onCancel: () => void;
  isProcessing: boolean;
}

const TextInput = ({ onSubmit, onCancel, isProcessing }: TextInputProps) => {
  const [text, setText] = useState("");

  return (
    <div className="flex-1 flex flex-col p-4 max-w-2xl mx-auto">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your golf note here..."
        className="min-h-[200px] mb-4 bg-golf-subtle border-golf-green/20 text-golf-gray-text-primary placeholder:text-golf-green/40 focus-visible:ring-golf-green/30 focus-visible:ring-offset-0"
        disabled={isProcessing}
      />
      {isProcessing && (
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
          <p className="text-golf-green/60">
            Processing your note...
          </p>
        </div>
      )}
      <div className="flex justify-center gap-4">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isProcessing}
          className="text-golf-green hover:text-golf-muted hover:bg-golf-subtle"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit(text)}
          disabled={isProcessing}
          className="bg-golf-green hover:bg-golf-muted text-golf-white"
        >
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default TextInput;