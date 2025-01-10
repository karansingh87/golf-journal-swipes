import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const usePromptConfig = () => {
  const [analysisPrompt, setAnalysisPrompt] = useState("");
  const [trendsPrompt, setTrendsPrompt] = useState("");
  const [coachingPrompt, setCoachingPrompt] = useState("");
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
        .select('prompt, trends_prompt, coaching_prompt, model_provider, model_name')
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
          modelProvider: data.model_provider,
          modelName: data.model_name,
        });
        setAnalysisPrompt(data.prompt);
        setTrendsPrompt(data.trends_prompt || '');
        setCoachingPrompt(data.coaching_prompt || '');
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

  const handleSave = async (type: 'analysis' | 'trends' | 'model' | 'coaching') => {
    console.log(`Saving ${type}...`);
    setIsLoading(true);
    try {
      // First, get the current config
      const { data: configData, error: configError } = await supabase
        .from('prompt_config')
        .select('*')
        .single();

      if (configError) {
        console.error('Error fetching config:', configError);
        throw configError;
      }

      // Prepare update data and old value for history
      let updateData = {};
      let oldValue = '';
      let promptType = '';

      switch (type) {
        case 'analysis':
          updateData = { prompt: analysisPrompt };
          oldValue = configData.prompt;
          promptType = 'analysis';
          break;
        case 'trends':
          updateData = { trends_prompt: trendsPrompt };
          oldValue = configData.trends_prompt;
          promptType = 'trends';
          break;
        case 'coaching':
          updateData = { coaching_prompt: coachingPrompt };
          oldValue = configData.coaching_prompt;
          promptType = 'coaching';
          break;
        case 'model':
          updateData = { model_provider: modelProvider, model_name: modelName };
          oldValue = JSON.stringify({ provider: configData.model_provider, name: configData.model_name });
          promptType = 'model';
          break;
      }

      // Insert the old value into prompt_history
      const { error: historyError } = await supabase
        .from('prompt_history')
        .insert({
          prompt_config_id: configData.id,
          prompt_type: promptType,
          old_value: oldValue,
        });

      if (historyError) {
        console.error('Error creating history record:', historyError);
        throw historyError;
      }

      // Update the prompt config
      const { error: updateError } = await supabase
        .from('prompt_config')
        .update(updateData)
        .eq('id', configData.id);

      if (updateError) {
        console.error(`Error updating ${type}:`, updateError);
        throw updateError;
      }

      // Refresh prompt history
      const { data: newHistory, error: refreshError } = await supabase
        .from('prompt_history')
        .select('*')
        .order('changed_at', { ascending: false });

      if (!refreshError && newHistory) {
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
    modelProvider,
    modelName,
    promptHistory,
    isLoading,
    setAnalysisPrompt,
    setTrendsPrompt,
    setCoachingPrompt,
    setModelProvider,
    setModelName,
    handleSave,
  };
};