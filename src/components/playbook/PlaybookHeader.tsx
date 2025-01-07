import React from 'react';

interface PlaybookHeaderProps {
  displayName: string;
}

const PlaybookHeader = ({ displayName }: PlaybookHeaderProps) => {
  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-golf-gray-text-primary">
        Hi {displayName},
      </h1>
      <p className="text-sm text-golf-gray-text-secondary mt-2">
        Welcome to your personal golf playbook. Here you'll find your most valuable 
        insights, breakthroughs, and patterns we've discovered from your golf journey. 
        Think of this as your personalized guide to your best golf.
      </p>
    </div>
  );
};

export default PlaybookHeader;