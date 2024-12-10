import { Toaster } from "@/components/ui/toaster";
import VoiceRecorder from "./VoiceRecorder";

const VoiceRecorderContainer = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#0a1f0a] text-white px-4">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent mb-8">
        What Can I Do for You Today?
      </h1>
      
      <VoiceRecorder />
    </div>
  );
};

export default VoiceRecorderContainer;