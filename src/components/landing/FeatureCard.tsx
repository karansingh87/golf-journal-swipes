import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="rounded-full bg-zinc-100 p-3">
          <Icon className="w-6 h-6 text-zinc-900" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-zinc-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;