import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../integrations/supabase/client";
import { transcribeAudio } from "../utils/transcription";

export const useGolfRecording = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isProcessingText, setIsProcessingText] = useState(false);
  const [transcription, setTranscription] = useState("");
  const session = useSession();
  const { toast } = useToast();

  const analyzeTranscription = async (transcriptionText: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-golf', {
        body: { transcription: transcriptionText },
      });

      if (error) throw error;
      return data.analysis;
    } catch (error) {
      console.error("Error analyzing transcription:", error);
      throw error;
    }
  };

  const saveRecording = async (audioUrl: string | null, transcriptionText: string) => {
    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }

    try {
      const analysis = await analyzeTranscription(transcriptionText);
      
      const { error: insertError } = await supabase
        .from('recordings')
        .insert({
          user_id: session.user.id,
          audio_url: audioUrl,
          transcription: transcriptionText,
          duration: audioUrl ? 0 : 0,
          analysis
        });

      if (insertError) throw insertError;
      
      toast({
        title: "Success!",
        description: "Your golf note has been saved and analyzed.",
      });
    } catch (error) {
      console.error("Error saving recording:", error);
      throw error;
    }
  };

  const handleAudioRecording = async (audioBlob: Blob, recordingTime: number) => {
    try {
      setIsTranscribing(true);
      const audioUrl = URL.createObjectURL(audioBlob);
      const text = await transcribeAudio(audioBlob);
      setTranscription(text);
      await saveRecording(audioUrl, text);
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

  const handleTextSubmit = async (text: string) => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text before saving.",
      });
      return;
    }

    try {
      setIsProcessingText(true);
      await saveRecording(null, text);
    } catch (error) {
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