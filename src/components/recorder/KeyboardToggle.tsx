import { Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeyboardToggleProps {
  onSwitchToText: () => void;
}

const KeyboardToggle = ({ onSwitchToText }: KeyboardToggleProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onSwitchToText}
      className="flex items-center gap-2 text-green-400/70 hover:text-green-400/90 transition-colors"
    >
      <Keyboard className="w-4 h-4" />
      <span className="text-sm">Use Keyboard</span>
    </Button>
  );
};

export default KeyboardToggle;