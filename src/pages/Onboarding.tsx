import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const questions = [
  {
    title: "What's your handicap?",
    options: [
      { label: "Scratch or better", value: "scratch_or_better" },
      { label: "1-5", value: "1_5" },
      { label: "6-10", value: "6_10" },
      { label: "11-15", value: "11_15" },
      { label: "16-20", value: "16_20" },
      { label: "21-25", value: "21_25" },
      { label: "26+", value: "26_plus" },
      { label: "New to golf", value: "new_to_golf" },
    ],
    key: "handicap_range",
  },
  {
    title: "Do you currently track your golf thoughts/progress?",
    options: [
      { label: "No, I don't track anything", value: "no_tracking" },
      { label: "Sometimes I take mental notes", value: "mental_notes" },
      { label: "Yes, I keep notes on my phone", value: "phone_notes" },
      { label: "Yes, I maintain a dedicated golf journal", value: "dedicated_journal" },
    ],
    key: "tracking_habit",
  },
  {
    title: "Do you work with a golf coach?",
    options: [
      { label: "Yes, regularly", value: "regularly" },
      { label: "Yes, occasionally", value: "occasionally" },
      { label: "No, but I have in the past", value: "past_experience" },
      { label: "No, never have", value: "never" },
    ],
    key: "coaching_frequency",
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentStep];

  const handleNext = async () => {
    if (currentStep === questions.length - 1) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({
            ...answers,
            onboarding_completed: true,
            onboarding_last_step: currentStep + 1,
          })
          .eq("id", session?.user?.id);

        if (error) throw error;

        toast({
          title: "Profile updated",
          description: "Your preferences have been saved successfully.",
        });
        navigate("/record");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save your preferences. Please try again.",
        });
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          onboarding_skipped: true,
          onboarding_last_step: currentStep,
        })
        .eq("id", session?.user?.id);

      if (error) throw error;

      navigate("/record");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate(-1);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Progress indicator */}
        <div className="flex justify-between items-center px-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 mx-1 rounded-full ${
                index <= currentStep ? "bg-black" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={handleBack} className="p-0">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
                Skip for now
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">{currentQuestion.title}</h2>
              
              <RadioGroup
                value={answers[currentQuestion.key]}
                onValueChange={(value) =>
                  setAnswers((prev) => ({ ...prev, [currentQuestion.key]: value }))
                }
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 ${
                      answers[currentQuestion.key] === option.value
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.key]: option.value,
                      }))
                    }
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-grow cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    {answers[currentQuestion.key] === option.value && (
                      <Check className="h-5 w-5 text-black" />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              onClick={handleNext}
              className="w-full mt-6"
              disabled={!answers[currentQuestion.key]}
            >
              {currentStep === questions.length - 1 ? (
                "Complete Setup"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;