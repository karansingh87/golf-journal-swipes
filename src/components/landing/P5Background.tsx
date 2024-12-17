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
      }> = [];
      
      const createParticle = () => ({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.5, 0.5),
        vy: p.random(-0.5, 0.5),
        size: p.random(2, 4),
        alpha: p.random(10, 30)
      });

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        // Initialize particles
        for (let i = 0; i < 50; i++) {
          particles.push(createParticle());
        }
      };

      p.draw = () => {
        p.clear();
        p.noStroke();

        // Update scroll position
        scrollRef.current = window.scrollY;
        const scrollProgress = scrollRef.current / (document.documentElement.scrollHeight - window.innerHeight);

        // Draw particles with scroll-based effects
        particles.forEach((particle, index) => {
          const baseAlpha = particle.alpha * (1 - scrollProgress * 0.5);
          p.fill(200, 200, 200, baseAlpha);

          particle.x += particle.vx * (1 + scrollProgress);
          particle.y += particle.vy * (1 + scrollProgress);

          // Wrap around edges
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;

          // Draw particle
          p.ellipse(particle.x, particle.y, particle.size * (1 + scrollProgress), particle.size * (1 + scrollProgress));

          // Occasionally regenerate particles
          if (p.random(1) < 0.001) {
            particles[index] = createParticle();
          }
        });

        // Add scroll-based wave effect
        const waveAmplitude = 20 * (1 - scrollProgress);
        const waveFrequency = 0.02;
        p.stroke(200, 200, 200, 20);
        p.noFill();
        p.beginShape();
        for (let x = 0; x < p.width; x += 20) {
          const y = p.height / 2 + 
            p.sin(x * waveFrequency + p.frameCount * 0.02) * waveAmplitude;
          p.vertex(x, y);
        }
        p.endShape();
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