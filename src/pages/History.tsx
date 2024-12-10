import RecordingHistory from "@/components/RecordingHistory";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recorder
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Recording History</h1>
        </div>
        <RecordingHistory />
      </div>
    </div>
  );
};

export default History;