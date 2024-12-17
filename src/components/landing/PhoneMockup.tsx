import { motion } from "framer-motion";

const PhoneMockup = () => {
  return (
    <div className="relative w-full max-w-[600px] mx-auto mt-24 px-6">
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex justify-center items-center"
      >
        <div className="flex justify-center -space-x-[80px] md:-space-x-[100px]">
          {/* Left Phone */}
          <div className="relative w-[160px] md:w-[180px] h-auto transform rotate-[-12deg] z-10">
            <div className="rounded-[40px] bg-black p-3 shadow-2xl">
              <div className="rounded-[32px] overflow-hidden bg-white">
                <img 
                  src="/placeholder.svg" 
                  alt="Golf app screen" 
                  className="w-full aspect-[9/19.5]"
                />
              </div>
            </div>
          </div>
          
          {/* Center Phone */}
          <div className="relative w-[160px] md:w-[180px] h-auto z-20">
            <div className="rounded-[40px] bg-black p-3 shadow-2xl">
              <div className="rounded-[32px] overflow-hidden bg-white">
                <img 
                  src="/placeholder.svg" 
                  alt="Golf app screen" 
                  className="w-full aspect-[9/19.5]"
                />
              </div>
            </div>
          </div>
          
          {/* Right Phone */}
          <div className="relative w-[160px] md:w-[180px] h-auto transform rotate-[12deg] z-10">
            <div className="rounded-[40px] bg-black p-3 shadow-2xl">
              <div className="rounded-[32px] overflow-hidden bg-white">
                <img 
                  src="/placeholder.svg" 
                  alt="Golf app screen" 
                  className="w-full aspect-[9/19.5]"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PhoneMockup;