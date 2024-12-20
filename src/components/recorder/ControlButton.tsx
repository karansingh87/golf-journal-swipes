import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ControlButtonProps {
  icon?: LucideIcon;
  text?: string;
  onClick: () => void;
  isLarge?: boolean;
  isActive?: boolean;
  isPaused?: boolean;
  variant?: "primary" | "secondary" | "dark";
  size?: "small" | "medium" | "default" | "large";
  className?: string;
}

const ControlButton = ({ 
  icon: Icon, 
  text,
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
    medium: 'w-12 h-12',
    default: 'w-14 h-14',
    large: 'w-24 h-24'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    default: 'w-6 h-6',
    large: 'w-10 h-10'
  };
  
  const buttonSize = isLarge ? sizeClasses.large : sizeClasses[size];
  const iconSize = isLarge ? iconSizes.large : iconSizes[size];
  
  const baseStyles = cn(
    "relative z-10 rounded-full flex items-center justify-center transition-all duration-200",
    "touch-manipulation focus:outline-none focus:ring-2 focus:ring-zinc-950/20",
    buttonSize,
    {
      "bg-zinc-950 text-white hover:bg-zinc-900": variant === "dark" || (variant === "primary" && isActive && !isPaused),
      "border-2 border-zinc-950 text-zinc-950 hover:bg-zinc-950/10": variant === "primary" && (!isActive || isPaused),
      "bg-zinc-700 hover:bg-zinc-600 text-white": variant === "secondary",
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
      {Icon && <Icon className={cn("relative z-20", iconSize)} />}
      {text && <span className="relative z-20 text-sm font-medium">{text}</span>}
      {isActive && !isPaused && variant === "primary" && (
        <div className="absolute inset-0 bg-zinc-950/20 rounded-full animate-pulse" />
      )}
    </motion.button>
  );
};

export default ControlButton;