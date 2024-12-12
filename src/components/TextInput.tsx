import { useState, useEffect } from "react";
import { Drawer } from "@/components/ui/drawer";
import SessionTypeModal from "./SessionTypeModal";
import ProcessingModal from "./ProcessingModal";
import NoteInputDrawer from "./NoteInputDrawer";

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
    if (isSaving) return;
    setIsOpen(false);
    onCancel();
  };

  const handleSubmit = async () => {
    if (!sessionType || isSaving) return;
    try {
      setIsSaving(true);
      await onSubmit(text, sessionType);
      setIsOpen(false);
    } catch (error) {
      setIsSaving(false);
    }
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
        <NoteInputDrawer
          text={text}
          onTextChange={setText}
          onSave={handleSubmit}
          onCancel={handleDismiss}
          isSaving={isSaving}
        />
      </Drawer>
      
      <ProcessingModal isVisible={isSaving || isProcessing} />
    </>
  );
};

export default TextInput;