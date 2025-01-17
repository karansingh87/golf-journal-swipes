import PageBreadcrumb from "@/components/shared/PageBreadcrumb";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <div className="relative pt-14">
        <PageBreadcrumb currentPage="Terms of Service" />
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display tracking-tight text-zinc-900">
                Terms of Service
              </h1>
              <p className="mt-2 text-zinc-500 text-sm">Last updated: January 16, 2025</p>
            </div>

            <div className="prose prose-zinc max-w-none">
              <p className="lead">
                By accessing or using GolfLog, you agree to these Terms of Service and our Privacy Policy.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "Maintain confidentiality of your account credentials.",
                  "Use the service legally and ethically.",
                  "Respect other users' privacy when sharing insights.",
                  "Provide accurate information in your recordings and profile."
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Subscription and Billing</h2>
              <h3 className="text-lg font-medium text-zinc-800 mt-6 mb-3">Pro Subscriptions</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-zinc-600">Billed monthly or annually.</li>
                <li className="text-zinc-600">You can cancel anytime, but no refunds are issued for partial subscription periods.</li>
                <li className="text-zinc-600">If you cancel, you retain access until the end of the billing cycle.</li>
              </ul>

              <h3 className="text-lg font-medium text-zinc-800 mt-6 mb-3">Free Tier Limitations</h3>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "Basic recording features only",
                  "Limited storage",
                  "Basic AI insights",
                  "Standard support"
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-medium text-zinc-800 mt-6 mb-3">Pro Tier Benefits</h3>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "Unlimited recordings",
                  "Advanced AI analysis & trend tracking",
                  "Coach collaboration tools",
                  "Priority support"
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Content Ownership</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-zinc-600">You own your personal recordings and insights.</li>
                <li className="text-zinc-600">GolfLog may use aggregated, anonymized data to improve AI models.</li>
                <li className="text-zinc-600">We never sell your personal data.</li>
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Data Privacy and Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "GolfLog uses end-to-end encryption to protect your data.",
                  "Your insights are private by default unless explicitly shared."
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Refund Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-zinc-600">No prorated refunds are issued for mid-cycle cancellations.</li>
                <li className="text-zinc-600">If you cancel, you will retain access until the end of the billing period.</li>
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Termination of Service</h2>
              <p className="text-zinc-600 mb-2">We may terminate service for:</p>
              <ul className="list-disc pl-6 space-y-2">
                {[
                  "Violation of terms",
                  "Misuse of AI features",
                  "Unauthorized data extraction"
                ].map((item, index) => (
                  <li key={index} className="text-zinc-600">{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Liability and Dispute Resolution</h2>
              <p className="text-zinc-600 mb-4">
                GolfLog is not responsible for data loss, AI errors, or decisions based on AI-generated insights.
              </p>
              <p className="text-zinc-600">
                Disputes will be resolved through binding arbitration in California, United States.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Governing Law</h2>
              <p className="text-zinc-600">
                These Terms are governed by the laws of the State of California, United States.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Changes to Terms</h2>
              <p className="text-zinc-600">
                We may update these terms at any time. Material changes will be communicated via email or in-app notifications.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Contact Information</h2>
              <p className="text-zinc-600">
                For support inquiries, please contact us at:{" "}
                <a href="mailto:support@golflog.ai" className="text-zinc-900 hover:underline">
                  support@golflog.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;