import { Share } from "lucide-react";

const IOSInstallInstructions = () => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Share className="h-4 w-4" />
      <span>Tap Share and 'Add to Home Screen' to install</span>
    </div>
  );
};

export default IOSInstallInstructions;