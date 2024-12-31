import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    return content[0].split('.')[0] + '...';
  }
  const firstSentence = content.split('.')[0];
  return firstSentence.length > 100 ? firstSentence.slice(0, 100) + '...' : firstSentence + '...';
};

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  const [expandedSection, setExpandedSection] = useState<string>("session_story");

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">No analysis available for this session.</p>
      </div>
    );
  }

  let parsedAnalysis: AnalysisData;
  try {
    const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanAnalysis);

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
        <p className="text-muted-foreground">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  const handleSectionClick = (sectionType: string) => {
    setExpandedSection(expandedSection === sectionType ? "" : sectionType);
  };

  return (
    <ScrollArea className="h-[calc(100vh-300px)] px-6">
      <div className="space-y-4 pb-8">
        {parsedAnalysis.sections.map((section) => (
          <div
            key={section.type}
            className={cn(
              "rounded-lg border transition-all duration-200",
              expandedSection === section.type ? "bg-zinc-50 dark:bg-zinc-900" : "bg-white dark:bg-zinc-900/50"
            )}
          >
            <button
              onClick={() => handleSectionClick(section.type)}
              className={cn(
                "w-full px-4 py-3 flex items-center justify-between",
                "text-left transition-colors duration-200",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              )}
            >
              <div className="flex items-center gap-2">
                {expandedSection === section.type ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={cn(
                  "font-medium",
                  expandedSection === section.type ? "text-foreground" : "text-muted-foreground"
                )}>
                  {getTitleFromType(section.type)}
                </span>
              </div>
            </button>
            
            <div className={cn(
              "px-4 pb-4 transition-all duration-200",
              expandedSection === section.type ? "block" : "hidden"
            )}>
              {Array.isArray(section.content) ? (
                <ul className="list-disc list-inside space-y-3">
                  {section.content.map((item, index) => (
                    <li key={index} className="text-base leading-relaxed text-muted-foreground ml-4">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {section.content}
                </p>
              )}
            </div>
            
            {expandedSection !== section.type && section.type !== 'session_story' && (
              <div className="px-4 pb-3 text-sm text-muted-foreground">
                {getSummaryFromContent(section.content)}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;