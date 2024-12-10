import { useState, useEffect } from "react";
import { X, Pause } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import AudioWaveform from "./AudioWaveform";
import RecordingTimer from "./RecordingTimer";
import StatusBar from "./StatusBar";
import { transcribeAudio } from "../utils/transcription";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<Array<{
    audio: string;
    timestamp: string;
    duration: number;
    transcription?: string;
  }>>([]);
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");
      
      setMediaStream(stream);
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = async (e) => {
        if (e.data.size > 0) {
          const audioUrl = URL.createObjectURL(e.data);
          const timestamp = format(new Date(), "MMM d, yyyy HH:mm:ss");
          
          try {
            setIsTranscribing(true);
            const text = await transcribeAudio(e.data);
            setTranscription(text);
            
            setRecordings(prev => [...prev, {
              audio: audioUrl,
              timestamp,
              duration: recordingTime,
              transcription: text
            }]);
            
            toast({
              title: "Recording saved!",
              description: "Your golf note has been recorded and transcribed.",
            });
          } catch (error) {
            console.error("Transcription error:", error);
            toast({
              variant: "destructive",
              title: "Transcription failed",
              description: "Could not transcribe the audio. Please try again.",
            });
          } finally {
            setIsTranscribing(false);
          }
        }
      };

      recorder.onerror = (event) => {
        console.error("Recorder error:", event);
        setError("An error occurred while recording");
        toast({
          variant: "destructive",
          title: "Recording failed",
          description: "Please try again",
        });
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      console.log("Recording started");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError("Could not access microphone");
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: "Please allow microphone access to record",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      console.log("Stopping recording...");
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setMediaStream(null);
      console.log("Recording stopped");
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder]);

  return (
    <div className="min-h-screen bg-white px-4 pt-12 pb-6 flex flex-col">
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-between">
        <RecordingTimer recordingTime={recordingTime} />
        
        <AudioWaveform isRecording={isRecording} mediaStream={mediaStream} />

        {error && (
          <div className="w-full mb-4">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}

        {isTranscribing && (
          <div className="w-full mb-4">
            <p className="text-gray-600 text-center">Transcribing your recording...</p>
          </div>
        )}

        {transcription && (
          <div className="w-full mb-20">
            <p className="text-gray-600 text-lg leading-relaxed">
              {transcription}
            </p>
          </div>
        )}

        <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center gap-12 px-4">
          <button
            onClick={() => setIsRecording(false)}
            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200 active:scale-95"
            disabled={isTranscribing}
          >
            {isRecording ? (
              <Pause className="w-8 h-8 text-gray-900" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-500" />
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