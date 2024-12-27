import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef } from "react";
import AnalysisCard from "./analysis/AnalysisCard";

interface AnalysisTabProps {
  analysis: string | null;
}

interface AnalysisSection {
  type: string;
  content: string | string[];
}

interface AnalysisData {
  sections: AnalysisSection[];
}

const getTitleFromType = (type: string): string => {
  const titles: Record<string, string> = {
    session_story: "Session Story",
    breakthroughs: "Breakthroughs",
    opportunities: "Opportunities",
    patterns_and_potential: "Patterns & Potential",
    key_takeaway: "Key Takeaway",
    quick_note: "Quick Note"
  };
  return titles[type] || type;
};

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
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
    console.log('Parsed analysis:', parsedAnalysis);

    // Handle insufficient data case
    if (parsedAnalysis.sections.length === 1 && parsedAnalysis.sections[0].type === 'quick_note') {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
          <div className="max-w-md text-center space-y-4">
            <h3 className="text-xl font-semibold text-golf-gray-text-primary">Need More Details</h3>
            <div className="text-golf-gray-text-secondary whitespace-pre-line">
              {parsedAnalysis.sections[0].content}
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-golf-gray-text-secondary">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-[calc(100vh-300px)]">
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-6 py-6">
          {parsedAnalysis.sections.map((section, index) => (
            <div key={section.type}>
              <AnalysisCard
                title={getTitleFromType(section.type)}
                content={section.content}
                isOverview={section.type === 'session_story'}
                index={index}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AnalysisTab;