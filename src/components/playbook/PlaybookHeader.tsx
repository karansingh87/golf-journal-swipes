import React from 'react';

interface PlaybookHeaderProps {
  displayName: string;
}

const PlaybookHeader = ({ displayName }: PlaybookHeaderProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-golf-gray-text-primary">
        Hi{displayName ? ` ${displayName}` : ''},
      </h1>
      <p className="text-sm text-golf-gray-text-secondary mt-2">
        Welcome to your golf playbook. Your insights and breakthroughs, all in one place.
      </p>
    </div>
  );
};

export default PlaybookHeader;