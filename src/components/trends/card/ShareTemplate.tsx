interface ShareTemplateProps {
  type: string;
  primary_insight: string;
  details: string;
}

const ShareTemplate = ({ type, primary_insight, details }: ShareTemplateProps) => {
  const Icon = getIcon(type);
  
  return (
    <div className={cn(
      "w-[1080px] h-[1920px] p-16 flex flex-col justify-between",
      getGradientBackground(type)
    )}>
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-lg tracking-wide text-black/70 uppercase">
          <Icon className="h-6 w-6" />
          <span className="font-medium">{getTypeLabel(type)}</span>
        </div>
        <h2 className="text-6xl font-bold leading-tight tracking-tight text-black/80">
          {primary_insight}
        </h2>
        <p className="text-2xl text-black/70 leading-relaxed">
          {details}
        </p>
      </div>
      <div className="text-center text-black/50 text-xl font-medium">
        GolfLog
      </div>
    </div>
  );
};

export default ShareTemplate;