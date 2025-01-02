import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PromptEditor from "./PromptEditor";
import PromptHistoryTable from "./PromptHistoryTable";
import UserManagementTable from "./UserManagementTable";

interface AdminTabsProps {
  analysisPrompt: string;
  trendsPrompt: string;
  promptHistory: any[];
  isLoading: boolean;
  onAnalysisPromptChange: (value: string) => void;
  onTrendsPromptChange: (value: string) => void;
  onSave: (type: 'analysis' | 'trends') => void;
}

const AdminTabs = ({
  analysisPrompt,
  trendsPrompt,
  promptHistory,
  isLoading,
  onAnalysisPromptChange,
  onTrendsPromptChange,
  onSave,
}: AdminTabsProps) => {
  return (
    <Tabs defaultValue="analysis" className="w-full">
      <TabsList className="mb-4 w-full flex h-auto flex-wrap gap-2 bg-transparent border-b border-border/50">
        <TabsTrigger value="analysis" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          Analysis Prompt
        </TabsTrigger>
        <TabsTrigger value="trends" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          Trends Prompt
        </TabsTrigger>
        <TabsTrigger value="history" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          Change History
        </TabsTrigger>
        <TabsTrigger value="users" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          User Management
        </TabsTrigger>
      </TabsList>
      
      <div className="overflow-x-auto">
        <TabsContent value="analysis">
          <PromptEditor
            value={analysisPrompt}
            onChange={onAnalysisPromptChange}
            onSave={() => onSave('analysis')}
            isLoading={isLoading}
            type="analysis"
          />
        </TabsContent>

        <TabsContent value="trends">
          <PromptEditor
            value={trendsPrompt}
            onChange={onTrendsPromptChange}
            onSave={() => onSave('trends')}
            isLoading={isLoading}
            type="trends"
          />
        </TabsContent>

        <TabsContent value="history">
          <PromptHistoryTable history={promptHistory} />
        </TabsContent>

        <TabsContent value="users">
          <UserManagementTable />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AdminTabs;