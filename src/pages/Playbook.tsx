import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import GenerateNotesCard from "@/components/playbook/GenerateNotesCard";
import RecordingSelectionModal from "@/components/playbook/RecordingSelectionModal";
import CoachingNoteDisplay from "@/components/playbook/CoachingNoteDisplay";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Playbook = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordings, setSelectedRecordings] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<any>(null);
  const [showNotesModal, setShowNotesModal] = useState(false);

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
      setGeneratedNotes(data.analysis);
      setShowNotesModal(true);
      setSelectedRecordings([]);
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

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-2xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <GenerateNotesCard onClick={() => setIsModalOpen(true)} />
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

        <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {generatedNotes && (
              <CoachingNoteDisplay notes={generatedNotes} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Playbook;