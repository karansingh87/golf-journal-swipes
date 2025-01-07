import React from 'react';
import GenerateNotesCard from './GenerateNotesCard';
import TrendsCard from './TrendsCard';
import PlaceholderCard from './PlaceholderCard';

interface PlaybookActionsProps {
  onGenerateClick: () => void;
}

const PlaybookActions = ({ onGenerateClick }: PlaybookActionsProps) => {
  return (
    <div className="space-y-3 pb-8">
      <GenerateNotesCard onClick={onGenerateClick} />
      <TrendsCard />
      <PlaceholderCard />
    </div>
  );
};

export default PlaybookActions;