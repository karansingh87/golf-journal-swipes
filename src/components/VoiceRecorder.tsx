import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../integrations/supabase/client";
import { transcribeAudio } from "../utils/transcription";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
  const [manualText, setManualText] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const { toast } = useToast();
  const session = useSession();

  const saveRecording = async (audioUrl: string | null, transcriptionText: string) => {
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
          duration: audioUrl ? recordingTime : 0
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
    setManualText("");
    setShowTextInput(false);
  };

  const handleManualTextSubmit = async () => {
    if (!manualText.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text before saving.",
      });
      return;
    }

    try {
      await saveRecording(null, manualText);
      toast({
        title: "Note saved!",
        description: "Your golf note has been saved successfully.",
      });
      setManualText("");
      setShowTextInput(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving note",
        description: "Could not save your note. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-12 pb-6">
      <StatusBar />

      <div className="flex flex-col items-center justify-center">
        {!showTextInput ? (
          <>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
              <AudioWaveform isRecording={isRecording && !isPaused} mediaStream={mediaStream} />
              <RecordingTimer recordingTime={recordingTime} />
            </div>

            <TranscriptionDisplay 
              transcription={transcription}
              isTranscribing={isTranscribing}
            />

            <div className="w-full max-w-2xl mx-auto mb-8 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowTextInput(true)}
                className="text-golf-green hover:text-golf-green/90"
              >
                Or type your note instead
              </Button>
            </div>

            <RecordingControls
              isRecording={isRecording}
              isPaused={isPaused}
              onStart={startRecording}
              onPause={pauseRecording}
              onResume={resumeRecording}
              onStop={handleStopRecording}
              onCancel={handleCancel}
            />
          </>
        ) : (
          <div className="w-full max-w-2xl mx-auto">
            <Textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Type your golf note here..."
              className="min-h-[200px] mb-4"
            />
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowTextInput(false);
                  setManualText("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleManualTextSubmit}
                className="bg-golf-green hover:bg-golf-green/90 text-white"
              >
                Save Note
              </Button>
            </div>
          </div>
        )}
      </div>

      <RecordingHistory />
    </div>
  );
};

export default VoiceRecorder;