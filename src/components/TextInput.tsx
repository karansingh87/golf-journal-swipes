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
import SessionTypeModal from "./SessionTypeModal";

interface TextInputProps {
  onSubmit: (text: string, sessionType: "course" | "practice") => Promise<void>;
  onCancel: () => void;
  isProcessing: boolean;
}

const TextInput = ({ onSubmit, onCancel, isProcessing }: TextInputProps) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(true);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (sessionType) {
      const timer = setTimeout(() => {
        const textarea = document.querySelector('textarea');
        textarea?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [sessionType]);

  const handleDismiss = () => {
    setIsOpen(false);
    onCancel();
  };

  const handleSubmit = async () => {
    if (!sessionType) return;
    setIsSaving(true);
    setIsOpen(false); // Hide drawer immediately
    // Small delay to allow drawer to close smoothly before showing processing modal
    await new Promise(resolve => setTimeout(resolve, 150));
    await onSubmit(text, sessionType);
    setIsSaving(false);
  };

  const handleSessionSelect = (type: "course" | "practice") => {
    setSessionType(type);
    setShowSessionModal(false);
  };

  if (showSessionModal) {
    return (
      <SessionTypeModal
        isOpen={showSessionModal}
        onSelect={handleSessionSelect}
        onClose={() => {
          setShowSessionModal(false);
          handleDismiss();
        }}
      />
    );
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleDismiss}>
        <DrawerContent className="h-[80vh] bg-[#F5F5F5] focus:outline-none">
          <div className="mx-auto w-full max-w-3xl h-full flex flex-col">
            <DrawerHeader className="border-b border-golf-gray-card px-6 py-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleDismiss}
                  disabled={isProcessing || isSaving}
                  className="text-golf-gray-text-primary hover:text-golf-gray-text-primary/80 hover:bg-golf-gray-card"
                >
                  Cancel
                </Button>
                <DrawerTitle className="absolute left-1/2 -translate-x-1/2 text-golf-gray-text-primary">
                  Add Note
                </DrawerTitle>
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing || isSaving || !text.trim()}
                  className="bg-golf-green hover:bg-golf-muted text-golf-white disabled:opacity-50"
                >
                  Save
                </Button>
              </div>
            </DrawerHeader>

            <div className="flex-1 p-6 space-y-6 overflow-hidden">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind about your game?"
                className="min-h-[200px] h-full max-h-[calc(80vh-8rem)] bg-transparent border-0 text-golf-gray-text-primary placeholder:text-golf-gray-text-hint focus-visible:ring-0 resize-none text-lg leading-relaxed"
                disabled={isProcessing || isSaving}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      {(isProcessing || isSaving) && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px] animate-in fade-in duration-200 z-[9999]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
            <p className="text-golf-green/80 text-sm font-medium">
              Processing your note...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TextInput;