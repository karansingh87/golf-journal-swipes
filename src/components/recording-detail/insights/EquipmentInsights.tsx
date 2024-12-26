import { Wrench } from 'lucide-react';
import InsightCard from './InsightCard';

interface EquipmentNote {
  club: string;
  adjustment: string;
  priority: 'high' | 'medium' | 'low';
}

interface EquipmentInsightsProps {
  notes: EquipmentNote[];
}

const EquipmentInsights = ({ notes }: EquipmentInsightsProps) => {
  if (!notes?.length) return null;

  return (
    <InsightCard title="Equipment Insights" icon={Wrench}>
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex-1">
              <h4 className="text-sm font-medium">{note.club}</h4>
              <p className="text-sm text-muted-foreground">{note.adjustment}</p>
            </div>
            <QualityBadge 
              quality={note.priority} 
              label={`Priority: ${note.priority}`}
              className="shrink-0"
            />
          </div>
        ))}
      </div>
    </InsightCard>
  );
};

export default EquipmentInsights;