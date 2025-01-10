import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RecordingCard from "@/components/RecordingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type RecordingWithProfile = {
  id: string;
  audio_url: string | null;
  transcription: string | null;
  analysis: string | null;
  duration: number | null;
  created_at: string | null;
  session_type: "course" | "practice";
  is_public: boolean | null;
  profiles: {
    display_name: string | null;
  } | null;
}

const SharedRecording = () => {
  const { id } = useParams<{ id: string }>();

  const { data: recording, isLoading } = useQuery({
    queryKey: ['shared-recording', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recordings')
        .select(`
          *,
          profiles (
            display_name
          )
        `)
        .eq('id', id)
        .eq('is_public', true)
        .single();

      if (error) throw error;

      const typedData = data as RecordingWithProfile;
      
      return {
        ...typedData,
        user: { 
          display_name: typedData.profiles?.display_name 
        }
      };
    },
  });

  if (isLoading) {
    return (
      <div className="pt-16 container max-w-2xl mx-auto p-4">
        <Skeleton className="h-[120px] w-full mb-4 rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (!recording) {
    return (
      <div className="pt-16 container max-w-2xl mx-auto p-4">
        <div className="text-center text-gray-500">
          This recording is not available or has been made private.
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 container max-w-2xl mx-auto p-4">
      <RecordingCard recording={recording} isPublicView={true} />
      
      <div className="mt-4">
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="transcription">Transcription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis" className="mt-4">
            <ScrollArea className="h-[calc(100vh-300px)] rounded-md border p-4">
              {recording.analysis && (
                <div className="prose prose-zinc max-w-none">
                  {recording.analysis}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="transcription" className="mt-4">
            <ScrollArea className="h-[calc(100vh-300px)] rounded-md border p-4">
              {recording.transcription && (
                <div className="prose prose-zinc max-w-none">
                  {recording.transcription}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SharedRecording;