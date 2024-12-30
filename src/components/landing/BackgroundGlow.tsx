const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary bloom */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          top: '25%',
          right: '25%',
          background: 'radial-gradient(circle, rgba(172,229,128,0.25) 0%, rgba(172,229,128,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Secondary bloom */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          bottom: '25%',
          left: '25%',
          background: 'radial-gradient(circle, rgba(172,229,128,0.2) 0%, rgba(172,229,128,0) 70%)',
          filter: 'blur(50px)',
        }}
      />
      
      {/* Tertiary bloom */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          top: '50%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(172,229,128,0.15) 0%, rgba(172,229,128,0) 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Dark background */}
      <div className="absolute inset-0 bg-zinc-900" style={{ zIndex: -1 }} />
    </div>
  );
};

export default BackgroundGlow;