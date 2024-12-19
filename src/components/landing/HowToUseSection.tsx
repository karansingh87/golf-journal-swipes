import { motion } from "framer-motion";

const HowToUseSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 py-24">
      {/* Background glow effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ACE580]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with glowing line decorations */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#ACE580]/50 to-transparent" />
          <h2 className="text-lg font-medium text-[#ACE580]/80">How to Use</h2>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#ACE580]/50 to-transparent" />
        </div>

        {/* Main title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center text-white mb-6"
        >
          Easy to Use
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-center text-zinc-300 max-w-3xl mx-auto mb-16"
        >
          Record your golf thoughts instantly and let AI reveal the patterns in your game that lead to better scores
        </motion.p>

        {/* Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Card background with gradient border */}
          <div className="rounded-2xl overflow-hidden p-px bg-gradient-to-b from-zinc-800 to-transparent">
            <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-8">
              {/* Content */}
              <div className="text-center space-y-6">
                <h3 className="text-lg font-medium text-zinc-200 mb-8">Record with</h3>
                
                {/* Social login buttons */}
                <div className="flex justify-center gap-4 mb-8">
                  <button className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.1 12.2c0-.8-.1-1.6-.2-2.4H12v4.5h5.7c-.2 1.3-1 2.4-2 3.1v2.6h3.2c1.9-1.7 3-4.2 3-7.8z"/>
                      <path d="M12 22.9c2.7 0 4.9-.9 6.5-2.4l-3.2-2.6c-.9.6-2 1-3.3 1-2.6 0-4.7-1.7-5.5-4h-3.3v2.7c1.6 3.2 5 5.3 8.8 5.3z"/>
                      <path d="M6.5 14.9c-.2-.6-.3-1.2-.3-1.9 0-.7.1-1.3.3-1.9V8.4H3.2C2.4 9.5 2 10.7 2 12s.4 2.5 1.2 3.6l3.3-2.7z"/>
                      <path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3 14.7 2 12 2 8.2 2 4.8 4.1 3.2 7.3l3.3 2.7c.8-2.3 2.9-4.1 5.5-4.1z"/>
                    </svg>
                  </button>
                </div>

                <div className="text-sm text-zinc-400">or</div>

                {/* Form fields */}
                <div className="space-y-4 max-w-sm mx-auto">
                  <div>
                    <label className="block text-left text-sm font-medium text-zinc-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your full name"
                      className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ACE580]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium text-zinc-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="Your email address"
                      className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ACE580]/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative gradient lines */}
          <div className="absolute -bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ACE580]/30 to-transparent" />
        </motion.div>

        {/* Section number */}
        <div className="mt-16 flex justify-start">
          <div className="text-4xl font-bold text-[#ACE580]/20">/1</div>
        </div>

        {/* Fast sign-up text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-4"
        >
          <h3 className="text-3xl font-bold text-white">Fast Sign-up</h3>
          <p className="text-xl text-zinc-400">
            You can join our platform faster with Social Account
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;