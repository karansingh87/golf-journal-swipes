import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

interface PageBreadcrumbProps {
  currentPage: string;
}

const PageBreadcrumb = ({ currentPage }: PageBreadcrumbProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="border-b border-zinc-100">
      <div className="px-6 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => navigate('/playbook')}
                className="text-sm font-medium cursor-pointer"
              >
                Playbook
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageBreadcrumb;