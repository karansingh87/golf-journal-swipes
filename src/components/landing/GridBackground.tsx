import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match viewport
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial size
    setCanvasSize();

    // Handle resize
    window.addEventListener('resize', setCanvasSize);

    // Draw grid
    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Grid settings
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw intersection points
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Initial draw
    drawGrid();

    // Redraw on resize
    window.addEventListener('resize', drawGrid);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('resize', drawGrid);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: isMobile ? 0.5 : 1,
        }}
      />
      
      {/* SVG Overlay for Animations */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isMobile ? 0.5 : 0.7 }}
      >
        {/* Horizontal Pulse */}
        <circle r="3" fill="#3b82f6" opacity="0.6">
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 0,100 L 2000,100"
          />
        </circle>

        {/* Vertical Pulse */}
        <circle r="3" fill="#3b82f6" opacity="0.6">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            path="M 200,0 L 200,2000"
          />
        </circle>

        {/* Diagonal Pulse */}
        <circle r="3" fill="#3b82f6" opacity="0.6">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 0,0 L 2000,2000"
          />
        </circle>
      </svg>
    </div>
  );
};

export default GridBackground;