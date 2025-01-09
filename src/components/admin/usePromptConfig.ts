import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PromptType, PromptConfiguration } from "@/types/prompt";

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
      console.log('Fetching prompt configurations...');
      const { data, error } = await supabase
        .from('prompt_configurations')
        .select('*')
        .eq('is_latest', true);

      if (error) {
        console.error('Error fetching prompts:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load the prompt configurations.",
        });
        return;
      }

      if (data) {
        const latestPrompts = data.reduce((acc: Record<string, PromptConfiguration>, config) => {
          acc[config.type] = config;
          return acc;
        }, {});

        console.log('Prompts fetched successfully:', latestPrompts);

        setAnalysisPrompt(latestPrompts.analysis?.content || '');
        setTrendsPrompt(latestPrompts.trends?.content || '');
        setCoachingPrompt(latestPrompts.coaching?.content || '');
        setPepTalkPrompt(latestPrompts.pep_talk?.content || '');
        
        // Use the model settings from any of the configurations since they should be the same
        const anyConfig = Object.values(latestPrompts)[0];
        if (anyConfig) {
          setModelProvider(anyConfig.model_provider);
          setModelName(anyConfig.model_name);
        }
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

  const handleSave = async (type: PromptType) => {
    console.log(`Saving ${type} prompt...`);
    setIsLoading(true);
    try {
      let content = '';
      switch (type) {
        case 'analysis':
          content = analysisPrompt;
          break;
        case 'trends':
          content = trendsPrompt;
          break;
        case 'coaching':
          content = coachingPrompt;
          break;
        case 'pep_talk':
          content = pepTalkPrompt;
          break;
      }

      // First, set all existing prompts of this type to not latest
      const { error: updateError } = await supabase
        .from('prompt_configurations')
        .update({ is_latest: false })
        .eq('type', type);

      if (updateError) {
        console.error(`Error updating existing ${type} prompts:`, updateError);
        throw updateError;
      }

      // Then insert the new prompt
      const { error: insertError } = await supabase
        .from('prompt_configurations')
        .insert({
          type,
          content,
          model_provider: modelProvider,
          model_name: modelName,
          is_latest: true
        });

      if (insertError) {
        console.error(`Error inserting new ${type} prompt:`, insertError);
        throw insertError;
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