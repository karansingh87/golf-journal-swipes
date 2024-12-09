import { motion } from "framer-motion";
import CardDeck from "../components/CardDeck";
import VoiceRecorder from "../components/VoiceRecorder";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-golf-green to-golf-accent">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-6xl font-bold text-golf-white mb-2 md:mb-4">
            Golf Journal
          </h1>
          <p className="text-lg md:text-xl text-golf-sand">
            Record your thoughts and improve your game
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
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