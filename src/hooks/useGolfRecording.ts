import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { transcribeAudio } from "../utils/transcription";
import { useGolfStorage } from "./useGolfStorage";

export const useGolfRecording = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isProcessingText, setIsProcessingText] = useState(false);
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();
  const { saveRecording } = useGolfStorage();

  const handleAudioRecording = async (
    audioBlob: Blob, 
    recordingTime: number,
    sessionType: 'course' | 'practice'
  ) => {
    try {
      setIsTranscribing(true);
      const audioUrl = URL.createObjectURL(audioBlob);
      const text = await transcribeAudio(audioBlob);
      setTranscription(text);
      await saveRecording(audioUrl, text, sessionType);
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
  };

  const handleTextSubmit = async (
    text: string,
    sessionType: 'course' | 'practice'
  ) => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text before saving.",
      });
      return;
    }

    try {
      console.log('Processing text submission:', { length: text.length });
      setIsProcessingText(true);
      await saveRecording(null, text, sessionType);
    } catch (error) {
      console.error('Error processing text:', error);
      toast({
        variant: "destructive",
        title: "Error saving note",
        description: "Could not save your note. Please try again.",
      });
    } finally {
      setIsProcessingText(false);
    }
  };

  return {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  };
};