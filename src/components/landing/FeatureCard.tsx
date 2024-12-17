import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useInView } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  index?: number;
}

const FeatureCard = ({ title, description, Icon, index = 0 }: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${index * 0.2}s`
      }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg bg-white">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-[#eee] p-3">
            <Icon className="w-6 h-6 text-zinc-900" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-zinc-600">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureCard;