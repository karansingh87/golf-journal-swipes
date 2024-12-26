import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PromptEditor from "./admin/PromptEditor";
import PromptHistoryTable from "./admin/PromptHistoryTable";

const AdminPromptPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [insightsPrompt, setInsightsPrompt] = useState("");
  const [promptHistory, setPromptHistory] = useState([]);
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
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">Admin Panel - GPT Prompt Configuration</h2>
      
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="mb-4 w-full flex h-auto flex-wrap gap-2 bg-transparent border-b border-border/50">
          <TabsTrigger value="analysis" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
            Analysis Prompt
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
            Insights Prompt
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
            Change History
          </TabsTrigger>
        </TabsList>
        
        <div className="overflow-x-auto">
          <TabsContent value="analysis">
            <PromptEditor
              value={prompt}
              onChange={setPrompt}
              onSave={() => handleSave('analysis')}
              isLoading={isLoading}
              type="analysis"
            />
          </TabsContent>
          
          <TabsContent value="insights">
            <PromptEditor
              value={insightsPrompt}
              onChange={setInsightsPrompt}
              onSave={() => handleSave('insights')}
              isLoading={isLoading}
              type="insights"
            />
          </TabsContent>

          <TabsContent value="history">
            <PromptHistoryTable history={promptHistory} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminPromptPanel;