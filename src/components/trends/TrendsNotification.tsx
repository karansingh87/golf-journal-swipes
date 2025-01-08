import { BellDot } from "lucide-react";

interface TrendsNotificationProps {
  show: boolean;
}

const TrendsNotification = ({ show }: TrendsNotificationProps) => {
  if (!show) return null;

  return (
    <div className="absolute top-4 right-4">
      <BellDot className="w-5 h-5 text-destructive animate-pulse" strokeWidth={2.5} />
    </div>
  );
};

export default TrendsNotification;