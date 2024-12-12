import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ControlButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  isLarge?: boolean;
  isActive?: boolean;
  isPaused?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "default" | "large";
  className?: string;
}

const ControlButton = ({ 
  icon: Icon, 
  onClick, 
  isLarge = false,
  isActive = false,
  isPaused = false,
  variant = "primary",
  size = "default",
  className
}: ControlButtonProps) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    default: 'w-12 h-12',
    large: 'w-20 h-20'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-8 h-8'
  };
  
  const buttonSize = isLarge ? sizeClasses.large : sizeClasses[size];
  const iconSize = isLarge ? iconSizes.large : iconSizes[size];
  
  const baseStyles = cn(
    "relative z-10 rounded-full flex items-center justify-center transition-all duration-200",
    "touch-manipulation focus:outline-none focus:ring-2 focus:ring-golf-green/20",
    buttonSize,
    {
      "bg-golf-green text-white hover:bg-golf-green/90": variant === "primary" && isActive && !isPaused,
      "border-2 border-golf-green text-golf-green hover:bg-golf-green/10": variant === "primary" && (!isActive || isPaused),
      "bg-golf-gray-light hover:bg-golf-gray-card text-golf-gray-text-primary": variant === "secondary",
    },
    className
  );

  return (
    <motion.button
      onClick={onClick}
      className={baseStyles}
      whileTap={{ scale: 0.95 }}
      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.2 }}
    >
      <Icon className={cn("relative z-20", iconSize)} />
      {isActive && !isPaused && variant === "primary" && (
        <div className="absolute inset-0 bg-golf-green/20 rounded-full animate-pulse" />
      )}
    </motion.button>
  );
};

export default ControlButton;