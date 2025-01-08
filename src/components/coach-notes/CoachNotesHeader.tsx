import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CoachNotesHeaderProps {
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

const CoachNotesHeader = ({ onRefresh, isLoading }: CoachNotesHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-1.5 pt-2">
      <div className="flex flex-col px-4 py-2.5">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 -ml-3 hover:bg-zinc-50"
            onClick={() => navigate('/playbook')}
          >
            <ArrowLeft className="h-5 w-5 text-zinc-900" />
          </Button>
          <h1 className="font-inter text-lg font-semibold tracking-tight text-zinc-700">
            COACH NOTES
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CoachNotesHeader;