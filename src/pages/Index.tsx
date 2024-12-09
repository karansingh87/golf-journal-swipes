import { motion } from "framer-motion";
import CardDeck from "../components/CardDeck";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-golf-green to-golf-accent">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-golf-white mb-4">
            Golf Journal
          </h1>
          <p className="text-xl text-golf-sand">
            Improve your game, one swing at a time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <CardDeck />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;