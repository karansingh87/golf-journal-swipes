interface ScoringZones {
  type: "scoring_zones";
  content: string[];
}

interface ScoringZonesSectionProps {
  items: ScoringZones;
}

const ScoringZonesSection = ({ items }: ScoringZonesSectionProps) => {
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

export default ScoringZonesSection;