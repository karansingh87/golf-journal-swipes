interface FeelingGoodSectionProps {
  content: string[];
}

const FeelingGoodSection = ({ content = [] }: FeelingGoodSectionProps) => {
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

export default FeelingGoodSection;