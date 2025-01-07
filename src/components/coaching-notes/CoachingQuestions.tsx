import { Card } from "@/components/ui/card";

interface CoachingQuestionsProps {
  questions: string[];
}

const CoachingQuestions = ({ questions }: CoachingQuestionsProps) => {
  if (!questions?.length) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground text-center">
          No coaching questions available
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={index} className="p-4 bg-background/50">
            <p className="text-sm text-muted-foreground">{question}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoachingQuestions;