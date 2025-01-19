import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Share2 } from "lucide-react";
import { trackAnalysisTimeSpent, trackPublicSharing } from "@/utils/analytics";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import AudioPlayer from "@/components/recorder/AudioPlayer";
import TranscriptionDisplay from "@/components/TranscriptionDisplay";
import RecordingAnalysis from "@/components/analysis/RecordingAnalysis";
import { CopyLinkButton } from "@/components/shared/CopyLinkButton";

const RecordingDetail = () => {
  const [startTime] = useState(Date.now());
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: recording, isLoading: isLoadingRecording } = useQuery({
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
    enabled: !!id && !!session,
  });

  useEffect(() => {
    if (recording) {
      setIsPublic(recording.is_public || false);
    }
  }, [recording]);

  useEffect(() => {
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackAnalysisTimeSpent(timeSpent);
    };
  }, [startTime]);

  const handleShareToggle = async (checked: boolean) => {
    if (!id) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('recordings')
        .update({ is_public: checked })
        .eq('id', id);

      if (error) throw error;

      setIsPublic(checked);
      if (checked) {
        trackPublicSharing('recording');
        toast({
          title: "Recording shared",
          description: "Anyone with the link can now view this recording",
        });
      } else {
        toast({
          title: "Recording unshared",
          description: "This recording is now private",
        });
      }
    } catch (error) {
      console.error('Error updating recording:', error);
      toast({
        title: "Error",
        description: "Failed to update sharing settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    navigate('/login');
    return null;
  }

  if (isLoadingRecording) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!recording) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Recording not found</p>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/shared/${id}`;

  return (
    <div className="min-h-screen bg-background pt-14">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PageBreadcrumb currentPage="Recording" />
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Switch
              id="public-toggle"
              checked={isPublic}
              onCheckedChange={handleShareToggle}
              disabled={isLoading}
            />
            <Label htmlFor="public-toggle">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share publicly</span>
                </div>
              )}
            </Label>
          </div>

          {isPublic && (
            <CopyLinkButton
              url={shareUrl}
              className="text-sm"
            />
          )}
        </div>

        {recording.audio_url && (
          <div className="mb-8">
            <AudioPlayer audioUrl={recording.audio_url} />
          </div>
        )}

        <TranscriptionDisplay
          transcription={recording.transcription}
          isTranscribing={false}
        />

        {recording.analysis && (
          <div className="mt-8">
            <RecordingAnalysis analysis={recording.analysis} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordingDetail;