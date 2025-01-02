import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const usePromptConfig = () => {
  const [analysisPrompt, setAnalysisPrompt] = useState("");
  const [trendsPrompt, setTrendsPrompt] = useState("");
  const [promptHistory, setPromptHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrompts = async () => {
      console.log('Fetching prompt configuration...');
      const { data, error } = await supabase
        .from('prompt_config')
        .select('prompt, trends_prompt')
        .single();

      if (error) {
        console.error('Error fetching prompts:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load the prompt configuration.",
        });
        return;
      }

      if (data) {
        console.log('Prompts fetched successfully:', {
          analysisPromptLength: data.prompt?.length,
          trendsPromptLength: data.trends_prompt?.length,
        });
        setAnalysisPrompt(data.prompt);
        setTrendsPrompt(data.trends_prompt || '');
      }
    };

    const fetchPromptHistory = async () => {
      console.log('Fetching prompt history...');
      const { data, error } = await supabase
        .from('prompt_history')
        .select('*')
        .order('changed_at', { ascending: false });

      if (error) {
        console.error('Error fetching prompt history:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load the prompt history.",
        });
        return;
      }

      if (data) {
        console.log('Prompt history fetched successfully:', data.length, 'entries');
        setPromptHistory(data);
      }
    };

    fetchPrompts();
    fetchPromptHistory();
  }, []);

  const handleSave = async (type: 'analysis' | 'trends') => {
    console.log(`Saving ${type} prompt...`);
    setIsLoading(true);
    try {
      const { data: configData, error: configError } = await supabase
        .from('prompt_config')
        .select('id')
        .single();

      if (configError) {
        console.error('Error fetching config ID:', configError);
        throw configError;
      }

      const updateData = type === 'analysis' 
        ? { prompt: analysisPrompt }
        : { trends_prompt: trendsPrompt };

      const { error } = await supabase
        .from('prompt_config')
        .update(updateData)
        .eq('id', configData.id);

      if (error) {
        console.error(`Error updating ${type} prompt:`, error);
        throw error;
      }

      // Refresh prompt history after saving
      const { data: newHistory, error: historyError } = await supabase
        .from('prompt_history')
        .select('*')
        .order('changed_at', { ascending: false });

      if (!historyError && newHistory) {
        setPromptHistory(newHistory);
      }

      console.log(`${type} prompt updated successfully`);
      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} prompt configuration has been updated.`,
      });
    } catch (error) {
      console.error(`Error updating ${type} prompt:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update the ${type} prompt configuration.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analysisPrompt,
    trendsPrompt,
    promptHistory,
    isLoading,
    setAnalysisPrompt,
    setTrendsPrompt,
    handleSave,
  };
};