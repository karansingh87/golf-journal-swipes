import { Target } from 'lucide-react';
import InsightCard from './InsightCard';

interface ClubInsight {
  club: string;
  notes: string[];
}

interface TechnicalInsightsData {
  swingNotes: string[];
  clubSpecific?: ClubInsight[];
}

interface TechnicalInsightsProps {
  data: TechnicalInsightsData;
}

const TechnicalInsights = ({ data }: TechnicalInsightsProps) => {
  if (!data?.swingNotes?.length && !data?.clubSpecific?.length) return null;

  return (
    <InsightCard title="Technical Insights" icon={Target}>
      <div className="space-y-4">
        {data.swingNotes?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Swing Analysis</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.swingNotes.map((note, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {data.clubSpecific?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Club-Specific Notes</h4>
            {data.clubSpecific.map((club, index) => (
              <div key={index} className="mb-3">
                <h5 className="text-sm font-medium text-muted-foreground mb-1">
                  {club.club}
                </h5>
                <ul className="list-disc list-inside space-y-1">
                  {club.notes.map((note, noteIndex) => (
                    <li key={noteIndex} className="text-sm text-muted-foreground ml-4">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </InsightCard>
  );
};

export default TechnicalInsights;