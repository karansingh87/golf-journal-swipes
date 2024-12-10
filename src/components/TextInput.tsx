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
    <div className="w-full max-w-2xl mx-auto">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your golf note here..."
        className="min-h-[200px] mb-4"
        disabled={isProcessing}
      />
      {isProcessing && (
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
          <p className="text-gray-600 text-center">
            Processing your note...
          </p>
        </div>
      )}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit(text)}
          className="bg-golf-green hover:bg-golf-green/90 text-white"
          disabled={isProcessing}
        >
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default TextInput;