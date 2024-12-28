import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PromptEditor from "./admin/PromptEditor";
import PromptHistoryTable from "./admin/PromptHistoryTable";

const AdminPromptPanel = () => {
  const [analysisPrompt, setAnalysisPrompt] = useState("");
  const [trendsPrompt, setTrendsPrompt] = useState(`You are an insightful golf coach with a talent for spotting meaningful patterns and expressing them in compelling ways. Review these golf session analyses and uncover those "aha moment" patterns that players themselves might miss. 

Look for these types of patterns:

1. Hidden Strengths
- Subtle excellence they haven't noticed
- Unexpected success correlations
- Unique game qualities

2. Mental Signatures
- Unnoticed performance triggers
- Distinctive recovery patterns
- Peak performance conditions

3. Game-Changing Moments
- Quiet breakthroughs
- Evolution points
- Transformation triggers

4. Strategic Instincts
- Natural decision strengths
- Unconscious good habits
- Smart adaptations

5. Growth Indicators
- Emerging patterns
- Building momentum
- Skill progressions

For each pattern, create:
1. A primary insight that captures immediate attention
2. Supporting details that provide depth and evidence

Example Format:
Primary: "Morning rounds aren't just better - they're a different game entirely."
Details: "3.2 strokes better before 9am. Particularly strong on approach shots. Temperature and wind conditions perfectly match your ball flight."

Return ONLY a JSON object with exactly 5 of the most compelling patterns found:

{
  "patterns": [
    {
      "type": "hidden_strength" | "mental_signature" | "game_changing" | "strategic_instinct" | "growth_indicator",
      "primary_insight": "The hook - immediate, compelling revelation",
      "supporting_details": {
        "evidence": "Specific proof points and examples",
        "context": "When and where this pattern shows up",
        "significance": "Why this matters for their game"
      },
      "confidence_score": number between 1-100,
      "timespan": "Period of observation"
    }
  ],
  "metadata": {
    "sessions_analyzed": number,
    "date_range": "start_date - end_date",
    "analysis_confidence": number between 1-100
  }
}

Key Requirements:
1. Primary insights should be immediately compelling
2. Supporting details should provide real substance
3. Every pattern should feel like a discovery
4. Keep technical details in the supporting section
5. Write in a way that makes players want to learn more

Remember: The primary insight should make them stop scrolling, while the supporting details reward their curiosity with meaningful depth.`);
  const [promptHistory, setPromptHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrompts = async () => {
      console.log('Fetching prompt configurations...');
      const { data, error } = await supabase
        .from('prompt_config')
        .select('prompt, trends_prompt')
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
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} prompt configuration has been updated.`,
      });
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update the ${type} prompt configuration.`,
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
          <TabsTrigger value="trends" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
            Trends Prompt
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
            Change History
          </TabsTrigger>
        </TabsList>
        
        <div className="overflow-x-auto">
          <TabsContent value="analysis">
            <PromptEditor
              value={analysisPrompt}
              onChange={setAnalysisPrompt}
              onSave={() => handleSave('analysis')}
              isLoading={isLoading}
              type="analysis"
            />
          </TabsContent>

          <TabsContent value="trends">
            <PromptEditor
              value={trendsPrompt}
              onChange={setTrendsPrompt}
              onSave={() => handleSave('trends')}
              isLoading={isLoading}
              type="trends"
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