import { Card } from "@/components/ui/card";

interface KeySituationsProps {
  situations: string[];
}

const KeySituations = ({ situations }: KeySituationsProps) => {
  if (!situations?.length) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground text-center">
          No key situations available
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {situations.map((situation, index) => (
          <Card key={index} className="p-4 bg-background/50">
            <p className="text-sm text-muted-foreground">{situation}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KeySituations;