import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr>();

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'fullscreen'
        ],
        hideControls: false,
        resetOnEnd: true,
      });
    }

    // Clean up
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && playerRef.current) {
      playerRef.current.play();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-screen-lg p-0 border-none bg-black/70 backdrop-blur-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors"
          aria-label="Close video"
        >
          <X className="h-4 w-4 text-white" />
        </button>
        
        <div className="relative w-full aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full"
            playsInline
            preload="auto"
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