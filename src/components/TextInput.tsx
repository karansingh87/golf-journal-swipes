import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface TextInputProps {
  onSubmit: (text: string) => Promise<void>;
  onCancel: () => void;
  isProcessing: boolean;
}

const TextInput = ({ onSubmit, onCancel, isProcessing }: TextInputProps) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  // Auto-focus the textarea when opened
  useEffect(() => {
    const timer = setTimeout(() => {
      const textarea = document.querySelector('textarea');
      textarea?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    onCancel();
  };

  const handleSubmit = async () => {
    await onSubmit(text);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleDismiss}>
      <DrawerContent className="bg-[#F5F5F5] focus:outline-none">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader className="border-b border-golf-gray-card px-4 py-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleDismiss}
                disabled={isProcessing}
                className="text-golf-gray-text-primary hover:text-golf-gray-text-primary/80 hover:bg-golf-gray-card"
              >
                Cancel
              </Button>
              <DrawerTitle className="absolute left-1/2 -translate-x-1/2 text-golf-gray-text-primary">
                Add Note
              </DrawerTitle>
              <Button
                onClick={handleSubmit}
                disabled={isProcessing || !text.trim()}
                className="bg-golf-green hover:bg-golf-muted text-golf-white disabled:opacity-50"
              >
                Save
              </Button>
            </div>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind about your game?"
              className="min-h-[200px] max-h-[50vh] bg-transparent border-0 text-golf-gray-text-primary placeholder:text-golf-gray-text-hint focus-visible:ring-0 resize-none text-base"
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
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TextInput;