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
      className={`w-full bg-black/70 backdrop-blur-sm rounded-xl shadow-lg 
                  border border-green-500/20 p-6 cursor-grab active:cursor-grabbing 
                  touch-manipulation hover:shadow-green-400/5 hover:border-green-500/30
                  ${isDragging ? 'rotate-3 scale-105' : 'rotate-0 scale-100'}
                  transition-all duration-200 ease-out`}
      style={{
        boxShadow: "0 4px 20px rgba(0, 255, 0, 0.1)",
      }}
    >
      <p className="text-green-400 text-lg md:text-xl font-medium text-center leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
};

export default SwipeableCard;