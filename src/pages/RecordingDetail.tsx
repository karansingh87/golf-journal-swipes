import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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

  // Fetch recording data
  const { data: recording, isLoading, error } = useQuery({
    queryKey: ['recording', id],
    queryFn: async () => {
      console.log('Fetching recording with ID:', id);
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching recording:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Recording not found');
      }
      
      // Parse the analysis JSON string if it exists
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
    enabled: !!id && !!session,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <p className="text-lg text-muted-foreground">
          {error instanceof Error ? error.message : 'Failed to load recording'}
        </p>
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

  // Handle not found state
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

  const headerProps = {
    id: recording.id,
    created_at: recording.created_at,
    is_public: recording.is_public,
    analysis: recording.analysis
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <RecordingHeader recording={headerProps} onDelete={handleDelete} />

        <div className={cn(
          "rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden",
          "transition-all duration-300",
          isDark ? "bg-black/40 shadow-[0_0_15px_rgba(74,222,128,0.1)]" : "bg-white/80"
        )}>
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="analysis">
                Analysis
              </TabsTrigger>
              <TabsTrigger value="transcription">
                Transcript
              </TabsTrigger>
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