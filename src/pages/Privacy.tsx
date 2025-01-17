import PageBreadcrumb from "@/components/shared/PageBreadcrumb";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <div className="relative pt-14">
        <PageBreadcrumb currentPage="Privacy Policy" />
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display tracking-tight text-zinc-900">
                Your Privacy Matters
              </h1>
              <p className="mt-2 text-zinc-500 text-sm">Last updated: January 16, 2025</p>
            </div>

            <div className="prose prose-zinc max-w-none">
              <p className="lead">
                At GolfLog, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "Voice recordings & transcriptions from your golf sessions",
                  "Account information (email, name, location)",
                  "Usage data to enhance GolfLog's features",
                  "Performance metrics & progress tracking data"
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "Provide personalized golf insights & analysis",
                  "Improve AI and pattern recognition capabilities",
                  "Enable sharing with coaches when you choose",
                  "Maintain and enhance GolfLog's functionality"
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">AI Processing</h2>
              <p className="text-zinc-600 mb-4">
                GolfLog uses AI to analyze your insights and deliver personalized feedback.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "Your personal data is never used for external AI training or sold to third parties.",
                  "Only anonymized, aggregated data is used to improve our AI models."
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Data Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "End-to-end encryption safeguards your data.",
                  "Strict access controls ensure only you can access your insights.",
                  "Secure cloud storage prevents unauthorized access."
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-zinc-600">Data is retained as long as your account is active.</li>
                <li className="text-zinc-600">If you request deletion, your data will be permanently removed within 30 days.</li>
                <li className="text-zinc-600">Certain data may be retained for legal or operational reasons (e.g., billing records).</li>
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Third Party Services</h2>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "Voice transcription",
                  "AI analysis",
                  "Cloud storage",
                  "Payment processing"
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-zinc-600">You have the right to access your personal data.</li>
                <li className="text-zinc-600">You have the right to correct inaccurate data.</li>
                <li className="text-zinc-600">You have the right to request deletion of your data.</li>
                <li className="text-zinc-600">You have the right to export your data.</li>
                <li className="text-zinc-600">You have the right to opt-out of specific data uses.</li>
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Contact Information</h2>
              <p className="text-zinc-600">
                For privacy-related inquiries, please contact us at:{" "}
                <a href="mailto:privacy@golflog.ai" className="text-zinc-900 hover:underline">
                  privacy@golflog.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;