import { ScrollArea } from "@/components/ui/scroll-area";
import AnalysisSection from "./analysis/AnalysisSection";

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
      <div className="px-6">
        <AnalysisSection data={data} />
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;