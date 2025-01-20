import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoOverlay = ({ isOpen, onClose }: VideoOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-[110] rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors"
        aria-label="Close video"
      >
        <X className="h-6 w-6 text-white" />
      </button>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div 
          style={{
            width: 'min(80vw, calc(1080px * 0.8))',
            height: 'min(90vh, calc(1920px * 0.8))',
            aspectRatio: '1080/1920',
          }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
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
    </div>
  );
};

export default VideoOverlay;