import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Book, FileText, MessageSquare, Loader2 } from "lucide-react";
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

  const { data: coachingNotes } = useQuery({
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

  const handleRowClick = (action: 'select' | 'generate' | 'view') => {
    switch (action) {
      case 'select':
        setIsModalOpen(true);
        break;
      case 'generate':
        if (selectedRecordings.length > 0) {
          handleGenerateNotes();
        } else {
          toast({
            title: "No recordings selected",
            description: "Please select recordings first before generating notes.",
          });
        }
        break;
      case 'view':
        // Scroll to notes section if exists
        const notesSection = document.getElementById('notes-section');
        if (notesSection) {
          notesSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-4xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
        {/* Top Section - Reserved for future content */}
        <div className="h-16"></div>

        {/* Middle Section - Instructions */}
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground">
            Generate personalized coaching notes from your golf session recordings.
            Select up to three recordings to analyze your performance and receive detailed feedback.
          </p>
        </div>

        {/* Interactive Rows */}
        <div className="space-y-4">
          {/* Select Recordings Row */}
          <button
            onClick={() => handleRowClick('select')}
            className="w-full p-6 bg-card hover:bg-accent rounded-lg border transition-colors flex items-center gap-4 group"
          >
            <FileText className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="text-left">
              <h3 className="font-medium">Select Recordings</h3>
              <p className="text-sm text-muted-foreground">Choose up to 3 recordings for analysis</p>
            </div>
          </button>

          {/* Generate Notes Row */}
          <button
            onClick={() => handleRowClick('generate')}
            className="w-full p-6 bg-card hover:bg-accent rounded-lg border transition-colors flex items-center gap-4 group"
          >
            <MessageSquare className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="text-left">
              <h3 className="font-medium">Generate Notes</h3>
              <p className="text-sm text-muted-foreground">Create coaching insights from selected recordings</p>
            </div>
          </button>

          {/* View Notes Row */}
          <button
            onClick={() => handleRowClick('view')}
            className="w-full p-6 bg-card hover:bg-accent rounded-lg border transition-colors flex items-center gap-4 group"
          >
            <Book className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="text-left">
              <h3 className="font-medium">View Notes</h3>
              <p className="text-sm text-muted-foreground">Review your coaching history and insights</p>
            </div>
          </button>
        </div>

        {/* Recording Selection Modal */}
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

        {/* Notes Display Section */}
        {coachingNotes && coachingNotes.length > 0 && (
          <div id="notes-section" className="mt-16 space-y-8">
            {coachingNotes.map((note) => (
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
      </div>
    </div>
  );
};

export default Playbook;