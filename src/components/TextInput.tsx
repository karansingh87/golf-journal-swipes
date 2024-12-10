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
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your golf note here..."
        className="min-h-[200px] mb-4 bg-black/20 border-green-500/20 text-white placeholder:text-green-400/40 focus-visible:ring-green-500/30 focus-visible:ring-offset-0"
        disabled={isProcessing}
      />
      {isProcessing && (
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-400" />
          <p className="text-green-400/60">
            Processing your note...
          </p>
        </div>
      )}
      <div className="flex justify-center gap-4">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isProcessing}
          className="text-green-400/60 hover:text-green-400/80 hover:bg-green-950/30"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit(text)}
          disabled={isProcessing}
          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20"
        >
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default TextInput;