import { usePromptConfig } from "./admin/usePromptConfig";
import AdminTabs from "./admin/AdminTabs";

const AdminPromptPanel = () => {
  const {
    analysisPrompt,
    trendsPrompt,
    coachingPrompt,
    modelProvider,
    modelName,
    promptHistory,
    isLoading,
    setAnalysisPrompt,
    setTrendsPrompt,
    setCoachingPrompt,
    setModelProvider,
    setModelName,
    handleSave,
  } = usePromptConfig();

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">Admin Panel - GPT Prompt Configuration</h2>
      
      <AdminTabs
        analysisPrompt={analysisPrompt}
        trendsPrompt={trendsPrompt}
        coachingPrompt={coachingPrompt}
        modelProvider={modelProvider}
        modelName={modelName}
        promptHistory={promptHistory}
        isLoading={isLoading}
        onAnalysisPromptChange={setAnalysisPrompt}
        onTrendsPromptChange={setTrendsPrompt}
        onCoachingPromptChange={setCoachingPrompt}
        onModelProviderChange={setModelProvider}
        onModelNameChange={setModelName}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminPromptPanel;