import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string; // Made optional
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl = '/demo.mp4' }) => { // Added default value
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        hideControls: false,
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && playerRef.current && videoRef.current) {
      const playVideo = async () => {
        try {
          await playerRef.current?.play();
        } catch (error) {
          console.error('Error playing video:', error);
        }
      };
      
      // Small delay to ensure modal is fully rendered
      setTimeout(playVideo, 100);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 bg-black/90 backdrop-blur-sm" style={{ zIndex: 50 }}>
        <VisuallyHidden>
          <DialogTitle>Product Demo Video</DialogTitle>
        </VisuallyHidden>
        <DialogDescription className="sr-only">
          A demonstration video showing the key features of our golf journal application
        </DialogDescription>
        
        <div className="relative w-full aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full"
            playsInline
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;