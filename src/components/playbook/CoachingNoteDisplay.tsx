import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CoachingNote {
  technical_observations: string[];
  key_situations: string[];
  equipment_notes: string[];
  progress_notes: string[];
  coaching_questions: string[];
}

interface CoachingNoteDisplayProps {
  note: CoachingNote;
  isPublicView?: boolean;
}

const CoachingNoteDisplay = ({ note, isPublicView = false }: CoachingNoteDisplayProps) => {
  const navigate = useNavigate();
  
  const sections = [
    {
      title: "Technical Observations",
      data: note.technical_observations,
      alwaysVisible: true,
    },
    {
      title: "Key Situations",
      data: note.key_situations,
      alwaysVisible: false,
    },
    {
      title: "Equipment Notes",
      data: note.equipment_notes,
      alwaysVisible: false,
    },
    {
      title: "Progress Notes",
      data: note.progress_notes,
      alwaysVisible: false,
    },
    {
      title: "Coaching Questions",
      data: note.coaching_questions,
      alwaysVisible: false,
    },
  ];

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const renderCardContent = (section: typeof sections[0]) => {
    if (!isPublicView || section.alwaysVisible) {
      return (
        <ul className="list-disc list-inside space-y-2">
          {section.data.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="relative">
        <div className="max-h-[60px] overflow-hidden relative">
          <ul className="list-disc list-inside space-y-2">
            {section.data.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
        
        {/* Sign up button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={handleSignUpClick}
            className="bg-primary hover:bg-primary/90 text-white font-medium"
          >
            <Eye className="mr-2 h-4 w-4" />
            Sign up to view more
          </Button>
        </div>
      </div>
    );
  };

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
              {renderCardContent(section)}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CoachingNoteDisplay;