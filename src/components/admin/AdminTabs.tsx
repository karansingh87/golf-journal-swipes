import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PromptEditor from "./PromptEditor";
import PromptHistoryTable from "./PromptHistoryTable";
import UserManagementTable from "./UserManagementTable";
import ModelConfig from "./ModelConfig";
import ColorConfigTab from "./ColorConfigTab";

interface AdminTabsProps {
  analysisPrompt: string;
  trendsPrompt: string;
  coachingPrompt: string;
  promptHistory: any[];
  isLoading: boolean;
  modelProvider: string;
  modelName: string;
  onAnalysisPromptChange: (value: string) => void;
  onTrendsPromptChange: (value: string) => void;
  onCoachingPromptChange: (value: string) => void;
  onSave: (type: 'analysis' | 'trends' | 'model' | 'coaching') => void;
  onModelProviderChange: (value: string) => void;
  onModelNameChange: (value: string) => void;
}

const AdminTabs = ({
  analysisPrompt,
  trendsPrompt,
  coachingPrompt,
  promptHistory,
  isLoading,
  modelProvider,
  modelName,
  onAnalysisPromptChange,
  onTrendsPromptChange,
  onCoachingPromptChange,
  onSave,
  onModelProviderChange,
  onModelNameChange,
}: AdminTabsProps) => {
  const { toast } = useToast();

  const handleSyncStripeSubscriptions = async () => {
    try {
      const response = await fetch('/functions/v1/sync-stripe-subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to sync subscriptions');
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: "Stripe subscriptions synced successfully",
      });
    } catch (error) {
      console.error('Error syncing subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to sync Stripe subscriptions",
        variant: "destructive",
      });
    }
  };

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
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button 
                onClick={handleSyncStripeSubscriptions}
                className="mb-4"
              >
                Sync Stripe Subscriptions
              </Button>
            </div>
            <UserManagementTable />
          </div>
        </TabsContent>

        <TabsContent value="colors">
          <ColorConfigTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AdminTabs;