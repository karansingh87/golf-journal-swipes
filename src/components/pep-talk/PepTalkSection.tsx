import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PepTalkSectionProps {
  title: string;
  children: React.ReactNode;
}

const PepTalkSection = ({ title, children }: PepTalkSectionProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default PepTalkSection;