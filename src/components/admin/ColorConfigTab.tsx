import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import ColorPicker from "./ColorPicker";
import { Plus, Save, Trash2 } from "lucide-react";

interface ColorConfig {
  id: string;
  name: string;
  colors: Record<string, string>;
  is_active: boolean;
}

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

      setConfigs(data || []);
      if (data && data.length > 0) {
        setSelectedConfig(data[0].id);
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
      // First, deactivate all configs
      await supabase
        .from('color_config')
        .update({ is_active: false })
        .neq('id', 'placeholder');

      // Then activate the selected config
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

  const selectedTheme = configs.find(config => config.id === selectedConfig);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Color Themes</h2>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Theme
        </Button>
      </div>

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
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="themeName">Theme Name</Label>
                <Input
                  id="themeName"
                  value={config.name}
                  onChange={async (e) => {
                    const { error } = await supabase
                      .from('color_config')
                      .update({ name: e.target.value })
                      .eq('id', config.id);
                    
                    if (error) {
                      toast({
                        title: "Error",
                        description: "Failed to update theme name",
                        variant: "destructive",
                      });
                    } else {
                      fetchColorConfigs();
                    }
                  }}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleActivate(config.id)}
                  disabled={config.is_active || isLoading}
                >
                  Activate Theme
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(config.id)}
                  disabled={configs.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

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