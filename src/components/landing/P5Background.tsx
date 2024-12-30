import { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const bloomPoints = [
        {
          x: 0,
          y: 0,
          size: 600, // Primary bloom
          opacity: 0.25 // 25% opacity for base layer
        },
        {
          x: 0,
          y: 0,
          size: 400, // Secondary bloom
          opacity: 0.2 // 20% opacity
        },
        {
          x: 0,
          y: 0,
          size: 300, // Tertiary bloom
          opacity: 0.15 // 15% opacity
        }
      ];

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        // Set fixed positions for bloom effects using percentage-based calculations
        // Primary bloom in upper right
        bloomPoints[0].x = p.width * 0.75;
        bloomPoints[0].y = p.height * 0.25;

        // Secondary bloom in lower left
        bloomPoints[1].x = p.width * 0.25;
        bloomPoints[1].y = p.height * 0.75;

        // Tertiary bloom in middle right
        bloomPoints[2].x = p.width * 0.85;
        bloomPoints[2].y = p.height * 0.5;
      };

      p.draw = () => {
        p.clear();
        
        // Create dark background
        const numSteps = 200;
        for (let y = 0; y < p.height; y++) {
          const progress = y / p.height;
          let c;
          
          if (progress < 0.33) {
            c = p.lerpColor(p.color('#18181B'), p.color('#18181B'), progress * 3);
          } else if (progress < 0.66) {
            c = p.lerpColor(p.color('#18181B'), p.color('#18181B'), (progress - 0.33) * 3);
          } else {
            c = p.lerpColor(p.color('#18181B'), p.color('#18181B'), (progress - 0.66) * 3);
          }
          
          p.stroke(c);
          p.line(0, y, p.width, y);
        }

        // Draw bloom effects with increased opacity and layering
        bloomPoints.forEach(point => {
          // Create multiple layers for each bloom point with varying opacities
          for (let i = 0; i < 4; i++) {
            const size = point.size * (1 - i * 0.15);
            const opacity = point.opacity * (1 - i * 0.2);
            
            p.noStroke();
            const bloomColor = p.color('#ACE580');
            bloomColor.setAlpha(opacity * 255);
            p.fill(bloomColor);
            
            // Draw multiple overlapping circles for a more organic feel
            p.circle(point.x, point.y, size);
            p.circle(point.x + size * 0.1, point.y - size * 0.05, size * 0.9);
            p.circle(point.x - size * 0.15, point.y + size * 0.05, size * 0.85);
          }
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        
        // Update bloom positions on resize while maintaining percentage-based positioning
        bloomPoints[0].x = p.width * 0.75;
        bloomPoints[0].y = p.height * 0.25;
        bloomPoints[1].x = p.width * 0.25;
        bloomPoints[1].y = p.height * 0.75;
        bloomPoints[2].x = p.width * 0.85;
        bloomPoints[2].y = p.height * 0.5;
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