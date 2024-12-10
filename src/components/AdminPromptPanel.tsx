import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminPromptPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrompt = async () => {
      const { data, error } = await supabase
        .from('prompt_config')
        .select('prompt')
        .single();

      if (error) {
        console.error('Error fetching prompt:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load the prompt configuration.",
        });
        return;
      }

      if (data) {
        setPrompt(data.prompt);
      }
    };

    fetchPrompt();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('prompt_config')
        .update({ prompt })
        .eq('id', (await supabase.from('prompt_config').select('id').single()).data?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt configuration has been updated.",
      });
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update the prompt configuration.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Admin Panel - GPT Prompt Configuration</h2>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[300px] mb-4 font-mono text-sm"
        placeholder="Enter the GPT prompt configuration..."
      />
      <Button 
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default AdminPromptPanel;