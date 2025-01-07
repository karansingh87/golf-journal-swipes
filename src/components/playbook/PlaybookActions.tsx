import React from 'react';
import GenerateNotesCard from './GenerateNotesCard';
import TrendsCard from './TrendsCard';
import PlaceholderCard from './PlaceholderCard';

interface PlaybookActionsProps {
  onGenerateClick: () => void;
}

const PlaybookActions = ({ onGenerateClick }: PlaybookActionsProps) => {
  return (
    <div className="flex-1 flex flex-col space-y-2 pb-6 min-h-[calc(100vh-13rem)]">
      <GenerateNotesCard onClick={onGenerateClick} />
      <TrendsCard />
      <PlaceholderCard />
    </div>
  );
};

export default PlaybookActions;