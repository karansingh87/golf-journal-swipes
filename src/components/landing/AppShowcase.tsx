const AppShowcase = () => {
  return (
    <div className="relative py-16 overflow-hidden bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        {/* App Screenshots */}
        <div className="relative flex justify-center">
          <img
            src="/lovable-uploads/6f903e05-c3a9-4edb-8b2d-713d4a0ca4cb.png"
            alt="GolfLog App Interface"
            className="w-full max-w-[900px] h-auto rounded-2xl shadow-lg"
          />
          
          {/* Decorative gradient effects */}
          <div className="absolute -left-4 -top-4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute -right-4 -bottom-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;