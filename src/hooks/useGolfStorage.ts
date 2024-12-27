import { supabase } from "../integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useGolfAnalysis } from "./useGolfAnalysis";

export const useGolfStorage = () => {
  const session = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { analyzeTranscription } = useGolfAnalysis();

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
      throw error;
    }
  };

  return { saveRecording };
};