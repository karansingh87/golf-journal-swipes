import { supabase } from "../integrations/supabase/client";

export const useGolfAnalysis = () => {
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

  return { analyzeTranscription };
};