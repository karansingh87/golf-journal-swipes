import { motion } from "framer-motion";

interface RecordingTimerProps {
  recordingTime: number;
}

const RecordingTimer = ({ recordingTime }: RecordingTimerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="font-mono text-4xl font-bold text-golf-green tracking-wider"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ 
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {formatTime(recordingTime)}
    </motion.div>
  );
};

export default RecordingTimer;