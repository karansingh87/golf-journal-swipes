const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <div className="container max-w-4xl mx-auto px-4 py-16 relative">
        <h1 className="text-4xl font-display tracking-tight text-zinc-900 text-center mb-16">
          Support
        </h1>
        <div className="space-y-20">
          <FAQSection />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Support;