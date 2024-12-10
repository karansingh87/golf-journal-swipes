import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../integrations/supabase/client";
import { transcribeAudio } from "../utils/transcription";
import AudioWaveform from "./AudioWaveform";
import RecordingTimer from "./RecordingTimer";
import StatusBar from "./StatusBar";
import RecordingControls from "./RecordingControls";
import TranscriptionDisplay from "./TranscriptionDisplay";
import RecordingHistory from "./RecordingHistory";
import { useRecorder } from "../hooks/useRecorder";

const VoiceRecorder = () => {
  const {
    isRecording,
    isPaused,
    mediaStream,
    audioChunks,
    recordingTime,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
  } = useRecorder();

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();
  const session = useSession();

  const saveRecording = async (audioUrl: string, transcriptionText: string) => {
    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('recordings')
        .insert({
          user_id: session.user.id,
          audio_url: audioUrl,
          transcription: transcriptionText,
          duration: recordingTime
        });

      if (insertError) {
        console.error("Error saving recording:", insertError);
        throw insertError;
      }
    } catch (error) {
      console.error("Error saving recording:", error);
      throw error;
    }
  };

  const handleStopRecording = async () => {
    stopRecording();
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      try {
        setIsTranscribing(true);
        const text = await transcribeAudio(audioBlob);
        setTranscription(prev => prev ? `${prev}\n${text}` : text);
        
        await saveRecording(audioUrl, text);
        
        toast({
          title: "Recording saved!",
          description: "Your golf note has been recorded and transcribed.",
        });
      } catch (error) {
        console.error("Error processing recording:", error);
        toast({
          variant: "destructive",
          title: "Error saving recording",
          description: "Could not save your recording. Please try again.",
        });
      } finally {
        setIsTranscribing(false);
      }
    }
  };

  const handleCancel = () => {
    stopRecording();
    resetRecording();
    setTranscription("");
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-12 pb-6">
      <StatusBar />

      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          <AudioWaveform isRecording={isRecording && !isPaused} mediaStream={mediaStream} />
          <RecordingTimer recordingTime={recordingTime} />
        </div>

        <TranscriptionDisplay 
          transcription={transcription}
          isTranscribing={isTranscribing}
        />

        <RecordingControls
          isRecording={isRecording}
          isPaused={isPaused}
          onStart={startRecording}
          onPause={pauseRecording}
          onResume={resumeRecording}
          onStop={handleStopRecording}
          onCancel={handleCancel}
        />
      </div>

      <RecordingHistory />
    </div>
  );
};

export default VoiceRecorder;