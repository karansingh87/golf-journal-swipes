interface KeyThoughts {
  type: "key_thoughts";
  content: string[];
}

interface KeyRemindersSectionProps {
  items: KeyThoughts;
}

const KeyRemindersSection = ({ items }: KeyRemindersSectionProps) => {
  return (
    <>
      {items.content.map((content, index) => (
        <div key={index} className="space-y-1">
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      ))}
    </>
  );
};

export default KeyRemindersSection;