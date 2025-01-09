import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Target, 
  Flame, 
  CheckCircle2, 
  Crosshair, 
  Trophy 
} from "lucide-react";
import {
  PepTalkContent,
  PepTalkHotSection,
  PepTalkWorkingSection,
  PepTalkShotSection,
  PepTalkScoringSection,
  PepTalkConfidenceSection
} from "@/integrations/supabase/types/pep-talk";

interface PepTalkDisplayProps {
  content: PepTalkContent;
}

const PepTalkDisplay = ({ content }: PepTalkDisplayProps) => {
  const sections = [
    {
      key: 'hot_right_now',
      title: "What's Hot Right Now",
      icon: Flame,
      renderItem: (item: PepTalkHotSection) => (
        <>
          <h4 className="font-medium text-sm">{item.aspect}</h4>
          <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
          <p className="text-sm text-muted-foreground/80 mt-1 italic">
            Recent proof: {item.proof}
          </p>
        </>
      )
    },
    {
      key: 'working_well',
      title: "Working Well",
      icon: CheckCircle2,
      renderItem: (item: PepTalkWorkingSection) => (
        <>
          <h4 className="font-medium text-sm">{item.type}</h4>
          <p className="text-sm text-muted-foreground mt-1">{item.what}</p>
          <p className="text-sm text-muted-foreground/80 mt-1 italic">
            When it clicked: {item.when}
          </p>
        </>
      )
    },
    {
      key: 'go_to_shots',
      title: "Go-To Shots",
      icon: Target,
      renderItem: (item: PepTalkShotSection) => (
        <>
          <h4 className="font-medium text-sm">{item.situation}</h4>
          <p className="text-sm text-muted-foreground mt-1">{item.your_move}</p>
          <p className="text-sm text-muted-foreground/80 mt-1 italic">
            Last success: {item.last_success}
          </p>
        </>
      )
    },
    {
      key: 'scoring_zones',
      title: "Scoring Zones",
      icon: Crosshair,
      renderItem: (item: PepTalkScoringSection) => (
        <>
          <h4 className="font-medium text-sm">{item.distance}</h4>
          <p className="text-sm text-muted-foreground mt-1">{item.club}</p>
          <p className="text-sm text-muted-foreground/80 mt-1 italic">
            Pattern: {item.pattern}
          </p>
        </>
      )
    },
    {
      key: 'confidence_builders',
      title: "Confidence Builders",
      icon: Trophy,
      renderItem: (item: PepTalkConfidenceSection) => (
        <>
          <h4 className="font-medium text-sm">{item.moment}</h4>
          <p className="text-sm text-muted-foreground mt-1">{item.why_special}</p>
          <p className="text-sm text-muted-foreground/80 mt-1 italic">
            Key to repeat: {item.repeatable_element}
          </p>
        </>
      )
    }
  ];

  return (
    <ScrollArea className="w-full">
      <div className="space-y-4 p-4">
        {sections.map((section) => (
          <Card key={section.key}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <section.icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content[section.key as keyof PepTalkContent].map((item, index) => (
                  <div key={index} className="space-y-2">
                    {section.renderItem(item)}
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