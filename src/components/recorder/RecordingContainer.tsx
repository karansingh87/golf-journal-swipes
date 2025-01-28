import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "../VoiceRecorder";
import TextInput from "../TextInput";
import { useGolfRecording } from "../../hooks/useGolfRecording";
import SessionTypeModal from "../SessionTypeModal";
import { UpgradeModal } from "../subscription/UpgradeModal";
import { useProfileData } from "./hooks/useProfileData";
import { canAccessRecording } from "@/utils/subscription";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const RecordingContainer = () => {
  console.log("RecordingContainer mounting");
  const navigate = useNavigate();
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [monthlyUsage, setMonthlyUsage] = useState<number | null>(null);

  const { profile, isProfileLoading, isAuthenticated } = useProfileData();
  
  console.log("Auth state:", { isAuthenticated, isProfileLoading, profile });

  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  // Fetch monthly usage for free users
  useEffect(() => {
    const fetchMonthlyUsage = async () => {
      if (!profile?.id || profile.has_pro_access) return;

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count } = await supabase
        .from('recordings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id)
        .gte('created_at', startOfMonth.toISOString());

      setMonthlyUsage(count || 0);
    };

    fetchMonthlyUsage();
  }, [profile]);

  // Redirect to login if not authenticated
  useEffect(() => {
    console.log("Auth check effect running", { isAuthenticated, isProfileLoading });
    if (!isAuthenticated && !isProfileLoading) {
      console.log("Redirecting to login - not authenticated");
      navigate('/login');
    }
  }, [isAuthenticated, isProfileLoading, navigate]);

  // Don't render anything while checking authentication or if not authenticated
  if (isProfileLoading || !isAuthenticated || !profile) {
    console.log("Early return - loading or not authenticated", { isProfileLoading, isAuthenticated, profile });
    return null;
  }

  // Check if user can access recording feature
  if (!canAccessRecording(profile)) {
    console.log("User cannot access recording feature - redirecting to home");
    navigate('/');
    return null;
  }

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    try {
      await handleTextSubmit(text, type);
      setShowTextInput(false);
    } catch (error) {
      console.error('Error handling text submit:', error);
    }
  };

  const handleRecordingStart = async () => {
    // For free users, check if they've hit their limit
    if (!profile.has_pro_access && monthlyUsage !== null && monthlyUsage >= 3) {
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
    // For free users, check if they've hit their limit
    if (!profile.has_pro_access && monthlyUsage !== null && monthlyUsage >= 3) {
      setShowUpgradeModal(true);
      return;
    }
    setShowTextInput(true);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background text-foreground overflow-hidden">
      {!profile.has_pro_access && monthlyUsage !== null && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Badge 
            variant="secondary" 
            className="px-3 py-1 text-xs font-medium bg-white/80 backdrop-blur-sm border border-zinc-200/50 shadow-sm text-zinc-600 rounded-full"
          >
            {monthlyUsage}/3 recordings this month
          </Badge>
        </div>
      )}
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
            onContinue={() => {
              setShowUpgradeModal(false);
              setShowSessionTypeModal(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RecordingContainer;