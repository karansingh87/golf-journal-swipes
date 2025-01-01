import { useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useGolfAnalysis } from "./useGolfAnalysis";

export const useGolfRecording = () => {
  const session = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { analyzeTranscription } = useGolfAnalysis();

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isProcessingText, setIsProcessingText] = useState(false);
  const [transcription, setTranscription] = useState("");

  const saveRecording = async (
    audioUrl: string | null, 
    transcriptionText: string,
    sessionType: 'course' | 'practice'
  ) => {
    if (!session?.user?.id) {
      console.error("No user session found");
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Please sign in to save recordings.",
      });
      return;
    }

    try {
      console.log('Starting analysis for recording...', {
        textLength: transcriptionText.length,
        sessionType
      });
      
      const { analysis } = await analyzeTranscription(transcriptionText);
      
      console.log('Analysis completed:', { 
        hasAnalysis: !!analysis,
        analysisLength: analysis?.length
      });
      
      const { data, error: insertError } = await supabase
        .from('recordings')
        .insert({
          user_id: session.user.id,
          audio_url: audioUrl,
          transcription: transcriptionText,
          duration: audioUrl ? 0 : 0,
          analysis,
          session_type: sessionType
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error saving recording:', insertError);
        throw insertError;
      }
      
      console.log('Recording saved successfully:', {
        id: data.id,
        hasAnalysis: !!data.analysis
      });
      
      toast({
        title: "Success!",
        description: "Your golf note has been saved and analyzed.",
      });

      navigate(`/recording/${data.id}`);
    } catch (error) {
      console.error("Error saving recording:", error);
      toast({
        variant: "destructive",
        title: "Error saving recording",
        description: "Could not save your recording. Please try again.",
      });
      throw error;
    }
  };

  const handleAudioRecording = async (
    audioBlob: Blob, 
    recordingTime: number,
    sessionType: 'course' | 'practice'
  ) => {
    try {
      console.log('Processing audio recording:', { 
        blobSize: audioBlob.size,
        recordingTime,
        sessionType
      });
      
      setIsTranscribing(true);
      const audioUrl = URL.createObjectURL(audioBlob);
      
      console.log('Audio URL created:', { audioUrl });
      
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      formData.append('model', 'whisper-1');
      
      console.log('Sending request to transcribe function...');
      const { data: transcribeData, error: transcribeError } = await supabase.functions.invoke('transcribe', {
        body: formData,
      });

      if (transcribeError) {
        console.error('Transcription error:', transcribeError);
        throw transcribeError;
      }

      const text = transcribeData.text;
      console.log('Transcription completed:', { 
        hasText: !!text,
        textLength: text?.length 
      });
      
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
      console.log('Processing text submission:', { 
        length: text.length,
        sessionType
      });
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