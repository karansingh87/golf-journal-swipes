import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { FileText } from "lucide-react";

interface CoachNote {
  id: string;
  created_at: string;
  notes: string;
}

interface CoachNotesHistoryProps {
  searchQuery: string;
}

const CoachNotesHistory = ({ searchQuery }: CoachNotesHistoryProps) => {
  const session = useSession();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { data: notes = [] } = useQuery({
    queryKey: ['coachNotes'],
    queryFn: async () => {
      if (!session) return [];
      
      const { data, error } = await supabase
        .from('coaching_notes')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setIsLoading(false);
      return data;
    },
    enabled: !!session
  });

  const filteredNotes = notes.filter((note) => {
    if (!searchQuery) return true;
    const parsedNotes = JSON.parse(note.notes);
    const searchLower = searchQuery.toLowerCase();
    
    return Object.values(parsedNotes).some(section => 
      (Array.isArray(section) && section.some(item => 
        item.toLowerCase().includes(searchLower)
      ))
    );
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchQuery ? "No notes match your search" : "No coaching notes yet"}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => navigate(`/coach_notes/${note.id}`)}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">
                  Coaching Notes
                </CardTitle>
                <span className="text-sm text-muted-foreground ml-auto">
                  {format(new Date(note.created_at), "MMM d, yyyy")}
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {Object.values(JSON.parse(note.notes).technical_observations || []).join(", ")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoachNotesHistory;