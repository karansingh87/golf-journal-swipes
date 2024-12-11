import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { useTheme } from "next-themes";

interface SwipeableCardProps {
  content: string;
  onSwipe: () => void;
}

const SwipeableCard = ({ content, onSwipe }: SwipeableCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { theme } = useTheme();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        handleDragEnd(event, info);
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: isDragging ? 1.02 : 1,
        opacity: 1
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className={`w-full rounded-xl cursor-grab active:cursor-grabbing 
                  touch-manipulation transition-all duration-300
                  ${theme === 'dark' 
                    ? 'bg-black/40 backdrop-blur-sm border border-green-500/20 shadow-card-dark hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]'
                    : 'bg-white border border-golf-sand shadow-card-light hover:shadow-lg'
                  }
                  p-6 relative`}
    >
      <p className={`text-lg md:text-xl font-medium text-center leading-relaxed
                    ${theme === 'dark' ? 'text-green-400' : 'text-golf-gray'}`}>
        {content}
      </p>
    </motion.div>
  );
};

export default SwipeableCard;