import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import PlaybookHeader from "@/components/playbook/PlaybookHeader";
import PlaybookActions from "@/components/playbook/PlaybookActions";
import PlaybookModals from "@/components/playbook/PlaybookModals";
import FloatingRecordButton from "@/components/history/FloatingRecordButton";
import { useCoachingNotes } from "@/hooks/useCoachingNotes";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const Playbook = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { isGenerating, generateNotes } = useCoachingNotes();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isPepTalkModalOpen, setIsPepTalkModalOpen] = useState(false);
  const { toast } = useToast();

  // Handle authentication
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  // Fetch user profile
  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  // Fetch recordings
  const { data: recordings, isLoading: isRecordingsLoading } = useQuery({
    queryKey: ['recordings', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
    retry: 1,
  });

  // Fetch latest coaching note
  const { data: latestNote } = useQuery({
    queryKey: ['latest_coaching_note', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('coaching_notes')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (!session) {
    return null;
  }

  const handlePepTalkClick = () => {
    if (!recordings?.length) {
      toast({
        title: "No recordings found",
        description: "Record some swings first to generate a pep talk",
        variant: "destructive",
      });
      return;
    }
    setIsPepTalkModalOpen(true);
  };

  const handleGenerateNotes = async (selectedRecordings: string[]) => {
    const noteData = await generateNotes(selectedRecordings, recordings || []);
    if (noteData) {
      navigate(`/coach_notes/${noteData.id}`);
    }
  };

  // Simplified display name handling with fallback
  const displayName = userProfile?.display_name || '';

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Header offset for fixed navigation */}
      <div className="h-14" />
      
      {/* Main content area with dynamic height */}
      <div className="flex-1 flex flex-col w-full px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col h-[calc(100dvh-3.5rem)] pt-6">
          <PlaybookHeader displayName={displayName} />
          <div className="flex-1 flex flex-col justify-center">
            <PlaybookActions 
              onGenerateClick={() => setIsActionModalOpen(true)}
              onPepTalkClick={handlePepTalkClick}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <PlaybookModals
        recordings={recordings}
        latestNoteId={latestNote?.id}
        isGenerating={isGenerating}
        onGenerateNotes={handleGenerateNotes}
        isActionModalOpen={isActionModalOpen}
        setIsActionModalOpen={setIsActionModalOpen}
        isPepTalkModalOpen={isPepTalkModalOpen}
        setIsPepTalkModalOpen={setIsPepTalkModalOpen}
      />

      {/* Floating Record Button */}
      <FloatingRecordButton />
    </div>
  );
};

export default Playbook;