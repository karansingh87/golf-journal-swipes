import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OnboardingQuestionProps {
  title: string;
  type: "text" | "radio";
  options?: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}

const OnboardingQuestion = ({
  title,
  type,
  options = [],
  value,
  onChange,
}: OnboardingQuestionProps) => {
  if (type === "text") {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your name"
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-3"
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 ${
              value === option.value
                ? "border-black"
                : "border-gray-200"
            }`}
            onClick={() => onChange(option.value)}
          >
            <RadioGroupItem value={option.value} id={option.value} />
            <Label
              htmlFor={option.value}
              className="flex-grow cursor-pointer"
            >
              {option.label}
            </Label>
            {value === option.value && (
              <Check className="h-5 w-5 text-black" />
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default OnboardingQuestion;