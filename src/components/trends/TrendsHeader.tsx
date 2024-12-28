import { Button } from "@/components/ui/button";

interface TrendsHeaderProps {
  onGenerateTrends: () => void;
  generating: boolean;
}

const TrendsHeader = ({ onGenerateTrends, generating }: TrendsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-foreground">Trends</h1>
      <Button 
        onClick={onGenerateTrends} 
        disabled={generating}
        variant="outline"
      >
        {generating ? "Generating..." : "Generate Trends"}
      </Button>
    </div>
  );
};

export default TrendsHeader;