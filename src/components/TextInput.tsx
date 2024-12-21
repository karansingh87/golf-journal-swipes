import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { format } from "date-fns";
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
    setIsOpen(false);
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
        <DrawerContent className="h-[80vh] bg-[#FAFAF9] focus:outline-none">
          <div className="mx-auto w-full max-w-3xl h-full flex flex-col">
            <DrawerHeader className="border-b border-zinc-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleDismiss}
                  disabled={isProcessing || isSaving}
                  className="text-zinc-600 hover:text-zinc-800 hover:bg-transparent"
                >
                  Cancel
                </Button>
                <span className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-zinc-800">
                  {format(new Date(), 'MMM d, yyyy')}
                </span>
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing || isSaving || !text.trim()}
                  className="bg-zinc-800 hover:bg-zinc-900 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Save
                </Button>
              </div>
            </DrawerHeader>

            <div className="flex-1 px-6 overflow-hidden">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="How was golf today?"
                className="min-h-[200px] h-full max-h-[calc(80vh-8rem)] bg-transparent text-zinc-800 placeholder:text-gray-400 border-0 focus-visible:ring-0 resize-none text-lg leading-[2] px-0"
                style={{
                  backgroundImage: `linear-gradient(
                    transparent,
                    transparent calc(2em - 1px),
                    rgba(0, 0, 0, 0.04) calc(2em - 1px),
                    rgba(0, 0, 0, 0.04) 2em,
                    transparent 2em
                  )`,
                  backgroundSize: '100% 2em',
                  backgroundAttachment: 'local'
                }}
                disabled={isProcessing || isSaving}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      {(isProcessing || isSaving) && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px] animate-in fade-in duration-200 z-[9999]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
            <p className="text-zinc-600 text-sm font-medium">
              Processing your note...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TextInput;