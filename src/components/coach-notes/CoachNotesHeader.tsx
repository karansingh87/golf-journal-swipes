import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CoachNotesHeaderProps {
  lastUpdateTime: Date | null;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

const CoachNotesHeader = ({ lastUpdateTime, onRefresh, isLoading }: CoachNotesHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="border-b border-zinc-100">
      <div className="flex flex-col px-7 py-2.5">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 -ml-2.5 hover:bg-zinc-50"
            onClick={() => navigate('/playbook')}
          >
            <ArrowLeft className="h-5 w-5 text-zinc-900" />
          </Button>
          <h1 className="font-sans text-base font-semibold tracking-tight text-zinc-900">
            COACH NOTES
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CoachNotesHeader;