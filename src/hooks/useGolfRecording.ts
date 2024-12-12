import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { transcribeAudio } from "../utils/transcription";

export const useGolfRecording = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isProcessingText, setIsProcessingText] = useState(false);
  const [transcription, setTranscription] = useState("");
  const session = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();

  const analyzeTranscription = async (transcriptionText: string) => {
    try {
      console.log('Analyzing transcription:', { length: transcriptionText.length });
      const { data, error } = await supabase.functions.invoke('analyze-golf', {
        body: { transcription: transcriptionText },
      });

      if (error) {
        console.error('Error analyzing transcription:', error);
        throw error;
      }
      
      console.log('Analysis response:', {
        hasAnalysis: !!data.analysis,
        hasInsights: !!data.insights,
        analysisLength: data.analysis?.length,
        insightsLength: data.insights?.length
      });
      
      return data;
    } catch (error) {
      console.error("Error analyzing transcription:", error);
      throw error;
    }
  };

  const saveRecording = async (
    audioUrl: string | null, 
    transcriptionText: string,
    sessionType: 'course' | 'practice'
  ) => {
    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }

    try {
      console.log('Starting analysis for recording...');
      const { analysis, insights } = await analyzeTranscription(transcriptionText);
      console.log('Analysis completed:', { 
        hasAnalysis: !!analysis,
        hasInsights: !!insights,
        analysisLength: analysis?.length,
        insightsLength: insights?.length
      });
      
      const { data, error: insertError } = await supabase
        .from('recordings')
        .insert({
          user_id: session.user.id,
          audio_url: audioUrl,
          transcription: transcriptionText,
          duration: audioUrl ? 0 : 0,
          analysis,
          insights,
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
        hasAnalysis: !!data.analysis,
        hasInsights: !!data.insights
      });
      
      toast({
        title: "Success!",
        description: "Your golf note has been saved and analyzed.",
      });

      navigate(`/history?recordingId=${data.id}`);
    } catch (error) {
      console.error("Error saving recording:", error);
      throw error;
    }
  };

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