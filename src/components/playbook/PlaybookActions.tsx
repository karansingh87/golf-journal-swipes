import React from 'react';
import GenerateNotesCard from './GenerateNotesCard';
import TrendsCard from './TrendsCard';
import PlaceholderCard from './PlaceholderCard';
import NewPlaceholderCard from './NewPlaceholderCard';

interface PlaybookActionsProps {
  onGenerateClick: () => void;
  onPepTalkClick: () => void;
}

const PlaybookActions = ({ onGenerateClick, onPepTalkClick }: PlaybookActionsProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <PlaceholderCard />
      <TrendsCard />
      <GenerateNotesCard onClick={onGenerateClick} />
      <NewPlaceholderCard onClick={onPepTalkClick} />
    </div>
  );
};

export default PlaybookActions;