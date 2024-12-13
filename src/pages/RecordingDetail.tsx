import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Pencil, Trash2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisTab from "@/components/recording-detail/AnalysisTab";
import InsightsTab from "@/components/recording-detail/InsightsTab";
import TranscriptionTab from "@/components/recording-detail/TranscriptionTab";

const RecordingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { data: recording, isLoading } = useQuery({
    queryKey: ['recording', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

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
      navigate('/history');
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!recording) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Recording not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate('/history')}
          className="mt-4"
        >
          Go back to history
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/history')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to History
        </Button>

        <div className={cn(
          "rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden",
          "transition-all duration-300",
          isDark ? "bg-black/40 shadow-[0_0_15px_rgba(74,222,128,0.1)]" : "bg-white/80"
        )}>
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => {
                    if (recording.audio_url) {
                      const audio = new Audio(recording.audio_url);
                      audio.play();
                    }
                  }}
                >
                  <PlayCircle className="h-6 w-6 text-primary" />
                </Button>
                <div>
                  <div className="text-lg font-medium">
                    {format(new Date(recording.created_at), "MMMM d, yyyy")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(recording.created_at), "h:mm a")}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    console.log("Edit recording:", recording.id);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="analysis">
                Analysis
              </TabsTrigger>
              <TabsTrigger value="insights">
                Insights
              </TabsTrigger>
              <TabsTrigger value="transcription">
                Transcript
              </TabsTrigger>
            </TabsList>
            <TabsContent value="analysis" className="mt-0">
              <AnalysisTab analysis={recording.analysis} />
            </TabsContent>
            <TabsContent value="insights" className="mt-0">
              <InsightsTab insights={recording.insights} />
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
