import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";

interface AudioWaveformProps {
  isRecording: boolean;
  mediaStream: MediaStream | null;
}

const AudioWaveform = ({ isRecording, mediaStream }: AudioWaveformProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [amplitudes, setAmplitudes] = useState<number[]>(Array(5).fill(0.2));
  
  useEffect(() => {
    if (isRecording && mediaStream) {
      // Initialize Audio Context
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(mediaStream);
      
      // Configure analyser
      analyserRef.current.fftSize = 32; // Keep it small for performance
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      // Connect nodes
      source.connect(analyserRef.current);
      
      // Animation frame for updating visualization
      const updateWaveform = () => {
        if (!isRecording) return;
        
        analyserRef.current?.getByteFrequencyData(dataArrayRef.current!);
        
        // Calculate average amplitudes for 5 frequency ranges
        const newAmplitudes = Array(5).fill(0);
        const segmentLength = Math.floor(dataArrayRef.current!.length / 5);
        
        for (let i = 0; i < 5; i++) {
          let sum = 0;
          for (let j = 0; j < segmentLength; j++) {
            sum += dataArrayRef.current![i * segmentLength + j];
          }
          newAmplitudes[i] = (sum / segmentLength) / 255; // Normalize to 0-1
        }
        
        setAmplitudes(newAmplitudes);
        requestAnimationFrame(updateWaveform);
      };
      
      requestAnimationFrame(updateWaveform);
    }
    
    return () => {
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, [isRecording, mediaStream]);

  return (
    <div className="h-48 sm:h-64 w-full flex items-center justify-center">
      <motion.div
        className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center"
        animate={{
          scale: isRecording ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isRecording ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-2">
          {amplitudes.map((height, index) => (
            <motion.div
              key={index}
              className="w-3 sm:w-4 bg-green-500 rounded-full"
              animate={{
                height: isRecording ? `${Math.max(20, height * 100)}%` : "20%",
              }}
              transition={{
                duration: 0.1,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AudioWaveform;