import { ArrowLeft, Trash2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface RecordingHeaderProps {
  recording: {
    id: string;
    created_at: string;
    is_public: boolean;
  };
  onDelete: () => Promise<void>;
}

const RecordingHeader = ({ recording, onDelete }: RecordingHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      // First make the recording public
      const { error: updateError } = await supabase
        .from('recordings')
        .update({ is_public: true })
        .eq('id', recording.id);

      if (updateError) throw updateError;

      // Generate the shareable URL
      const shareUrl = `${window.location.origin}/recording/${recording.id}`;

      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share({
          title: 'Golf Session Recording',
          text: 'Check out my golf session recording!',
          url: shareUrl
        });
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Share link has been copied to your clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to share recording",
      });
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/notes')}
        className="hover:bg-accent"
      >
        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
      </Button>
      
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="text-base font-medium">
              {format(new Date(recording.created_at), "MMM d, yyyy")}
            </div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(recording.created_at), "h:mm a")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="hover:bg-accent"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordingHeader;