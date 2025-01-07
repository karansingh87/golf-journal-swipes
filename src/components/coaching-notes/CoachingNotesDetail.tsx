import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TechnicalObservations from "./TechnicalObservations";
import KeySituations from "./KeySituations";
import EquipmentNotes from "./EquipmentNotes";
import ProgressNotes from "./ProgressNotes";
import CoachingQuestions from "./CoachingQuestions";

const CoachingNotesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { data: notes, isLoading } = useQuery({
    queryKey: ['coaching-notes', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coaching_notes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return {
        ...data,
        notes: JSON.parse(data.notes)
      };
    },
  });

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('coaching_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Coaching notes deleted successfully",
      });
      navigate('/notes');
    } catch (error) {
      console.error("Error deleting coaching notes:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete coaching notes",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!notes) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <p className="text-lg text-muted-foreground">Coaching notes not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate('/notes')}
          className="mt-4"
        >
          Go back to notes
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => navigate('/notes')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-golf-gray-text-primary mb-2">
                Coaching Analysis
              </h1>
              <p className="text-sm text-golf-gray-text-secondary">
                {format(new Date(notes.created_at), "MMMM d, yyyy")} • {format(new Date(notes.created_at), "h:mm a")}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className={cn(
          "rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden",
          "transition-all duration-300",
          isDark ? "bg-black/40 shadow-[0_0_15px_rgba(74,222,128,0.1)]" : "bg-white/80"
        )}>
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="situations">Situations</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="technical" className="mt-0">
              <TechnicalObservations observations={notes.notes.technical_observations} />
            </TabsContent>
            <TabsContent value="situations" className="mt-0">
              <KeySituations situations={notes.notes.key_situations} />
            </TabsContent>
            <TabsContent value="equipment" className="mt-0">
              <EquipmentNotes notes={notes.notes.equipment_notes} />
            </TabsContent>
            <TabsContent value="progress" className="mt-0">
              <ProgressNotes notes={notes.notes.progress_notes} />
            </TabsContent>
            <TabsContent value="questions" className="mt-0">
              <CoachingQuestions questions={notes.notes.coaching_questions} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CoachingNotesDetail;