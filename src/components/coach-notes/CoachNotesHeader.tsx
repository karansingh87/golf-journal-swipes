import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CoachNotesHeaderProps {
  lastUpdateTime: Date | null;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

const CoachNotesHeader = ({ lastUpdateTime, onRefresh, isLoading }: CoachNotesHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="border-b border-zinc-100">
      <div className="px-7 py-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={() => navigate('/playbook')}
              className="text-base font-medium text-zinc-500 hover:text-zinc-900 cursor-pointer"
            >
              Playbook
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-base font-medium text-zinc-900">
              Coach Notes
            </BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default CoachNotesHeader;