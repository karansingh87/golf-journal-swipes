interface GameStrength {
  type: "game_strengths";
  content: string[];
}

interface FeelingGoodSectionProps {
  items: GameStrength;
}

const FeelingGoodSection = ({ items }: FeelingGoodSectionProps) => {
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

export default FeelingGoodSection;