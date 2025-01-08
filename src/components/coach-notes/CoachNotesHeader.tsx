import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";

interface CoachNotesHeaderProps {
  lastUpdateTime: Date | null;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

const CoachNotesHeader = ({ lastUpdateTime, onRefresh, isLoading }: CoachNotesHeaderProps) => {
  return <PageBreadcrumb currentPage="Coach Notes" />;
};

export default CoachNotesHeader;