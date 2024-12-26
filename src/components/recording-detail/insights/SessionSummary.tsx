import { Activity } from 'lucide-react';
import InsightCard from './InsightCard';
import QualityBadge from './QualityBadge';

interface SessionSummaryData {
  energyLevel: 'high' | 'medium' | 'low';
  quality: 'high' | 'medium' | 'low';
  context?: string;
}

interface SessionSummaryProps {
  data: SessionSummaryData;
}

const SessionSummary = ({ data }: SessionSummaryProps) => {
  if (!data) return null;

  return (
    <InsightCard title="Session Summary" icon={Activity}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <QualityBadge quality={data.energyLevel} label={`Energy: ${data.energyLevel}`} />
          <QualityBadge quality={data.quality} label={`Quality: ${data.quality}`} />
        </div>
        {data.context && (
          <p className="text-sm text-muted-foreground">{data.context}</p>
        )}
      </div>
    </InsightCard>
  );
};

export default SessionSummary;