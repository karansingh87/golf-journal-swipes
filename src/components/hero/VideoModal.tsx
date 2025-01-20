import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-screen-lg p-0 border-none bg-black/30 backdrop-blur-xl px-4 sm:px-0 flex items-center justify-center"
        style={{ zIndex: 999 }}
        hideCloseButton={true}
      >
        <button
          onClick={onClose}
          className="absolute -right-2 -top-8 z-[1000] rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors"
          aria-label="Close video"
        >
          <X className="h-4 w-4 text-white" />
        </button>
        
        <video
          ref={videoRef}
          className="w-auto h-[85vh] sm:h-[90vh] rounded-lg mx-auto"
          controls
          playsInline
          preload="auto"
          autoPlay
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        >
          <source
            src="https://ffrdieftaulfjaymmexb.supabase.co/storage/v1/object/public/Videos/golflog_demo_1080_1920.mp4?t=2025-01-19T13%3A53%3A41.585Z"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;