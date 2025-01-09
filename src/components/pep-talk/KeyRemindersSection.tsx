interface KeyThoughts {
  type: "key_thoughts";
  content: string[];
}

interface KeyRemindersSectionProps {
  items: KeyThoughts;
}

const KeyRemindersSection = ({ items }: KeyRemindersSectionProps) => {
  if (!items || !items.content) {
    return null;
  }

  return (
    <div className="space-y-4">
      {items.content.map((content, index) => (
        <div key={index} className="space-y-2">
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyRemindersSection;