import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const usePromptConfig = () => {
  const [analysisPrompt, setAnalysisPrompt] = useState("");
  const [trendsPrompt, setTrendsPrompt] = useState("");
  const [coachingPrompt, setCoachingPrompt] = useState("");
  const [pepTalkPrompt, setPepTalkPrompt] = useState("");
  const [modelProvider, setModelProvider] = useState("anthropic");
  const [modelName, setModelName] = useState("claude-3-5-sonnet-20241022");
  const [promptHistory, setPromptHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrompts = async () => {
      console.log('Fetching prompt configuration...');
      const { data, error } = await supabase
        .from('prompt_config')
        .select('prompt, trends_prompt, coaching_prompt, pep_talk_prompt, model_provider, model_name')
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
        console.log('Prompts and model config fetched successfully:', {
          analysisPromptLength: data.prompt?.length,
          trendsPromptLength: data.trends_prompt?.length,
          coachingPromptLength: data.coaching_prompt?.length,
          pepTalkPromptLength: data.pep_talk_prompt?.length,
          modelProvider: data.model_provider,
          modelName: data.model_name,
        });
        setAnalysisPrompt(data.prompt);
        setTrendsPrompt(data.trends_prompt || '');
        setCoachingPrompt(data.coaching_prompt || '');
        setPepTalkPrompt(data.pep_talk_prompt || '');
        setModelProvider(data.model_provider);
        setModelName(data.model_name);
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

  const handleSave = async (type: 'analysis' | 'trends' | 'model' | 'coaching' | 'pep_talk') => {
    console.log(`Saving ${type}...`);
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

      let updateData = {};
      switch (type) {
        case 'analysis':
          updateData = { prompt: analysisPrompt };
          break;
        case 'trends':
          updateData = { trends_prompt: trendsPrompt };
          break;
        case 'coaching':
          updateData = { coaching_prompt: coachingPrompt };
          break;
        case 'pep_talk':
          updateData = { pep_talk_prompt: pepTalkPrompt };
          break;
        case 'model':
          updateData = { model_provider: modelProvider, model_name: modelName };
          break;
      }

      const { error } = await supabase
        .from('prompt_config')
        .update(updateData)
        .eq('id', configData.id);

      if (error) {
        console.error(`Error updating ${type}:`, error);
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

      console.log(`${type} updated successfully`);
      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} configuration has been updated.`,
      });
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update the ${type} configuration.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analysisPrompt,
    trendsPrompt,
    coachingPrompt,
    pepTalkPrompt,
    modelProvider,
    modelName,
    promptHistory,
    isLoading,
    setAnalysisPrompt,
    setTrendsPrompt,
    setCoachingPrompt,
    setPepTalkPrompt,
    setModelProvider,
    setModelName,
    handleSave,
  };
};