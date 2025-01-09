import { Plus } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewPlaceholderCard = () => {
  const session = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePepTalk = async () => {
    if (!session?.user?.id) return;

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-pep-talk', {
        body: { user_id: session.user.id }
      });

      if (error) throw error;

      toast({
        title: "Pep Talk Generated",
        description: "Your pep talk has been generated successfully!",
      });

      navigate(`/pep_talk/${data.id}`);
    } catch (error) {
      console.error('Error generating pep talk:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate pep talk. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleGeneratePepTalk}
      disabled={isGenerating}
      className="w-full py-6 px-6 bg-gradient-to-br from-blue-50/80 to-cyan-100/80
        backdrop-blur-sm hover:from-blue-100 hover:to-cyan-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-4 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <Plus className="w-5 h-5 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-base leading-none mb-2">Pep Talk</h3>
        <p className="text-sm text-muted-foreground/80 leading-tight">
          {isGenerating 
            ? "Generating your pep talk..."
            : "See everything that's clicking in your game before your next round"
          }
        </p>
      </div>
    </button>
  );
};

export default NewPlaceholderCard;