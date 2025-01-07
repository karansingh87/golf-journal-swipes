import { Card } from "@/components/ui/card";

interface ProgressNotesProps {
  notes: string[];
}

const ProgressNotes = ({ notes }: ProgressNotesProps) => {
  if (!notes?.length) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground text-center">
          No progress notes available
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {notes.map((note, index) => (
          <Card key={index} className="p-4 bg-background/50">
            <p className="text-sm text-muted-foreground">{note}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgressNotes;