import React from 'react';
import GenerateNotesCard from './GenerateNotesCard';
import TrendsCard from './TrendsCard';
import PlaceholderCard from './PlaceholderCard';
import NewPlaceholderCard from './NewPlaceholderCard';
import PepTalkCard from './PepTalkCard';

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
      <PepTalkCard onClick={onPepTalkClick} />
      <NewPlaceholderCard />
    </div>
  );
};

export default PlaybookActions;