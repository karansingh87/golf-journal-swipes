import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisTab from "@/components/recording-detail/AnalysisTab";
import TranscriptionTab from "@/components/recording-detail/TranscriptionTab";
import { useSession } from "@supabase/auth-helpers-react";

const RecordingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const session = useSession();

  // Redirect if not authenticated
  if (!session) {
    navigate('/login');
    return null;
  }

  const { data: recording, isLoading } = useQuery({
    queryKey: ['recording', id],
    queryFn: async () => {
      console.log('Fetching recording with ID:', id);
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching recording:', error);
        throw error;
      }
      
      console.log('Fetched recording:', data);
      return data;
    },
    enabled: !!session && !!id,
  });

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
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/notes')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Button>
          
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-3">
              <div className="text-lg font-medium">
                {format(new Date(recording.created_at), "MMMM d, yyyy")}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <Dumbbell className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {recording.session_type === 'practice' ? 'Range' : 'Course'}
                </span>
              </div>
            </div>
          </div>
        </div>

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