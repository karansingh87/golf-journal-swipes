import { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const DOT_SPACING = 20; // Space between dots
      const DOT_SIZE = 1.5; // Size of each dot
      const DOT_OPACITY = 25; // Opacity of dots (0-255)
      
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');
      };

      p.draw = () => {
        p.clear();
        p.noStroke();
        
        // Update scroll position
        scrollRef.current = window.scrollY;

        // Calculate the number of dots needed based on viewport
        const startRow = Math.floor(scrollRef.current / DOT_SPACING);
        const numRows = Math.ceil(p.height / DOT_SPACING) + 1;
        const numCols = Math.ceil(p.width / DOT_SPACING);

        // Draw dots
        p.fill(0, DOT_OPACITY); // Black dots with low opacity
        for (let row = startRow; row < startRow + numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            const x = col * DOT_SPACING;
            const y = (row * DOT_SPACING) - (scrollRef.current % DOT_SPACING);
            p.circle(x, y, DOT_SIZE);
          }
        }

        // Add subtle gradient overlay
        const gradient = p.drawingContext as CanvasRenderingContext2D;
        const transparentGradient = gradient.createLinearGradient(0, 0, 0, p.height);
        transparentGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        transparentGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        gradient.fillStyle = transparentGradient;
        gradient.fillRect(0, 0, p.width, p.height);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const p5Instance = new p5(sketch, containerRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default P5Background;