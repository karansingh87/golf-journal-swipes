import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList, Wrench, Target, TrendingUp, HelpCircle } from "lucide-react";

interface CoachingNote {
  technical_observations: string[];
  key_situations: string[];
  equipment_notes: string[];
  progress_notes: string[];
  coaching_questions: string[];
}

interface CoachingNoteDisplayProps {
  note: CoachingNote;
}

const CoachingNoteDisplay = ({ note }: CoachingNoteDisplayProps) => {
  const sections = [
    {
      title: "Technical Observations",
      icon: Target,
      data: note.technical_observations,
    },
    {
      title: "Key Situations",
      icon: ClipboardList,
      data: note.key_situations,
    },
    {
      title: "Equipment Notes",
      icon: Wrench,
      data: note.equipment_notes,
    },
    {
      title: "Progress Notes",
      icon: TrendingUp,
      data: note.progress_notes,
    },
    {
      title: "Coaching Questions",
      icon: HelpCircle,
      data: note.coaching_questions,
    },
  ];

  return (
    <ScrollArea className="w-full">
      <div className="space-y-4 p-4">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <section.icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {section.data.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CoachingNoteDisplay;