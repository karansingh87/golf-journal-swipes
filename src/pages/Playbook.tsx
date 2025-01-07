import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Book, Loader2 } from "lucide-react";
import CoachingNoteDisplay from "@/components/playbook/CoachingNoteDisplay";

const Playbook = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordings, setSelectedRecordings] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const { data: coachingNotes, isLoading: isLoadingNotes } = useQuery({
    queryKey: ['coaching_notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coaching_notes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const handleGenerateNotes = async () => {
    if (!session?.user?.id) return;
    if (selectedRecordings.length === 0) {
      toast({
        title: "No recordings selected",
        description: "Please select at least one recording to generate notes.",
      });
      return;
    }

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

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Playbook</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="gap-2"
          >
            <Book className="h-4 w-4" />
            Generate Coach Notes
          </Button>
        </div>

        {isLoadingNotes ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : coachingNotes?.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No coaching notes yet. Generate your first note by selecting recordings.
          </div>
        ) : (
          <div className="space-y-8">
            {coachingNotes?.map((note) => (
              <div key={note.id} className="bg-card rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <p className="text-sm text-muted-foreground">
                    Generated on {new Date(note.created_at).toLocaleDateString()}
                  </p>
                </div>
                <CoachingNoteDisplay note={JSON.parse(note.notes)} />
              </div>
            ))}
          </div>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Recordings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select up to 3 recordings to generate coaching notes from.
              </p>
              <div className="space-y-2">
                {recordings?.slice(0, 10).map((recording) => (
                  <div
                    key={recording.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedRecordings.includes(recording.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent"
                    }`}
                    onClick={() => {
                      if (selectedRecordings.includes(recording.id)) {
                        setSelectedRecordings(prev => prev.filter(id => id !== recording.id));
                      } else if (selectedRecordings.length < 3) {
                        setSelectedRecordings(prev => [...prev, recording.id]);
                      }
                    }}
                  >
                    <p className="text-sm font-medium truncate">
                      {recording.transcription?.slice(0, 100)}...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(recording.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateNotes}
                  disabled={selectedRecordings.length === 0 || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Notes"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Playbook;