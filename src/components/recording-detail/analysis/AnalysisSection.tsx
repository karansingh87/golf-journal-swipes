import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import AnalysisSection from './AnalysisSection';
import { Brain, Target, Info, Square, Lightbulb, Flag } from 'lucide-react';

interface AnalysisTabProps {
  analysis: string | null;
}

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">No analysis available for this session.</p>
      </div>
    );
  }

  let parsedAnalysis;
  try {
    // Remove markdown code block markers if present
    const cleanJson = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanJson);
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  const { session_analysis: data } = parsedAnalysis;

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">No session analysis available.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="px-6 pb-8 space-y-6">
        <AnalysisSection title="Overview" data={data.overview} icon={Info} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <AnalysisSection 
            title="Breakthroughs" 
            data={data.breakthroughs} 
            icon={Lightbulb}
          />
          <AnalysisSection 
            title="Growth Opportunities" 
            data={data.growth_opportunities} 
            icon={Target}
          />
        </div>

        <AnalysisSection 
          title="Mental Game" 
          data={data.mental_game} 
          icon={Brain}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <AnalysisSection 
            title="Focus Areas" 
            data={data.focus_areas} 
            icon={Flag}
          />
          <AnalysisSection 
            title="Closing Note" 
            data={data.closing_note} 
            icon={Square}
          />
        </div>
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;