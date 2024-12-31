import { useState, useRef, useEffect } from "react";
import AnalysisCard from "./analysis/AnalysisCard";
import ScrollableContent from "./analysis/ScrollableContent";

interface AnalysisSection {
  type: string;
  content: string | string[];
}

interface AnalysisData {
  sections: AnalysisSection[];
}

interface AnalysisTabProps {
  analysis: string | null;
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

const getSummaryFromContent = (content: string | string[]): string => {
  if (Array.isArray(content)) {
    return content[0].substring(0, 100) + (content[0].length > 100 ? '...' : '');
  }
  return content.substring(0, 100) + (content.length > 100 ? '...' : '');
};

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  const [expandedSection, setExpandedSection] = useState<string>("session_story");

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-golf-gray-text-secondary">No analysis available for this session.</p>
      </div>
    );
  }

  let parsedAnalysis: AnalysisData;
  try {
    const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanAnalysis);

    if (parsedAnalysis.sections.length === 1 && parsedAnalysis.sections[0].type === 'quick_note') {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
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
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-golf-gray-text-secondary">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col">
      <ScrollableContent>
        <div className="space-y-4">
          {parsedAnalysis.sections.map((section, index) => (
            <div key={section.type}>
              <AnalysisCard
                title={getTitleFromType(section.type)}
                content={section.content}
                isOverview={section.type === 'session_story'}
                index={index}
                defaultExpanded={section.type === 'session_story'}
                onExpand={(isExpanded) => {
                  if (isExpanded) {
                    setExpandedSection(section.type);
                  }
                }}
                summary={section.type !== 'session_story' ? getSummaryFromContent(section.content) : undefined}
              />
            </div>
          ))}
        </div>
      </ScrollableContent>
    </div>
  );
};

export default AnalysisTab;