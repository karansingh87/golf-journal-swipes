import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const size = isLarge ? 'w-16 h-16 min-w-[64px] min-h-[64px]' : 'w-12 h-12 min-w-[48px] min-h-[48px]';
  const iconSize = isLarge ? 'w-7 h-7' : 'w-5 h-5';
  
  let buttonStyle = '';
  let iconStyle = '';
  
  if (isActive) {
    if (isPaused) {
      buttonStyle = isDark 
        ? 'bg-green-950/30 border-green-500/20 hover:bg-green-900/40'
        : 'bg-golf-sand border-golf-sand hover:bg-golf-sand/80';
      iconStyle = isDark ? 'text-green-400' : 'text-golf-gray';
    } else {
      buttonStyle = isDark
        ? 'bg-golf-green border-golf-green hover:bg-golf-green/90'
        : 'bg-golf-green border-golf-green hover:bg-golf-green/90';
      iconStyle = 'text-white';
    }
  } else {
    buttonStyle = isDark 
      ? 'bg-green-950/30 border-green-500/20 hover:bg-green-900/40'
      : 'bg-golf-sand hover:bg-golf-sand/80 border-golf-sand';
    iconStyle = isDark ? 'text-green-400' : 'text-golf-gray';
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative z-10 rounded-full flex items-center justify-center border transition-all duration-200 touch-manipulation",
        size,
        buttonStyle,
        className
      )}
    >
      {isDark && isLarge && (
        <div className={`absolute inset-0 rounded-full blur-md transition-opacity
          ${isPaused ? 'bg-green-500/20' : 'bg-green-500/40'}`} 
        />
      )}
      <Icon className={`relative z-20 ${iconSize} ${iconStyle}`} />
    </button>
  );
};

export default ControlButton;