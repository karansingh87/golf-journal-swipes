import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CoachNotes = () => {
  const session = useSession();
  const navigate = useNavigate();

  const { data: notes, isLoading } = useQuery({
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

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <div className="space-y-1 pt-3 pb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => navigate('/playbook')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-golf-gray-text-primary">
              Coaching Notes
            </h1>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-4">
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
                      {note.recording_ids.length} Recording{note.recording_ids.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-1 mt-3">
                    {note.notes}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CoachNotes;