interface KeyReminder {
  thought: string;
  why_it_works: string;
}

interface KeyRemindersSectionProps {
  items: KeyReminder[];
}

const KeyRemindersSection = ({ items }: KeyRemindersSectionProps) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">{item.thought}</h3>
          <p className="text-sm text-muted-foreground ml-4">{item.why_it_works}</p>
        </div>
      ))}
    </>
  );
};

export default KeyRemindersSection;