interface KeyRemindersSectionProps {
  content: string[];
}

const KeyRemindersSection = ({ content = [] }: KeyRemindersSectionProps) => {
  return (
    <ul className="list-disc list-inside space-y-2 pl-2">
      {content.map((item, index) => (
        <li key={index} className="text-sm text-muted-foreground">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default KeyRemindersSection;