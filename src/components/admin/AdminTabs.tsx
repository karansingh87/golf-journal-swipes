import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PromptEditor from "./PromptEditor";
import PromptHistoryTable from "./PromptHistoryTable";
import UserManagementTable from "./UserManagementTable";
import ModelConfig from "./ModelConfig";
import ColorConfigTab from "./ColorConfigTab";

interface AdminTabsProps {
  analysisPrompt: string;
  trendsPrompt: string;
  coachingPrompt: string;
  pepTalkPrompt: string;
  promptHistory: any[];
  isLoading: boolean;
  modelProvider: string;
  modelName: string;
  onAnalysisPromptChange: (value: string) => void;
  onTrendsPromptChange: (value: string) => void;
  onCoachingPromptChange: (value: string) => void;
  onPepTalkPromptChange: (value: string) => void;
  onSave: (type: 'analysis' | 'trends' | 'model' | 'coaching' | 'pep_talk') => void;
  onModelProviderChange: (value: string) => void;
  onModelNameChange: (value: string) => void;
}

const AdminTabs = ({
  analysisPrompt,
  trendsPrompt,
  coachingPrompt,
  pepTalkPrompt,
  promptHistory,
  isLoading,
  modelProvider,
  modelName,
  onAnalysisPromptChange,
  onTrendsPromptChange,
  onCoachingPromptChange,
  onPepTalkPromptChange,
  onSave,
  onModelProviderChange,
  onModelNameChange,
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
        <TabsTrigger value="coaching" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          Coaching Prompt
        </TabsTrigger>
        <TabsTrigger value="pep_talk" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          Pep Talk Prompt
        </TabsTrigger>
        <TabsTrigger value="model" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          Model Config
        </TabsTrigger>
        <TabsTrigger value="history" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          Change History
        </TabsTrigger>
        <TabsTrigger value="users" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          User Management
        </TabsTrigger>
        <TabsTrigger value="colors" className="flex-1 sm:flex-none data-[state=active]:border-b-2">
          Colors
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

        <TabsContent value="coaching">
          <PromptEditor
            value={coachingPrompt}
            onChange={onCoachingPromptChange}
            onSave={() => onSave('coaching')}
            isLoading={isLoading}
            type="coaching"
          />
        </TabsContent>

        <TabsContent value="pep_talk">
          <PromptEditor
            value={pepTalkPrompt}
            onChange={onPepTalkPromptChange}
            onSave={() => onSave('pep_talk')}
            isLoading={isLoading}
            type="pep_talk"
          />
        </TabsContent>

        <TabsContent value="model">
          <ModelConfig
            modelProvider={modelProvider}
            modelName={modelName}
            onProviderChange={onModelProviderChange}
            onModelNameChange={onModelNameChange}
            onSave={() => onSave('model')}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="history">
          <PromptHistoryTable history={promptHistory} />
        </TabsContent>

        <TabsContent value="users">
          <UserManagementTable />
        </TabsContent>

        <TabsContent value="colors">
          <ColorConfigTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AdminTabs;