import { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const InstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user has already dismissed or installed
    const isInstallDismissed = localStorage.getItem('pwa-install-dismissed');
    
    if (isInstallDismissed) return;

    // Check if the device is iOS - using a more TypeScript-friendly approach
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // For non-iOS devices, listen for install prompt
    if (!isIOSDevice) {
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowBanner(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    } else {
      // For iOS, show banner if not in standalone mode
      const isStandalone = ('standalone' in window.navigator) && (window.navigator['standalone'] === true);
      if (!isStandalone) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleInstall = async () => {
    if (isIOS) return; // iOS uses different installation flow
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowBanner(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', 'true');
    setShowBanner(false);
  };

  // Don't show on landing page
  if (location.pathname === '/') return null;

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      <div className="mx-auto max-w-md px-4 py-2 mb-4">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-white/80 backdrop-blur-sm px-4 py-2 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 text-sm text-golf-gray-text-primary">
            {isIOS ? (
              <>
                <Share className="h-4 w-4" />
                <span>Tap Share then 'Add to Home Screen'</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Add GolfLog to home screen</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isIOS && (
              <button
                onClick={handleInstall}
                className="text-sm font-medium text-golf-gray-text-primary hover:text-golf-gray-text-secondary"
              >
                Install
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="rounded-full p-1 hover:bg-gray-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 text-golf-gray-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallBanner;