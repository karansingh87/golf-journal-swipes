import { useState } from "react";
import { Button } from "./ui/button";
import { Mic, Square } from "lucide-react";
import { motion } from "framer-motion";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

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
    <div className="flex flex-col items-center gap-4 md:gap-8 touch-manipulation">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isRecording ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: isRecording ? Infinity : 0, duration: 1.5 }}
        className="relative"
      >
        <div className={`absolute inset-0 bg-golf-green rounded-full ${
          isRecording ? 'animate-ping opacity-75' : 'opacity-0'
        }`}></div>
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          size="icon"
          className={`h-20 w-20 md:h-24 md:w-24 rounded-full ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-golf-green hover:bg-golf-green/90'
          } active:scale-95 transition-transform touch-manipulation`}
        >
          {isRecording ? (
            <Square className="h-10 w-10 md:h-12 md:w-12 text-white" />
          ) : (
            <Mic className="h-10 w-10 md:h-12 md:w-12 text-white" />
          )}
        </Button>
      </motion.div>
      <p className="text-golf-white text-base md:text-lg">
        {isRecording ? "Recording in progress..." : "Tap to start recording"}
      </p>
    </div>
  );
};

export default VoiceRecorder;