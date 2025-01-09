interface GoToShots {
  type: "go_to_shots";
  content: string[];
}

interface GoToShotsSectionProps {
  items: GoToShots;
}

const GoToShotsSection = ({ items }: GoToShotsSectionProps) => {
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

export default GoToShotsSection;