import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import PepTalkDisplay from "@/components/playbook/PepTalkDisplay";
import { PepTalkContent } from "@/integrations/supabase/types";

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
        .maybeSingle();
      
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

  // Parse the content as PepTalkContent type
  const parsedContent = pepTalk.content as PepTalkContent;

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
              <h1 className="text-2xl font-semibold text-golf-gray-text-primary mb-2">
                Your Pep Talk
              </h1>
              <p className="text-sm text-golf-gray-text-secondary">
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

        <div className="rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden bg-white/80">
          <PepTalkDisplay content={parsedContent} />
        </div>
      </div>
    </div>
  );
};

export default PepTalkDetail;