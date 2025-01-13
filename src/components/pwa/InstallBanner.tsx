import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { isIOSDevice } from "@/utils/deviceDetection";
import IOSInstallInstructions from "./IOSInstallInstructions";
import StandardInstallPrompt from "./StandardInstallPrompt";

const InstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const isInstallDismissed = localStorage.getItem("pwaInstallDismissed");
    if (isInstallDismissed) return;

    setIsIOS(isIOSDevice());

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Don't show on landing page
  if (location.pathname === "/") return null;

  if (!showBanner && !isIOS) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === "accepted") {
        setShowBanner(false);
      }
    } catch (error) {
      console.error("Error installing PWA:", error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("pwaInstallDismissed", "true");
  };

  return (
    <div className="fixed bottom-0 inset-x-0 p-2 bg-white/80 backdrop-blur-sm border-t z-50 flex items-center justify-between">
      {isIOS ? (
        <IOSInstallInstructions />
      ) : (
        <StandardInstallPrompt onInstall={handleInstall} />
      )}
      
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default InstallBanner;