import RecordingHistory from "@/components/RecordingHistory";

const History = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Recording History</h1>
        <RecordingHistory />
      </div>
    </div>
  );
};

export default History;