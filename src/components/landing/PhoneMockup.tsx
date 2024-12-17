import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mic } from "lucide-react";

const screens = [
  {
    id: 1,
    image: "/lovable-uploads/6e27a5bc-120a-4369-aa38-a4d62af73c6a.png",
    alt: "Golf app recording interface",
    feature: {
      title: "Voice Recording",
      description: "Simply tap and speak to capture your post-round thoughts",
      icon: Mic
    }
  },
  {
    id: 2,
    image: "/placeholder.svg",
    alt: "Golf app recording screen"
  },
  {
    id: 3,
    image: "/placeholder.svg",
    alt: "Golf app insights screen"
  }
];

const PhoneMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const currentIndex = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 2]);

  return (
    <div className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div ref={containerRef} className="relative w-full max-w-[400px] mx-auto px-6">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-[280px]">
              {/* Phone Frame */}
              <div className="relative rounded-[50px] bg-black p-3 shadow-2xl">
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-20" />
                
                {/* Screen Content */}
                <div className="relative rounded-[40px] overflow-hidden bg-white aspect-[9/19.5]">
                  {/* Add padding top to account for Dynamic Island */}
                  <div className="absolute inset-0 pt-[35px]">
                    {screens.map((screen, index) => (
                      <motion.div
                        key={screen.id}
                        className="absolute inset-0 w-full h-full"
                        style={{
                          opacity: useTransform(
                            currentIndex,
                            index === 0 ? [0, 0.3, 0.7] : [index - 0.3, index, index + 0.3],
                            [1, 1, 0]
                          )
                        }}
                      >
                        <img 
                          src={screen.image}
                          alt={screen.alt}
                          className="w-full h-full object-contain"
                        />
                        
                        {/* Feature Overlay */}
                        {screen.feature && (
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              opacity: useTransform(
                                currentIndex,
                                [0, 0.2, 0.4],
                                [0, 1, 0]
                              )
                            }}
                          >
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg mx-4">
                              <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center">
                                  <screen.feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-zinc-900">
                                  {screen.feature.title}
                                </h3>
                                <p className="text-sm text-zinc-600">
                                  {screen.feature.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;