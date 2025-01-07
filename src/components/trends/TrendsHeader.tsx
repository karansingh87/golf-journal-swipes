import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TrendsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-start mb-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => navigate('/playbook')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-golf-gray-text-primary">
            Trends
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TrendsHeader;