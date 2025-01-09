interface RecentWins {
  type: "go_to_shots" | "scoring_zones" | "confidence_moments";
  content: string[];
}

interface RecentWinsSectionProps {
  items: RecentWins;
}

const RecentWinsSection = ({ items }: RecentWinsSectionProps) => {
  if (!items || !items.content) {
    return null;
  }

  return (
    <div className="space-y-4">
      {items.content.map((content, index) => (
        <div key={index} className="space-y-2">
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentWinsSection;