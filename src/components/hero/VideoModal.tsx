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
        className="max-w-[85vw] sm:max-w-[80vw] mt-14 p-0 border-none bg-transparent"
      >
        <div className="relative w-full max-h-[calc(100vh-7rem)] mx-auto bg-black rounded-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute -right-6 -top-6 z-50 rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors"
            aria-label="Close video"
          >
            <X className="h-4 w-4 text-white" />
          </button>
          <div className="aspect-video w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;