import React from 'react';
import GenerateNotesCard from './GenerateNotesCard';
import TrendsCard from './TrendsCard';
import PlaceholderCard from './PlaceholderCard';
import NewPlaceholderCard from './NewPlaceholderCard';

interface PlaybookActionsProps {
  onGenerateClick: () => void;
}

const PlaybookActions = ({ onGenerateClick }: PlaybookActionsProps) => {
  return (
    <div className="space-y-3 pb-6">
      <PlaceholderCard />
      <TrendsCard />
      <GenerateNotesCard onClick={onGenerateClick} />
      <NewPlaceholderCard />
    </div>
  );
};

export default PlaybookActions;