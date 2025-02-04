import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisTab from "@/components/recording-detail/AnalysisTab";
import TranscriptionTab from "@/components/recording-detail/TranscriptionTab";
import { format } from "date-fns";

interface Recording {
  id: string;
  audio_url: string | null;
  transcription: string | null;
  duration: number | null;
  created_at: string;
  analysis: string | null;
  session_type: 'course' | 'practice';
  insights: string | null;
  is_public: boolean;
}

interface AnalysisSection {
  type: string;
  content: string | string[];
}

interface AnalysisData {
  sections: AnalysisSection[];
}

const SharedRecording = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { data: recording, isLoading } = useQuery({
    queryKey: ['shared-recording', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('id', id)
        .eq('is_public', true)
        .single();

      if (error) throw error;
      return data as Recording;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!recording || !recording.is_public) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <p className="text-lg text-muted-foreground">Recording not found or is private</p>
      </div>
    );
  }

  const parsedAnalysis: AnalysisData | null = recording.analysis ? JSON.parse(recording.analysis) : null;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Golf Session
          </h1>
          <p className="text-sm text-muted-foreground">
            {format(new Date(recording.created_at), "MMMM d, yyyy")} • {format(new Date(recording.created_at), "h:mm a")}
          </p>
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
              <AnalysisTab analysis={parsedAnalysis} isPublicView={true} />
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

export default SharedRecording;