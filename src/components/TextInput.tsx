import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TextInputProps {
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

const TextInput = ({ onSubmit, onCancel }: TextInputProps) => {
  const [text, setText] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your golf note here..."
        className="min-h-[200px] mb-4"
      />
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit(text)}
          className="bg-golf-green hover:bg-golf-green/90 text-white"
        >
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default TextInput;