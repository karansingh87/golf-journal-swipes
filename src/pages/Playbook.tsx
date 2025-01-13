import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import PlaybookHeader from "@/components/playbook/PlaybookHeader";
import PlaybookActions from "@/components/playbook/PlaybookActions";
import PlaybookModals from "@/components/playbook/PlaybookModals";
import FloatingRecordButton from "@/components/history/FloatingRecordButton";
import { useCoachingNotes } from "@/hooks/useCoachingNotes";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Playbook = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { isGenerating, generateNotes } = useCoachingNotes();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isPepTalkModalOpen, setIsPepTalkModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', session?.user?.id)
        .maybeSingle();
      
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
        .maybeSingle();
      
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

  const displayName = userProfile?.display_name || 'Golfer';

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