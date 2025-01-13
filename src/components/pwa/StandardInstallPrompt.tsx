import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StandardInstallPromptProps {
  onInstall: () => void;
}

const StandardInstallPrompt = ({ onInstall }: StandardInstallPromptProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Add GolfLog to your home screen</span>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 px-2" 
        onClick={onInstall}
      >
        <Download className="h-4 w-4 mr-1" />
        Install
      </Button>
    </div>
  );
};

export default StandardInstallPrompt;