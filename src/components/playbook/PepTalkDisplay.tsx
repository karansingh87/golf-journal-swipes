import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Brain, Star } from "lucide-react";

interface PepTalkContent {
  feeling_good: Array<{
    aspect: string;
    why: string;
    proof: string;
  }>;
  key_reminders: Array<{
    thought: string;
    why_it_works: string;
  }>;
  recent_wins: Array<{
    moment: string;
    take_forward: string;
  }>;
}

interface PepTalkDisplayProps {
  content: PepTalkContent;
}

type DisplayItem = {
  primary: string;
  secondary: string;
  detail?: string;
};

const PepTalkDisplay = ({ content }: PepTalkDisplayProps) => {
  const sections = [
    {
      title: "Feeling Good",
      icon: Trophy,
      items: content.feeling_good.map(item => ({
        primary: item.aspect,
        secondary: item.why,
        detail: item.proof
      }))
    },
    {
      title: "Key Reminders",
      icon: Brain,
      items: content.key_reminders.map(item => ({
        primary: item.thought,
        secondary: item.why_it_works
      }))
    },
    {
      title: "Recent Wins",
      icon: Star,
      items: content.recent_wins.map(item => ({
        primary: item.moment,
        secondary: item.take_forward
      }))
    }
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
              <div className="space-y-4">
                {section.items.map((item: DisplayItem, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium">{item.primary}</p>
                    <p className="text-sm text-muted-foreground">{item.secondary}</p>
                    {item.detail && (
                      <p className="text-sm text-muted-foreground italic">
                        "{item.detail}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default PepTalkDisplay;