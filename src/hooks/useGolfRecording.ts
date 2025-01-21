import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { transcribeAudio } from "../utils/transcription";
import { useGolfStorage } from "./useGolfStorage";
import { canUseFeature, incrementUsage } from "@/utils/subscription";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";

export const useGolfRecording = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isProcessingText, setIsProcessingText] = useState(false);
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();
  const { saveRecording } = useGolfStorage();
  const session = useSession();

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('has_pro_access, monthly_recordings_count')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const handleAudioRecording = async (
    audioBlob: Blob, 
    recordingTime: number,
    sessionType: 'course' | 'practice'
  ) => {
    try {
      if (!profile) {
        throw new Error("No profile found");
      }

      // Check if user can make more recordings
      if (!profile.has_pro_access) {
        const canUse = await canUseFeature(profile, 'recordings', supabase);
        if (!canUse) {
          toast({
            variant: "destructive",
            title: "Recording limit reached",
            description: "You've reached your free tier limit. Upgrade to continue recording.",
          });
          return;
        }
      }

      setIsTranscribing(true);
      const audioUrl = URL.createObjectURL(audioBlob);
      const text = await transcribeAudio(audioBlob);
      setTranscription(text);
      
      await saveRecording(audioUrl, text, sessionType);
      
      // Increment usage only for free users after successful save
      if (!profile.has_pro_access) {
        await incrementUsage(profile, 'recordings', supabase);
      }
    } catch (error) {
      console.error("Error processing recording:", error);
      toast({
        variant: "destructive",
        title: "Error saving recording",
        description: "Could not save your recording. Please try again.",
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleTextSubmit = async (
    text: string,
    sessionType: 'course' | 'practice'
  ) => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text before saving.",
      });
      return;
    }

    try {
      if (!profile) {
        throw new Error("No profile found");
      }

      // Check if user can make more recordings
      if (!profile.has_pro_access) {
        const canUse = await canUseFeature(profile, 'recordings', supabase);
        if (!canUse) {
          toast({
            variant: "destructive",
            title: "Recording limit reached",
            description: "You've reached your free tier limit. Upgrade to continue recording.",
          });
          return;
        }
      }

      console.log('Processing text submission:', { length: text.length });
      setIsProcessingText(true);
      await saveRecording(null, text, sessionType);
      
      // Increment usage only for free users after successful save
      if (!profile.has_pro_access) {
        await incrementUsage(profile, 'recordings', supabase);
      }
    } catch (error) {
      console.error('Error processing text:', error);
      toast({
        variant: "destructive",
        title: "Error saving note",
        description: "Could not save your note. Please try again.",
      });
    } finally {
      setIsProcessingText(false);
    }
  };

  return {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  };
};