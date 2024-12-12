import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

interface SwipeableCardProps {
  content: string;
  onSwipe: () => void;
}

const SwipeableCard = ({ content, onSwipe }: SwipeableCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

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
      className="w-full rounded-xl cursor-grab active:cursor-grabbing 
                touch-manipulation transition-all duration-300
                bg-white/80 backdrop-blur-sm border border-golf-green/10
                p-6 relative hover:bg-white/90"
    >
      <p className="text-lg md:text-xl font-medium text-center leading-relaxed text-golf-gray-text-primary">
        {content}
      </p>
    </motion.div>
  );
};

export default SwipeableCard;