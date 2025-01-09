interface FeelingGoodSectionProps {
  content: string[];
}

const FeelingGoodSection = ({ content = [] }: FeelingGoodSectionProps) => {
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

export default FeelingGoodSection;