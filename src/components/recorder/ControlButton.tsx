import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  isLarge?: boolean;
  isActive?: boolean;
  isPaused?: boolean;
  className?: string;
}

const ControlButton = ({ 
  icon: Icon, 
  onClick, 
  isLarge = false,
  isActive = false,
  isPaused = false,
  className
}: ControlButtonProps) => {
  const size = isLarge ? 'w-20 h-20 min-w-[80px] min-h-[80px]' : 'w-12 h-12 min-w-[48px] min-h-[48px]';
  const iconSize = isLarge ? 'w-8 h-8' : 'w-5 h-5';
  
  let buttonStyle = '';
  let iconStyle = '';
  
  if (isLarge) {
    // Main record button - always solid green
    buttonStyle = 'bg-golf-green hover:bg-golf-green/90 border-golf-green';
    iconStyle = 'text-white';
  } else {
    // Secondary buttons
    buttonStyle = 'bg-golf-gray-light hover:bg-golf-gray-card border-golf-gray-card';
    iconStyle = 'text-golf-gray-text-primary';
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative z-10 rounded-full flex items-center justify-center border transition-all duration-200 touch-manipulation shadow-md hover:shadow-lg",
        size,
        buttonStyle,
        className
      )}
    >
      <Icon className={`relative z-20 ${iconSize} ${iconStyle}`} />
    </button>
  );
};

export default ControlButton;