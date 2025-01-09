interface FeelingGoodSection {
  type: "game_strengths";
  content: string[];
}

interface FeelingGoodSectionProps {
  items: FeelingGoodSection | undefined;
}

const FeelingGoodSection = ({ items }: FeelingGoodSectionProps) => {
  if (!items?.content) {
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

export default FeelingGoodSection;