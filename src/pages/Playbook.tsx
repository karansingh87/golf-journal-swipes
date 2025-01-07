import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import PlaybookHeader from "@/components/playbook/PlaybookHeader";
import PlaybookActions from "@/components/playbook/PlaybookActions";
import PlaybookModals from "@/components/playbook/PlaybookModals";
import { useCoachingNotes } from "@/hooks/useCoachingNotes";

const Playbook = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { isGenerating, generateNotes } = useCoachingNotes();

  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', session?.user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: recordings } = useQuery({
    queryKey: ['recordings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: latestNote } = useQuery({
    queryKey: ['latest_coaching_note'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coaching_notes')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const handleGenerateNotes = async (selectedRecordings: string[]) => {
    const noteData = await generateNotes(selectedRecordings, recordings || []);
    if (noteData) {
      navigate(`/coach_notes/${noteData.id}`);
    }
  };

  const displayName = userProfile?.display_name || 'Golfer';

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      {/* Header is fixed, so we need padding to offset content */}
      <div className="h-14" /> {/* Offset for fixed header */}
      
      {/* Tab Navigation */}
      <div className="fixed top-16 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SegmentedNav />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full pt-20">
        <div className="max-w-7xl mx-auto w-full px-10 sm:px-14 lg:px-20">
          <PlaybookHeader displayName={displayName} />
          <PlaybookActions onGenerateClick={() => setIsActionModalOpen(true)} />
        </div>
      </div>

      {/* Modals */}
      <PlaybookModals
        recordings={recordings}
        latestNoteId={latestNote?.id}
        isGenerating={isGenerating}
        onGenerateNotes={handleGenerateNotes}
        openActionModal={() => setIsActionModalOpen(true)}
      />
    </div>
  );
};

export default Playbook;