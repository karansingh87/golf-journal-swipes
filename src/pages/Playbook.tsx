import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GenerateNotesCard from "@/components/playbook/GenerateNotesCard";
import TrendsCard from "@/components/playbook/TrendsCard";
import PlaceholderCard from "@/components/playbook/PlaceholderCard";
import RecordingSelectionModal from "@/components/playbook/RecordingSelectionModal";
import SegmentedNav from "@/components/navigation/SegmentedNav";

const Playbook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordings, setSelectedRecordings] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

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

  const handleGenerateNotes = async () => {
    if (!session?.user?.id) return;
    
    setIsGenerating(true);
    try {
      const selectedRecordingsData = recordings?.filter(
        recording => selectedRecordings.includes(recording.id)
      );

      const { data, error } = await supabase.functions.invoke('generate-coaching-notes', {
        body: { recordings: selectedRecordingsData }
      });

      if (error) throw error;

      const { error: saveError } = await supabase
        .from('coaching_notes')
        .insert({
          user_id: session.user.id,
          recording_ids: selectedRecordings,
          notes: JSON.stringify(data.analysis)
        });

      if (saveError) throw saveError;

      toast({
        title: "Success",
        description: "Coach notes have been generated successfully.",
      });
      
      setIsModalOpen(false);
      setSelectedRecordings([]);
      navigate('/coach_notes');
    } catch (error) {
      console.error('Error generating notes:', error);
      toast({
        title: "Error",
        description: "Failed to generate coach notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRecordingSelect = (id: string) => {
    setSelectedRecordings(prev => {
      if (prev.includes(id)) {
        return prev.filter(recordingId => recordingId !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const displayName = userProfile?.display_name || 'Golfer';

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="fixed top-16 left-0 right-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <SegmentedNav />
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="mb-8 pt-6">
            <h1 className="text-2xl font-bold mb-2">Hi {displayName},</h1>
            <p className="text-sm text-muted-foreground">
              Welcome to your personal golf playbook. Here you'll find your most valuable 
              insights, breakthroughs, and patterns we've discovered from your golf journey. 
              Think of this as your personalized guide to your best golf.
            </p>
          </div>

          <div className="fixed bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
            <div className="space-y-3">
              <GenerateNotesCard onClick={() => setIsModalOpen(true)} />
              <TrendsCard />
              <PlaceholderCard />
            </div>
          </div>
        </div>
      </div>

      <RecordingSelectionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecordings([]);
        }}
        recordings={recordings || []}
        selectedRecordings={selectedRecordings}
        onSelect={handleRecordingSelect}
        onGenerate={handleGenerateNotes}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default Playbook;