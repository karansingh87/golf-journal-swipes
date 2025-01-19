import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";

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
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent">
        <div className="relative w-full max-h-[90vh] max-w-[calc(90vh*9/16)] mx-auto bg-black rounded-lg overflow-hidden">
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
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;