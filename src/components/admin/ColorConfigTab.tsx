import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import ColorPicker from "./ColorPicker";
import { ColorConfig, ColorConfigResponse, transformColorConfig } from "./types";
import ThemeHeader from "./color-config/ThemeHeader";
import ThemeNameInput from "./color-config/ThemeNameInput";

const ColorConfigTab = () => {
  const [configs, setConfigs] = useState<ColorConfig[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchColorConfigs();
  }, []);

  const fetchColorConfigs = async () => {
    try {
      const { data, error } = await supabase
        .from('color_config')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedConfigs = (data || []).map(transformColorConfig);
      setConfigs(transformedConfigs);
      if (transformedConfigs.length > 0) {
        setSelectedConfig(transformedConfigs[0].id);
      }
    } catch (error) {
      console.error('Error fetching color configs:', error);
      toast({
        title: "Error",
        description: "Failed to load color configurations",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (configId: string, colors: Record<string, string>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('color_config')
        .update({ colors })
        .eq('id', configId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Color configuration saved successfully",
      });
      
      fetchColorConfigs();
    } catch (error) {
      console.error('Error saving color config:', error);
      toast({
        title: "Error",
        description: "Failed to save color configuration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const { data, error } = await supabase
        .from('color_config')
        .insert([{
          name: 'New Theme',
          colors: configs[0].colors,
          is_active: false
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "New color configuration created",
      });
      
      fetchColorConfigs();
      if (data) {
        setSelectedConfig(data.id);
      }
    } catch (error) {
      console.error('Error creating color config:', error);
      toast({
        title: "Error",
        description: "Failed to create new configuration",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (configId: string) => {
    try {
      const { error } = await supabase
        .from('color_config')
        .delete()
        .eq('id', configId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Color configuration deleted",
      });
      
      fetchColorConfigs();
    } catch (error) {
      console.error('Error deleting color config:', error);
      toast({
        title: "Error",
        description: "Failed to delete configuration",
        variant: "destructive",
      });
    }
  };

  const handleActivate = async (configId: string) => {
    setIsLoading(true);
    try {
      await supabase
        .from('color_config')
        .update({ is_active: false })
        .neq('id', 'placeholder');

      const { error } = await supabase
        .from('color_config')
        .update({ is_active: true })
        .eq('id', configId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Theme activated successfully",
      });
      
      fetchColorConfigs();
    } catch (error) {
      console.error('Error activating color config:', error);
      toast({
        title: "Error",
        description: "Failed to activate theme",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = async (configId: string, name: string) => {
    try {
      const { error } = await supabase
        .from('color_config')
        .update({ name })
        .eq('id', configId);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to update theme name",
          variant: "destructive",
        });
      } else {
        fetchColorConfigs();
      }
    } catch (error) {
      console.error('Error updating theme name:', error);
      toast({
        title: "Error",
        description: "Failed to update theme name",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <ThemeHeader onCreateTheme={handleCreate} />

      <Tabs value={selectedConfig || ''} onValueChange={setSelectedConfig}>
        <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent">
          {configs.map((config) => (
            <TabsTrigger
              key={config.id}
              value={config.id}
              className="relative data-[state=active]:border-b-2"
            >
              {config.name}
              {config.is_active && (
                <span className="ml-2 h-2 w-2 rounded-full bg-green-500" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {configs.map((config) => (
          <TabsContent key={config.id} value={config.id} className="space-y-6">
            <ThemeNameInput
              config={config}
              isLoading={isLoading}
              onNameChange={(name) => handleNameChange(config.id, name)}
              onActivate={() => handleActivate(config.id)}
              onDelete={() => handleDelete(config.id)}
              canDelete={configs.length > 1}
            />

            <ColorPicker
              colors={config.colors}
              onChange={(colors) => handleSave(config.id, colors)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ColorConfigTab;