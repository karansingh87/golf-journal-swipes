import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CoachNotesHeader from "@/components/coach-notes/CoachNotesHeader";

const CoachNotes = () => {
  const session = useSession();
  const navigate = useNavigate();

  const { data: notes, isLoading, refetch } = useQuery({
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

  if (!session) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const lastUpdateTime = notes && notes.length > 0 
    ? new Date(notes[0].created_at) 
    : null;

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto pt-16">
        <CoachNotesHeader
          lastUpdateTime={lastUpdateTime}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        <div className="px-2 sm:px-6 lg:px-8 pt-6">
          <ScrollArea className="rounded-lg">
            <div className="space-y-4 px-4">
              {notes?.map((note) => (
                <Card 
                  key={note.id}
                  className={cn(
                    "mb-1 transition-all duration-300 hover:shadow-lg cursor-pointer relative",
                    "rounded-2xl border border-border/50 backdrop-blur-sm active:scale-[0.99]",
                    "bg-white/80 p-5"
                  )}
                  onClick={() => navigate(`/coach_notes/${note.id}`)}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium">
                          {format(new Date(note.created_at), "MMM d, yyyy")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(note.created_at), "h:mm a")}
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#F1F1F1] text-zinc-600 shadow-sm hover:bg-[#E8E8E8] transition-colors">
                        Based on {note.recording_ids.length} recording{note.recording_ids.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CoachNotes;