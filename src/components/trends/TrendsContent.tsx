import { TrendOutput } from "@/types/trends";
import AnalysisCard from "@/components/recording-detail/analysis/AnalysisCard";

interface TrendsContentProps {
  trends: TrendOutput;
  formatContent: (pattern: any) => string;
}

const TrendsContent = ({ trends, formatContent }: TrendsContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {trends.patterns.map((pattern, index) => (
          <AnalysisCard
            key={pattern.primary_insight}
            title={pattern.primary_insight}
            content={formatContent(pattern)}
            index={index}
            strengthRating={pattern.confidence_score}
          />
        ))}
      </div>
      
      <div className="text-sm text-muted-foreground mt-4">
        <p>Analysis based on {trends.metadata.sessions_analyzed} sessions</p>
        <p>Time period: {trends.metadata.date_range}</p>
        <p>Pattern confidence: {trends.metadata.analysis_confidence}%</p>
      </div>
    </div>
  );
};

export default TrendsContent;