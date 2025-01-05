import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const LandingPageContent = () => {
  const { toast } = useToast();
  const [editedContent, setEditedContent] = useState<Record<string, any>>({});

  const { data: content, refetch } = useQuery({
    queryKey: ['landingPageContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('landing_page_content')
        .select('*');
      
      if (error) throw error;
      
      // Transform array into object with section as key
      return data.reduce((acc: Record<string, any>, item: any) => {
        acc[item.section] = item.content;
        return acc;
      }, {});
    }
  });

  const handleEdit = (section: string) => {
    setEditedContent({
      ...editedContent,
      [section]: JSON.stringify(content?.[section] || {}, null, 2)
    });
  };

  const handleSave = async (section: string) => {
    try {
      const parsedContent = JSON.parse(editedContent[section]);
      
      const { error } = await supabase
        .from('landing_page_content')
        .update({ content: parsedContent })
        .eq('section', section);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content. Please check your JSON format.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Landing Page Content</h2>
      
      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="benefits">Benefits Section</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Section</TabsTrigger>
          <TabsTrigger value="faq">FAQ Section</TabsTrigger>
        </TabsList>

        {["hero", "benefits", "pricing", "faq"].map((section) => (
          <TabsContent key={section} value={section} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium capitalize">{section} Section Content</h3>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleEdit(section)}
                >
                  Edit
                </Button>
                <Button 
                  onClick={() => handleSave(section)}
                  disabled={!editedContent[section]}
                >
                  Save Changes
                </Button>
              </div>
            </div>

            <Textarea
              value={editedContent[section] || JSON.stringify(content?.[section] || {}, null, 2)}
              onChange={(e) => setEditedContent({
                ...editedContent,
                [section]: e.target.value
              })}
              className="font-mono h-[400px]"
              readOnly={!editedContent[section]}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LandingPageContent;