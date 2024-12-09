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
      className={`w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 cursor-grab active:cursor-grabbing touch-manipulation
                  ${isDragging ? 'rotate-3 scale-105' : 'rotate-0 scale-100'}
                  transition-all duration-200 ease-out`}
    >
      <p className="text-golf-gray text-base md:text-lg font-medium text-center">{content}</p>
    </motion.div>
  );
};

export default SwipeableCard;