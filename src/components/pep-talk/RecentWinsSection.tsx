interface RecentWin {
  moment: string;
  take_forward: string;
}

interface RecentWinsSectionProps {
  items: RecentWin[];
}

const RecentWinsSection = ({ items }: RecentWinsSectionProps) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">{item.moment}</h3>
          <p className="text-sm text-muted-foreground ml-4">{item.take_forward}</p>
        </div>
      ))}
    </>
  );
};

export default RecentWinsSection;