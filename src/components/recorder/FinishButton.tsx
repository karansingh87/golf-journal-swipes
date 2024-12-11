interface FinishButtonProps {
  onClick: () => void;
}

const FinishButton = ({ onClick }: FinishButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative z-20 min-h-[44px] px-6 py-2 rounded-full bg-green-950/30 border border-green-500/20 hover:bg-green-900/40 text-green-400 flex items-center justify-center gap-2 transition-all duration-200"
    >
      <span className="text-sm">Finish</span>
    </button>
  );
};

export default FinishButton;