import { Brain } from 'lucide-react';
import InsightCard from './InsightCard';
import QualityBadge from './QualityBadge';

interface MentalGameData {
  focus: 'high' | 'medium' | 'low';
  confidence: 'high' | 'medium' | 'low';
  notes: string[];
}

interface MentalGameInsightsProps {
  data: MentalGameData;
}

const MentalGameInsights = ({ data }: MentalGameInsightsProps) => {
  if (!data) return null;

  return (
    <InsightCard title="Mental Game" icon={Brain}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <QualityBadge quality={data.focus} label={`Focus: ${data.focus}`} />
          <QualityBadge quality={data.confidence} label={`Confidence: ${data.confidence}`} />
        </div>
        {data.notes?.length > 0 && (
          <ul className="list-disc list-inside space-y-1">
            {data.notes.map((note, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {note}
              </li>
            ))}
          </ul>
        )}
      </div>
    </InsightCard>
  );
};

export default MentalGameInsights;