import { Loader2 } from "lucide-react";

interface ProcessingModalProps {
  isVisible: boolean;
  message?: string;
}

const ProcessingModal = ({ isVisible, message = "Processing your note..." }: ProcessingModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 isolate z-[9999] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] animate-in fade-in duration-200" />
      
      {/* Modal Content */}
      <div className="relative flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-200">
        <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
        <p className="text-golf-green/80 text-sm font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ProcessingModal;