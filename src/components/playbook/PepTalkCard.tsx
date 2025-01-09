import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface PepTalkCardProps {
  onClick: () => void;
}

const PepTalkCard = ({ onClick }: PepTalkCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
        <Sparkles className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-lg font-semibold">Get a Pep Talk</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Generate a quick confidence boost based on your recent recordings
        </p>
        <Button 
          onClick={onClick}
          className="w-full"
        >
          Generate Pep Talk
        </Button>
      </CardContent>
    </Card>
  );
};

export default PepTalkCard;