import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  isLoading: boolean;
  type: 'analysis' | 'insights';
}

const PromptEditor = ({ value, onChange, onSave, isLoading, type }: PromptEditorProps) => {
  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[300px] mb-4 font-mono text-sm"
        placeholder={`Enter the GPT ${type} prompt configuration...`}
      />
      <Button 
        onClick={onSave}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : `Save ${type.charAt(0).toUpperCase() + type.slice(1)} Prompt`}
      </Button>
    </>
  );
};

export default PromptEditor;