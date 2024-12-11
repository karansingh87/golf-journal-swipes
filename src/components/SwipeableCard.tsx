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
      className={`w-full bg-black/40 backdrop-blur-sm rounded-xl
                  border border-green-500/20 p-6 cursor-grab active:cursor-grabbing 
                  touch-manipulation transition-shadow duration-200
                  hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]
                  relative`}
    >
      <div className="absolute inset-0 rounded-xl bg-green-400/5 blur-xl" />
      <p className="text-green-400 text-lg md:text-xl font-medium text-center leading-relaxed relative">
        {content}
      </p>
    </motion.div>
  );
};

export default SwipeableCard;