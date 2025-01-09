interface FeelingGoodItem {
  aspect: string;
  why: string;
  proof: string;
}

interface FeelingGoodSectionProps {
  items: FeelingGoodItem[];
}

const FeelingGoodSection = ({ items = [] }: FeelingGoodSectionProps) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">{item.aspect}</h3>
          <ul className="list-disc list-inside space-y-1">
            <li className="text-sm text-muted-foreground">{item.why}</li>
            <li className="text-sm italic text-muted-foreground ml-4">Example: {item.proof}</li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default FeelingGoodSection;