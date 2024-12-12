import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPromptPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [insightsPrompt, setInsightsPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrompts = async () => {
      console.log('Fetching prompt configurations...');
      const { data, error } = await supabase
        .from('prompt_config')
        .select('prompt, insights_prompt')
        .single();

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
        console.log('Prompts fetched successfully:', {
          analysisPromptLength: data.prompt?.length,
          insightsPromptLength: data.insights_prompt?.length
        });
        setPrompt(data.prompt);
        setInsightsPrompt(data.insights_prompt);
      }
    };

    fetchPrompts();
  }, []);

  const handleSave = async (type: 'analysis' | 'insights') => {
    console.log(`Saving ${type} prompt...`);
    setIsLoading(true);
    try {
      const updateData = type === 'analysis' 
        ? { prompt }
        : { insights_prompt: insightsPrompt };

      console.log('Update data:', updateData);

      const { data: configData, error: configError } = await supabase
        .from('prompt_config')
        .select('id')
        .single();

      if (configError) {
        console.error('Error fetching config ID:', configError);
        throw configError;
      }

      const { error } = await supabase
        .from('prompt_config')
        .update(updateData)
        .eq('id', configData.id);

      if (error) {
        console.error('Error updating prompt:', error);
        throw error;
      }

      console.log(`${type} prompt updated successfully`);
      toast({
        title: "Success",
        description: `${type === 'analysis' ? 'Analysis' : 'Insights'} prompt configuration has been updated.`,
      });
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update the ${type === 'analysis' ? 'analysis' : 'insights'} prompt configuration.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Admin Panel - GPT Prompt Configuration</h2>
      
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="analysis">Analysis Prompt</TabsTrigger>
          <TabsTrigger value="insights">Insights Prompt</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[300px] mb-4 font-mono text-sm"
            placeholder="Enter the GPT analysis prompt configuration..."
          />
          <Button 
            onClick={() => handleSave('analysis')}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Analysis Prompt"}
          </Button>
        </TabsContent>
        
        <TabsContent value="insights">
          <Textarea
            value={insightsPrompt}
            onChange={(e) => setInsightsPrompt(e.target.value)}
            className="min-h-[300px] mb-4 font-mono text-sm"
            placeholder="Enter the GPT insights prompt configuration..."
          />
          <Button 
            onClick={() => handleSave('insights')}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Insights Prompt"}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPromptPanel;