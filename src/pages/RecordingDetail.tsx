import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisTab from "@/components/recording-detail/AnalysisTab";
import TranscriptionTab from "@/components/recording-detail/TranscriptionTab";
import RecordingHeader from "@/components/recording-detail/RecordingHeader";
import { useSession } from "@supabase/auth-helpers-react";

interface AnalysisSection {
  type: string;
  content: string | string[];
}

interface Analysis {
  sections: AnalysisSection[];
}

const RecordingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const session = useSession();
  const queryClient = useQueryClient();

  // Redirect if not authenticated
  if (!session) {
    navigate('/login');
    return null;
  }

  const { data: recording, isLoading } = useQuery({
    queryKey: ['recording', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      let parsedAnalysis: Analysis | null = null;
      if (data.analysis) {
        try {
          parsedAnalysis = JSON.parse(data.analysis);
        } catch (e) {
          console.error('Error parsing analysis:', e);
        }
      }

      return {
        ...data,
        analysis: parsedAnalysis
      };
    },
    enabled: !!session && !!id,
  });

  const togglePublicMutation = useMutation({
    mutationFn: async (isPublic: boolean) => {
      const { error } = await supabase
        .from('recordings')
        .update({ is_public: isPublic })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recording', id] });
      toast({
        title: recording?.is_public ? "Recording made private" : "Recording made public",
        description: recording?.is_public 
          ? "This recording is no longer shareable"
          : "You can now share this recording with others",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update recording visibility",
      });
    },
  });

  const handleTogglePublic = () => {
    if (recording) {
      togglePublicMutation.mutate(!recording.is_public);
    }
  };

  const handleCopyShareLink = () => {
    if (recording?.is_public) {
      const shareUrl = `${window.location.origin}/shared/${id}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share this link with others to view this recording",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('recordings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Recording deleted successfully",
      });
      navigate('/notes');
    } catch (error) {
      console.error("Error deleting recording:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete recording",
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

  if (!recording) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <p className="text-lg text-muted-foreground">Recording not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate('/notes')}
          className="mt-4"
        >
          Go back to notes
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <RecordingHeader 
          recording={recording} 
          onDelete={handleDelete}
          onTogglePublic={handleTogglePublic}
          onShare={handleCopyShareLink}
        />

        <div className={cn(
          "rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden mt-6",
          "transition-all duration-300",
          isDark ? "bg-black/40 shadow-[0_0_15px_rgba(74,222,128,0.1)]" : "bg-white/80"
        )}>
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="transcription">Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="mt-0">
              <AnalysisTab analysis={recording.analysis} />
            </TabsContent>
            <TabsContent value="transcription" className="mt-0">
              <TranscriptionTab transcription={recording.transcription} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RecordingDetail;