import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PepTalkContent {
  feeling_good: Array<{
    aspect: string;
    why: string;
    proof: string;
  }>;
  key_reminders: Array<{
    thought: string;
    why_it_works: string;
  }>;
  recent_wins: Array<{
    moment: string;
    take_forward: string;
  }>;
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
      navigate('/playbook');
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
          onClick={() => navigate('/playbook')}
          className="mt-4"
        >
          Go back to playbook
        </Button>
      </div>
    );
  }

  const parsedContent = JSON.parse(pepTalk.content) as PepTalkContent;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => navigate('/playbook')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Your Pep Talk
              </h1>
              <p className="text-sm text-muted-foreground">
                {format(new Date(pepTalk.created_at), "MMMM d, yyyy")} • {format(new Date(pepTalk.created_at), "h:mm a")} • Based on {pepTalk.recording_ids.length} recording{pepTalk.recording_ids.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="w-full">
          <div className="space-y-4">
            {/* Feeling Good Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">What's Clicking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedContent.feeling_good.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium text-foreground">{item.aspect}</h3>
                      <p className="text-sm text-muted-foreground">{item.why}</p>
                      <p className="text-sm italic text-muted-foreground">Example: {item.proof}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Reminders Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Key Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedContent.key_reminders.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium text-foreground">{item.thought}</h3>
                      <p className="text-sm text-muted-foreground">{item.why_it_works}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Wins Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Recent Wins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedContent.recent_wins.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium text-foreground">{item.moment}</h3>
                      <p className="text-sm text-muted-foreground">{item.take_forward}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PepTalkDetail;