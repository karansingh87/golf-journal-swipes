import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="h-[calc(100vh-300px)]">
      <Tabs defaultValue={parsedAnalysis.sections[0].type} className="w-full">
        <ScrollArea className="pb-2 mb-2">
          <TabsList className="w-full inline-flex h-12 items-center justify-start px-4 overflow-x-auto">
            {parsedAnalysis.sections.map((section) => (
              <TabsTrigger
                key={section.type}
                value={section.type}
                className="flex-shrink-0"
              >
                {getTitleFromType(section.type)}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {parsedAnalysis.sections.map((section) => (
          <TabsContent key={section.type} value={section.type} className="px-6 mt-4">
            <AnalysisCard
              title={getTitleFromType(section.type)}
              content={section.content}
              isOverview={section.type === 'session_story'}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AnalysisTab;