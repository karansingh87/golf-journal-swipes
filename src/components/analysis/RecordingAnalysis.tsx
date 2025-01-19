import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisTab from "@/components/recording-detail/AnalysisTab";
import InsightsTab from "@/components/recording-detail/InsightsTab";

interface RecordingAnalysisProps {
  analysis: string;
}

const RecordingAnalysis = ({ analysis }: RecordingAnalysisProps) => {
  const [activeTab, setActiveTab] = useState("analysis");

  const parsedAnalysis = analysis ? JSON.parse(analysis) : null;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
      </TabsList>
      
      <TabsContent value="analysis" className="mt-0">
        <AnalysisTab analysis={parsedAnalysis} />
      </TabsContent>
      
      <TabsContent value="insights" className="mt-0">
        <InsightsTab insights={analysis} />
      </TabsContent>
    </Tabs>
  );
};

export default RecordingAnalysis;