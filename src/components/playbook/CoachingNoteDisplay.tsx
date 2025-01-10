import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      data: note.technical_observations,
    },
    {
      title: "Key Situations",
      data: note.key_situations,
    },
    {
      title: "Equipment Notes",
      data: note.equipment_notes,
    },
    {
      title: "Progress Notes",
      data: note.progress_notes,
    },
    {
      title: "Coaching Questions",
      data: note.coaching_questions,
    },
  ];

  return (
    <ScrollArea className="w-full">
      <div className="space-y-4 p-4">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-2">
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