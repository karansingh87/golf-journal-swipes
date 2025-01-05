const AppShowcase = () => {
  return (
    <div className="relative py-16 overflow-hidden bg-white/30 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="relative flex justify-center">
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
