interface RecentWinsSectionProps {
  content: string[];
  type: 'go_to_shots' | 'scoring_zones' | 'confidence_moments';
}

const RecentWinsSection = ({ content = [], type }: RecentWinsSectionProps) => {
  return (
    <div className="space-y-3">
      {content.map((item, index) => (
        <p key={index} className="text-sm text-muted-foreground">
          {item}
        </p>
      ))}
    </div>
  );
};

export default RecentWinsSection;