interface ConfidenceMoments {
  type: "confidence_moments";
  content: string[];
}

interface RecentWinsSectionProps {
  items: ConfidenceMoments;
}

const RecentWinsSection = ({ items }: RecentWinsSectionProps) => {
  return (
    <>
      {items.content.map((content, index) => (
        <div key={index} className="space-y-1">
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      ))}
    </>
  );
};

export default RecentWinsSection;