import { supabase } from "@/integrations/supabase/client";

export const useGolfAnalysis = () => {
  const analyzeTranscription = async (transcription: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-golf', {
        body: { transcription }
      });

      if (error) {
        console.error('Error analyzing transcription:', error);
        throw error;
      }

      return {
        analysis: data.analysis
      };
    } catch (error) {
      console.error('Error in analyzeTranscription:', error);
      throw error;
    }
  };

  return { analyzeTranscription };
};