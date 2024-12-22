import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  mediaRecorder: MediaRecorder | null;
  mediaStream: MediaStream | null;
  audioChunks: Blob[];
  recordingTime: number;
}

export const useRecorder = () => {
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    mediaRecorder: null,
    mediaStream: null,
    audioChunks: [],
    recordingTime: 0,
  });
  
  const { toast } = useToast();

  // Cleanup function to stop all media tracks
  const cleanup = () => {
    if (state.mediaStream) {
      state.mediaStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    setState(prev => ({
      ...prev,
      mediaStream: null,
      mediaRecorder: null,
      isRecording: false,
      isPaused: false,
    }));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.isRecording && !state.isPaused) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          recordingTime: prev.recordingTime + 1
        }));
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      cleanup(); // Ensure cleanup when component unmounts
    };
  }, [state.isRecording, state.isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setState(prev => ({
            ...prev,
            audioChunks: [...prev.audioChunks, e.data]
          }));
        }
      };

      recorder.start(1000); // Collect data every second
      setState(prev => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        mediaRecorder: recorder,
        mediaStream: stream
      }));
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: "Please allow microphone access to record",
      });
    }
  };

  const pauseRecording = () => {
    if (state.mediaRecorder && state.mediaRecorder.state === "recording") {
      state.mediaRecorder.pause();
      setState(prev => ({ ...prev, isPaused: true }));
    }
  };

  const resumeRecording = () => {
    if (state.mediaRecorder && state.mediaRecorder.state === "paused") {
      state.mediaRecorder.resume();
      setState(prev => ({ ...prev, isPaused: false }));
    }
  };

  const stopRecording = () => {
    if (state.mediaRecorder) {
      state.mediaRecorder.stop();
      cleanup(); // Clean up media stream when stopping
    }
  };

  const resetRecording = () => {
    cleanup();
    setState(prev => ({
      ...prev,
      audioChunks: [],
      recordingTime: 0,
    }));
  };

  return {
    ...state,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
  };
};