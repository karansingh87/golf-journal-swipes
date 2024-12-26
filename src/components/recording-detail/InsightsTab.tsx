import { ScrollArea } from "@/components/ui/scroll-area";
import SessionSummary from "./insights/SessionSummary";
import TechnicalInsights from "./insights/TechnicalInsights";
import MentalGameInsights from "./insights/MentalGameInsights";
import ShotQualityChart from "./insights/ShotQualityChart";
import EquipmentInsights from "./insights/EquipmentInsights";
import ActionItems from "./insights/ActionItems";

interface InsightsTabProps {
  insights: string | null;
}

const InsightsTab = ({ insights }: InsightsTabProps) => {
  if (!insights) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">No insights available for this session.</p>
      </div>
    );
  }

  let parsedInsights;
  try {
    parsedInsights = JSON.parse(insights);
  } catch (error) {
    console.error('Error parsing insights:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">Unable to load insights.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)] px-6">
      <div className="grid gap-6 pb-8">
        <div className="grid gap-6 md:grid-cols-2">
          {parsedInsights.sessionSummary && (
            <SessionSummary data={parsedInsights.sessionSummary} />
          )}
          {parsedInsights.mentalGame && (
            <MentalGameInsights data={parsedInsights.mentalGame} />
          )}
        </div>

        {parsedInsights.technical && (
          <TechnicalInsights data={parsedInsights.technical} />
        )}

        {parsedInsights.shotQuality?.length > 0 && (
          <ShotQualityChart data={parsedInsights.shotQuality} />
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {parsedInsights.equipment?.length > 0 && (
            <EquipmentInsights notes={parsedInsights.equipment} />
          )}
          {parsedInsights.actionItems?.length > 0 && (
            <ActionItems items={parsedInsights.actionItems} />
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default InsightsTab;