import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Trash2 } from "lucide-react";
import { PepTalkContent } from "@/integrations/supabase/types/pep-talk/content";
import PepTalkDisplay from "@/components/playbook/PepTalkDisplay";

const PepTalkDetail = () => {
  const { id } = useParams();
  const session = useSession();
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
    enabled: !!session?.user?.id && !!id,
  });

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('pep_talk')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Pep Talk deleted",
        description: "Your pep talk has been successfully deleted.",
      });

      navigate('/playbook');
    } catch (error) {
      console.error('Error deleting pep talk:', error);
      toast({
        title: "Error",
        description: "Failed to delete pep talk. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-14">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!pepTalk) {
    return (
      <div className="min-h-screen bg-background pt-14">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-muted-foreground">Pep talk not found.</p>
        </div>
      </div>
    );
  }

  // Cast the content to PepTalkContent type since we know its structure
  const content = pepTalk.content as PepTalkContent;

  return (
    <div className="min-h-screen bg-background pt-14">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => navigate('/playbook')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Playbook
          </Button>

          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>

        <PepTalkDisplay content={content} />
      </div>
    </div>
  );
};

export default PepTalkDetail;