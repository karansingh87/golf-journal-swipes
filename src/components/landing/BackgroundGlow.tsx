const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary bloom */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen"
        style={{
          top: '10%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(172,229,128,0.4) 0%, rgba(172,229,128,0) 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Secondary bloom */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full mix-blend-screen"
        style={{
          bottom: '15%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(172,229,128,0.35) 0%, rgba(172,229,128,0) 70%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Tertiary bloom */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full mix-blend-screen"
        style={{
          top: '40%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(172,229,128,0.3) 0%, rgba(172,229,128,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Dark background */}
      <div className="absolute inset-0 bg-zinc-900" style={{ zIndex: -1 }} />
    </div>
  );
};

export default BackgroundGlow;