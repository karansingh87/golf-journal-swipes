import { CheckCircle2, Circle } from 'lucide-react';
import InsightCard from './InsightCard';
import { ClipboardList } from 'lucide-react';

interface ActionItem {
  text: string;
  completed?: boolean;
}

interface ActionItemsProps {
  items: ActionItem[];
}

const ActionItems = ({ items }: ActionItemsProps) => {
  if (!items?.length) return null;

  return (
    <InsightCard title="Action Items" icon={ClipboardList}>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            {item.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
            <span className="text-sm text-muted-foreground">{item.text}</span>
          </li>
        ))}
      </ul>
    </InsightCard>
  );
};

export default ActionItems;