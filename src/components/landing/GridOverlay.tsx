import React from 'react';

const GridOverlay = () => {
  // Define animation paths based on 30px grid
  const horizontalPath1 = "M0 15 H1400"; // Adjusted to align with grid
  const horizontalPath2 = "M1400 45 H0"; // Adjusted to align with grid
  const verticalPath = "M45 400 V0"; // Adjusted to align with grid

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full">
        {/* Define glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal Pulse 1 */}
        <circle r="2" fill="#ace380" opacity="0.7" filter="url(#glow)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path={horizontalPath1}
          />
        </circle>

        {/* Horizontal Pulse 2 */}
        <circle r="2" fill="#ace380" opacity="0.7" filter="url(#glow)">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            path={horizontalPath2}
          />
        </circle>

        {/* Vertical Pulse */}
        <circle r="2" fill="#ace380" opacity="0.7" filter="url(#glow)">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={verticalPath}
          />
        </circle>
      </svg>
    </div>
  );
};

export default GridOverlay;