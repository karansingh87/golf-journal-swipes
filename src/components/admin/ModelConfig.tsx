import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelConfigProps {
  modelProvider: string;
  modelName: string;
  onProviderChange: (value: string) => void;
  onModelNameChange: (value: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const ModelConfig = ({
  modelProvider,
  modelName,
  onProviderChange,
  onModelNameChange,
  onSave,
  isLoading,
}: ModelConfigProps) => {
  const providers = [
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'openai', label: 'OpenAI' },
  ];

  const models = {
    anthropic: [
      { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
      { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
    ],
    openai: [
      { value: 'gpt-4-turbo-preview', label: 'GPT-4 Turbo' },
      { value: 'gpt-4', label: 'GPT-4' },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Model Provider</label>
          <Select value={modelProvider} onValueChange={onProviderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider.value} value={provider.value}>
                  {provider.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>
          <Select value={modelName} onValueChange={onModelNameChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models[modelProvider as keyof typeof models]?.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={onSave} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Model Configuration"}
      </Button>
    </div>
  );
};

export default ModelConfig;