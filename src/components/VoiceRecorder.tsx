import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Square } from "lucide-react";
import { motion } from "framer-motion";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          const audioUrl = URL.createObjectURL(e.data);
          console.log("Recording saved:", audioUrl);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setTimer(0);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto touch-manipulation">
      <div className="w-full bg-golf-green/10 rounded-full px-6 py-3 mb-8 flex items-center gap-2">
        <div className="w-4 h-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-golf-green">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-golf-green text-sm">Say anything!</span>
      </div>

      {isRecording && (
        <div className="w-full mb-8">
          <motion.div
            className="w-full h-24 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M 0,50 Q 25,30 50,50 T 100,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-golf-green"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  d: [
                    "M 0,50 Q 25,30 50,50 T 100,50",
                    "M 0,50 Q 25,70 50,50 T 100,50",
                    "M 0,50 Q 25,30 50,50 T 100,50"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </motion.div>
        </div>
      )}

      <div className="flex items-center justify-center gap-12 w-full">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-16 h-16 bg-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-golf-gray">
            <path d="M8 12h8M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>

        <Button
          onClick={isRecording ? stopRecording : startRecording}
          size="icon"
          className={`w-20 h-20 rounded-full ${
            isRecording 
              ? 'bg-white border-2 border-red-500' 
              : 'bg-golf-green hover:bg-golf-green/90'
          } shadow-lg active:scale-95 transition-all duration-200 touch-manipulation`}
        >
          {isRecording ? (
            <Square className="h-8 w-8 text-red-500" />
          ) : (
            <div className="w-8 h-8">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-16 h-16 bg-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-golf-gray">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>

      {isRecording && (
        <div className="mt-6 text-golf-gray font-medium">
          {formatTime(timer)}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;