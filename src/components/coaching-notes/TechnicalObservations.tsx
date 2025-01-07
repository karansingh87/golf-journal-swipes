import { Card } from "@/components/ui/card";

interface TechnicalObservationsProps {
  observations: string[];
}

const TechnicalObservations = ({ observations }: TechnicalObservationsProps) => {
  if (!observations?.length) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground text-center">
          No technical observations available
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {observations.map((observation, index) => (
          <Card key={index} className="p-4 bg-background/50">
            <p className="text-sm text-muted-foreground">{observation}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TechnicalObservations;