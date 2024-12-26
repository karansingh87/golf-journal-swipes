import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AnalysisCard from "./analysis/AnalysisCard";
import ProgressIndicator from "./analysis/ProgressIndicator";
import { useState } from "react";

interface AnalysisTabProps {
  analysis: string | null;
}

interface AnalysisSection {
  title: string;
  content?: string | string[];
}

interface AnalysisData {
  session_analysis: {
    overview: AnalysisSection;
    breakthroughs: {
      title: string;
      key_discoveries: AnalysisSection;
      working_elements: AnalysisSection;
    };
    growth_opportunities: {
      title: string;
      primary_focus: AnalysisSection;
      technical_deep_dive: AnalysisSection;
    };
    mental_game: AnalysisSection;
    focus_areas: {
      title: string;
      next_session: AnalysisSection;
      long_term: AnalysisSection;
    };
    closing_note: AnalysisSection;
  };
}

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-golf-gray-text-secondary">No analysis available for this session.</p>
      </div>
    );
  }

  let parsedAnalysis: AnalysisData;
  try {
    const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanAnalysis);
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-golf-gray-text-secondary">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  const { session_analysis } = parsedAnalysis;

  return (
    <Tabs defaultValue="analysis">
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-6 p-6">
          {/* Overview Section */}
          <AnalysisCard
            title={session_analysis.overview.title}
            content={session_analysis.overview.content}
            isOverview={true}
            index={0}
          />

          {/* Breakthroughs Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <AnalysisCard
              title={session_analysis.breakthroughs.key_discoveries.title}
              content={session_analysis.breakthroughs.key_discoveries.content}
              index={1}
            />
            <AnalysisCard
              title={session_analysis.breakthroughs.working_elements.title}
              content={session_analysis.breakthroughs.working_elements.content}
              index={2}
            />
          </div>

          {/* Growth Opportunities Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <AnalysisCard
              title={session_analysis.growth_opportunities.primary_focus.title}
              content={session_analysis.growth_opportunities.primary_focus.content}
              index={3}
            />
            <AnalysisCard
              title={session_analysis.growth_opportunities.technical_deep_dive.title}
              content={session_analysis.growth_opportunities.technical_deep_dive.content}
              index={4}
            />
          </div>

          {/* Mental Game Section */}
          <AnalysisCard
            title={session_analysis.mental_game.title}
            content={session_analysis.mental_game.content}
            index={5}
          />

          {/* Focus Areas Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <AnalysisCard
              title={session_analysis.focus_areas.next_session.title}
              content={session_analysis.focus_areas.next_session.content}
              index={6}
            />
            <AnalysisCard
              title={session_analysis.focus_areas.long_term.title}
              content={session_analysis.focus_areas.long_term.content}
              index={7}
            />
          </div>

          {/* Closing Note Section */}
          <AnalysisCard
            title={session_analysis.closing_note.title}
            content={session_analysis.closing_note.content}
            index={8}
          />
        </div>
      </ScrollArea>

      <ProgressIndicator currentSection={currentSection} />
    </Tabs>
  );
};

export default AnalysisTab;