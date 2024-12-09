import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Pause } from "lucide-react";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [transcription, setTranscription] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          const audioUrl = URL.createObjectURL(e.data);
          console.log("Recording saved:", audioUrl);
          // Simulate transcription (in real app, this would come from OpenAI)
          setTranscription("It started with a sore throat. Then, I began to have a runny nose and frequent sneezing. Yesterday, I noticed that I had a mild fever and felt really tired. Today, I've been");
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
    <div className="min-h-screen bg-white px-4 pt-12 pb-6 flex flex-col">
      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-white flex items-center justify-between px-4">
        <div className="text-sm font-medium text-gray-900">9:41</div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="currentColor" d="M12.33 4.67c.98-.98 2.36-1.32 3.62-.89.7.23 1.29.75 1.61 1.43.36.88.33 1.87-.1 2.71-.42.85-1.18 1.5-2.08 1.77l-.33.1c-.29.08-.53.29-.63.57l-.06.22c-.12.45-.11.93.04 1.37.14.44.41.83.77 1.11l.18.13c.83.6 1.41 1.51 1.58 2.55.17 1.03-.1 2.08-.74 2.89-.53.66-1.27 1.11-2.09 1.26-.82.16-1.66-.04-2.37-.55-.7-.51-1.16-1.28-1.3-2.12-.13-.84.09-1.7.62-2.35.43-.52.68-1.16.72-1.84.04-.67-.13-1.34-.48-1.91-.29-.47-.83-.77-1.39-.77h-.05c-.56 0-1.1.3-1.39.77-.35.57-.52 1.24-.48 1.91.04.67.29 1.32.72 1.84.53.65.75 1.51.62 2.35-.14.84-.6 1.61-1.3 2.12-.71.51-1.55.71-2.37.55-.82-.15-1.56-.6-2.09-1.26-.64-.81-.91-1.86-.74-2.89.17-1.04.75-1.95 1.58-2.55l.18-.13c.36-.28.63-.67.77-1.11.15-.44.16-.92.04-1.37l-.06-.22c-.1-.28-.34-.49-.63-.57l-.33-.1c-.9-.27-1.66-.92-2.08-1.77-.43-.84-.46-1.83-.1-2.71.32-.68.91-1.2 1.61-1.43 1.26-.43 2.64-.09 3.62.89l.15.15c.37.37.88.58 1.41.58.53 0 1.04-.21 1.41-.58l.15-.15z"/>
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="currentColor" d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9zm0-16c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7zm3.5 10.5l-4.5-4.5 1.41-1.41L16 14.09l4.59-4.58L22 10.92l-6.5 6.5z"/>
            </svg>
          </div>
          <div className="w-8 h-3 bg-black rounded-sm" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between">
        {/* Waveform */}
        <div className="w-full aspect-square flex items-center justify-center">
          <motion.div
            className="relative w-64 h-64"
            animate={{
              scale: isRecording ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-golf-green/20 rounded-full blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-32 bg-golf-green rounded-full mx-1" />
              <div className="w-16 h-40 bg-golf-green rounded-full mx-1" />
              <div className="w-16 h-32 bg-golf-green rounded-full mx-1" />
            </div>
          </motion.div>
        </div>

        {/* Transcription */}
        {transcription && (
          <div className="w-full mb-20">
            <p className="text-gray-600 text-lg leading-relaxed">
              {transcription}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center gap-12 px-4">
          <button
            onClick={() => setIsRecording(false)}
            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center"
          >
            {isRecording ? (
              <Pause className="w-8 h-8 text-gray-900" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-golf-green" />
            )}
          </button>

          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;