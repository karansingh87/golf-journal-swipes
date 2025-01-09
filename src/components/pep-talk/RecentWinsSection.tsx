interface RecentWin {
  shot?: string;
  why?: string;
  zone?: string;
  strategy?: string;
  moment?: string;
  take_forward?: string;
}

interface RecentWinsSectionProps {
  items: RecentWin[];
  type: 'go_to_shots' | 'scoring_zones' | 'confidence_moments';
}

const RecentWinsSection = ({ items = [], type }: RecentWinsSectionProps) => {
  return (
    <>
      {items.map((item, index) => {
        if (type === 'go_to_shots') {
          return (
            <div key={index} className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">{item.shot}</h3>
              <p className="text-sm text-muted-foreground ml-4">{item.why}</p>
            </div>
          );
        }
        if (type === 'scoring_zones') {
          return (
            <div key={index} className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">{item.zone}</h3>
              <p className="text-sm text-muted-foreground ml-4">{item.strategy}</p>
            </div>
          );
        }
        return (
          <div key={index} className="space-y-1">
            <h3 className="text-sm font-medium text-foreground">{item.moment}</h3>
            <p className="text-sm text-muted-foreground ml-4">{item.take_forward}</p>
          </div>
        );
      })}
    </>
  );
};

export default RecentWinsSection;