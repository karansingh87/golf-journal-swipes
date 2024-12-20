import { Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeyboardToggleProps {
  onSwitchToText: () => void;
  isRecording?: boolean;
}

const KeyboardToggle = ({ onSwitchToText, isRecording = false }: KeyboardToggleProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onSwitchToText}
      className={`flex items-center gap-2 text-golf-green hover:text-golf-muted hover:bg-golf-subtle transition-colors ${
        isRecording ? 'invisible' : 'visible'
      }`}
    >
      <Keyboard className="w-4 h-4" />
      <span className="text-sm">Use Keyboard</span>
    </Button>
  );
};

export default KeyboardToggle;