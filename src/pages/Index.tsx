import { motion } from "framer-motion";
import VoiceRecorder from "../components/VoiceRecorder";
import CardDeck from "../components/CardDeck";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-8 md:mb-16"
        >
          <VoiceRecorder />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <CardDeck />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;