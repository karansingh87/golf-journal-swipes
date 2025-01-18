import { useState, useEffect } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import { useGolfRecording } from "../hooks/useGolfRecording";
import SessionTypeModal from "./SessionTypeModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeModal } from "./subscription/UpgradeModal";
import { Loader2 } from "lucide-react";

const VoiceRecorderContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
  
  // Wait for auth to be initialized
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Auth session initialized:', !!session);
      setAuthInitialized(true);
    };
    
    checkAuth();
  }, []);

  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();
  
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log('Starting profile fetch...');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user?.id);
      
      if (!user) {
        console.log('No user found');
        return null;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier, is_admin, subscription_status')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      console.log('Profile data received:', data);
      return data;
    },
    enabled: authInitialized, // Only run query when auth is initialized
    retry: 2,
    staleTime: 30000, // Cache for 30 seconds
  });

  // Debug logs for component state
  useEffect(() => {
    console.log('Auth initialized:', authInitialized);
    console.log('Profile loading state:', isProfileLoading);
    console.log('Current profile data:', profile);
  }, [authInitialized, isProfileLoading, profile]);

  // Don't render anything until auth is initialized and we have profile data
  if (!authInitialized || isProfileLoading || !profile) {
    console.log('Showing loading state');
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
          <p className="text-golf-green/80 text-sm font-medium">
            {!authInitialized ? 'Initializing...' : 'Loading your profile...'}
          </p>
        </div>
      </div>
    );
  }

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    console.log('Handling text submit with profile:', profile);
    if (!profile || profile.subscription_tier !== 'pro') {
      console.log('Showing upgrade modal - not pro user');
      setShowUpgradeModal(true);
      return;
    }
    await handleTextSubmit(text, type);
    setShowTextInput(false);
  };

  const handleRecordingStart = () => {
    console.log('Handling recording start with profile:', profile);
    if (!profile || profile.subscription_tier !== 'pro') {
      console.log('Showing upgrade modal - not pro user');
      setShowUpgradeModal(true);
      return;
    }
    setShowSessionTypeModal(true);
  };

  const handleSessionTypeSelect = (type: "course" | "practice") => {
    setSessionType(type);
    setShowSessionTypeModal(false);
  };

  const handleSwitchToText = () => {
    console.log('Handling switch to text with profile:', profile);
    if (!profile || profile.subscription_tier !== 'pro') {
      console.log('Showing upgrade modal - not pro user');
      setShowUpgradeModal(true);
      return;
    }
    setShowTextInput(true);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background text-foreground overflow-hidden">
      {showTextInput ? (
        <TextInput
          onSubmit={handleTextSubmitAndClose}
          onCancel={() => setShowTextInput(false)}
          isProcessing={isProcessingText}
        />
      ) : (
        <div className="flex-1 flex flex-col h-[100dvh] relative">
          <VoiceRecorder
            isTranscribing={isTranscribing}
            transcription={transcription}
            onRecordingComplete={handleAudioRecording}
            onSwitchToText={handleSwitchToText}
            onRecordingStart={handleRecordingStart}
            sessionType={sessionType}
            autoStartRecording={true}
          />
          <SessionTypeModal 
            isOpen={showSessionTypeModal}
            onClose={() => setShowSessionTypeModal(false)}
            onSelect={handleSessionTypeSelect}
          />
          <UpgradeModal
            feature="recording"
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderContainer;