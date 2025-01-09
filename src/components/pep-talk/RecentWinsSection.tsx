interface RecentWinsSectionProps {
  content: string[];
  type: 'go_to_shots' | 'scoring_zones' | 'confidence_moments';
}

const RecentWinsSection = ({ content = [], type }: RecentWinsSectionProps) => {
  return (
    <ul className="list-disc list-inside space-y-2 pl-2">
      {content.map((item, index) => (
        <li key={index} className="text-sm text-muted-foreground">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default RecentWinsSection;