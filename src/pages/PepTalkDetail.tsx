import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import PepTalkHeader from "@/components/pep-talk/PepTalkHeader";
import PepTalkSection from "@/components/pep-talk/PepTalkSection";
import FeelingGoodSection from "@/components/pep-talk/FeelingGoodSection";
import KeyRemindersSection from "@/components/pep-talk/KeyRemindersSection";
import RecentWinsSection from "@/components/pep-talk/RecentWinsSection";

interface PepTalkSectionData {
  type: string;
  content: string[];
}

const PepTalkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: pepTalk, isLoading } = useQuery({
    queryKey: ['pep_talk', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pep_talk')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('pep_talk')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pep talk deleted successfully",
      });
      navigate('/pep_talks');
    } catch (error) {
      console.error("Error deleting pep talk:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete pep talk",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pepTalk) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <p className="text-lg text-muted-foreground">Pep talk not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate('/pep_talks')}
          className="mt-4"
        >
          Go back to pep talks
        </Button>
      </div>
    );
  }

  const parsedContent = JSON.parse(pepTalk.content) as PepTalkSectionData[];
  const sections = Object.fromEntries(
    parsedContent.map(section => [section.type, section])
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <PepTalkHeader
          createdAt={pepTalk.created_at}
          recordingCount={pepTalk.recording_ids.length}
          onDelete={handleDelete}
        />

        <ScrollArea className="w-full">
          <div className="space-y-4">
            <PepTalkSection title="What's Clicking">
              <FeelingGoodSection content={sections.game_strengths?.content || []} />
            </PepTalkSection>

            <PepTalkSection title="Key Reminders">
              <KeyRemindersSection content={sections.key_thoughts?.content || []} />
            </PepTalkSection>

            <PepTalkSection title="Go-To Shots">
              <RecentWinsSection 
                type="go_to_shots"
                content={sections.go_to_shots?.content || []} 
              />
            </PepTalkSection>

            <PepTalkSection title="Scoring Zones">
              <RecentWinsSection 
                type="scoring_zones"
                content={sections.scoring_zones?.content || []} 
              />
            </PepTalkSection>

            <PepTalkSection title="Confidence Moments">
              <RecentWinsSection 
                type="confidence_moments"
                content={sections.confidence_moments?.content || []} 
              />
            </PepTalkSection>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PepTalkDetail;