const AppShowcase = () => {
  return (
    <div className="relative py-16 overflow-hidden bg-white/80 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl">
        {/* App Screenshots with floating animation */}
        <div className="relative flex justify-center animate-float" style={{ animationDelay: '1s' }}>
          <img
            src="/lovable-uploads/6f903e05-c3a9-4edb-8b2d-713d4a0ca4cb.png"
            alt="GolfLog App Interface"
            className="w-full max-w-[900px] h-auto rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-[1.02]"
          />
          
          {/* Animated gradient effects */}
          <div className="absolute -left-4 -top-4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl gradient-blob" />
          <div className="absolute -right-4 -bottom-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl gradient-blob" 
               style={{ animationDelay: '-3s' }} />
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;