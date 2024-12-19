import { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        alpha: number;
        parallaxFactor: number;
      }> = [];
      
      const createParticle = () => ({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.2, 0.2),
        vy: p.random(-0.2, 0.2),
        size: p.random(2, 4),
        alpha: p.random(10, 20),
        parallaxFactor: p.random(0.2, 0.8)
      });

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        for (let i = 0; i < 40; i++) {
          particles.push(createParticle());
        }
      };

      p.draw = () => {
        p.clear();
        p.noStroke();

        // Update scroll position
        scrollRef.current = window.scrollY;

        // Create subtle gradient background
        const numSteps = 400;
        for (let i = 0; i < numSteps; i++) {
          const y = (i / numSteps) * p.height;
          const progress = y / p.height;
          
          // Use cosine interpolation for smoother transitions
          const t = (1 - Math.cos(progress * Math.PI)) / 2;
          
          // Interpolate between very light colors
          const c = p.lerpColor(
            p.color(255, 255, 255, 255), // White
            p.color(242, 252, 226, 255), // Very light green (#F2FCE2)
            t * 0.15 // Reduce the intensity of the green
          );
          
          p.stroke(c);
          p.line(0, y, p.width, y);
        }

        // Draw particles with subtle green tint
        particles.forEach((particle, index) => {
          const parallaxOffset = scrollRef.current * particle.parallaxFactor * 0.05;
          const baseAlpha = particle.alpha * 0.5; // Reduce particle opacity
          
          // Add subtle sine wave motion
          const time = p.frameCount * 0.005; // Slower movement
          const waveOffset = p.sin(time + particle.x * 0.01) * 1;
          
          particle.x += particle.vx * 0.5; // Slower horizontal movement
          particle.y = (particle.y + particle.vy * 0.5 + parallaxOffset + waveOffset) % p.height;

          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;

          // Very subtle green particles
          p.fill(172, 229, 128, baseAlpha * 0.2); // #ACE580 with very low opacity
          p.ellipse(
            particle.x,
            particle.y,
            particle.size * 1.5,
            particle.size * 1.5
          );

          if (p.random(1) < 0.001) {
            particles[index] = createParticle();
          }
        });

        // Add flowing curves with very low opacity
        p.stroke(172, 229, 128, 5); // Almost invisible green
        p.noFill();
        for (let i = 0; i < 3; i++) {
          p.beginShape();
          for (let x = 0; x < p.width; x += 50) {
            const frequency = 0.005;
            const amplitude = 15;
            const y = p.height / 2 + 
              p.sin(x * frequency + p.frameCount * 0.005 + i) * amplitude +
              p.cos(x * frequency * 0.5 + p.frameCount * 0.003) * amplitude;
            p.curveVertex(x, y + scrollRef.current * 0.05);
          }
          p.endShape();
        }
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