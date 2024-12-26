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
  console.log('Raw insights:', insights); // Debug log

  if (!insights) {
    console.log('No insights data available'); // Debug log
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">No insights available for this session.</p>
      </div>
    );
  }

  let parsedInsights;
  try {
    parsedInsights = JSON.parse(insights);
    console.log('Parsed insights:', parsedInsights); // Debug log
  } catch (error) {
    console.error('Error parsing insights:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">Unable to load insights. Invalid data format.</p>
      </div>
    );
  }

  const { session_insights, action_insights } = parsedInsights;

  if (!session_insights) {
    console.log('No session insights available'); // Debug log
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">No session insights available.</p>
      </div>
    );
  }

  // Map the data to match our component props
  const sessionSummaryData = {
    energyLevel: session_insights.session_summary?.energy_level || 'medium',
    quality: session_insights.session_summary?.overall_quality || 'medium',
    context: session_insights.session_summary?.context
  };

  const mentalGameData = {
    focus: session_insights.mental_insights?.[0]?.clarity || 'medium',
    confidence: session_insights.session_summary?.confidence_level || 'medium',
    notes: session_insights.mental_insights?.map(insight => insight.insight) || []
  };

  const technicalData = {
    swingNotes: session_insights.technical_insights
      ?.filter(insight => insight.category === 'swing')
      .map(insight => insight.insight) || [],
    clubSpecific: session_insights.technical_insights
      ?.filter(insight => insight.club_type !== 'not specified')
      .reduce((acc: any[], insight) => {
        const existingClub = acc.find(item => item.club === insight.club_type);
        if (existingClub) {
          existingClub.notes.push(insight.insight);
        } else {
          acc.push({
            club: insight.club_type,
            notes: [insight.insight]
          });
        }
        return acc;
      }, []) || []
  };

  const shotQualityData = session_insights.shot_quality?.map(shot => ({
    club: shot.club_type,
    quality: parseInt(shot.quality_rating === 'high' ? '90' : shot.quality_rating === 'medium' ? '60' : '30')
  })) || [];

  const equipmentData = session_insights.equipment_insights?.map(item => ({
    club: item.club_type,
    adjustment: item.adjustment_needed,
    priority: item.impact?.toLowerCase().includes('significant') ? 'high' : 
             item.impact?.toLowerCase().includes('minor') ? 'low' : 'medium'
  })) || [];

  const actionItemsData = action_insights?.immediate_fixes?.map(item => ({
    text: `${item.issue}: ${item.solution}`,
    completed: item.effectiveness === 'completed'
  })) || [];

  return (
    <ScrollArea className="h-[calc(100vh-300px)] px-6">
      <div className="grid gap-6 pb-8">
        <div className="grid gap-6 md:grid-cols-2">
          <SessionSummary data={sessionSummaryData} />
          <MentalGameInsights data={mentalGameData} />
        </div>

        <TechnicalInsights data={technicalData} />

        {shotQualityData.length > 0 && (
          <ShotQualityChart data={shotQualityData} />
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {equipmentData.length > 0 && (
            <EquipmentInsights notes={equipmentData} />
          )}
          {actionItemsData.length > 0 && (
            <ActionItems items={actionItemsData} />
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default InsightsTab;