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
        vx: p.random(-0.5, 0.5),
        vy: p.random(-0.5, 0.5),
        size: p.random(2, 4),
        alpha: p.random(10, 30),
        parallaxFactor: p.random(0.3, 1) // Different particles move at different speeds
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

        // Update scroll position for parallax effect
        scrollRef.current = window.scrollY;
        const scrollProgress = scrollRef.current / (document.documentElement.scrollHeight - window.innerHeight);

        // Create gradient background
        const c1 = p.color(255, 255, 255); // Light color at top
        const c2 = p.color(244, 244, 245); // Zinc-100 at bottom
        
        for (let y = 0; y < p.height; y++) {
          const inter = y / p.height;
          const c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(0, y, p.width, y);
        }

        // Draw particles with parallax effect
        particles.forEach((particle, index) => {
          const parallaxOffset = scrollRef.current * particle.parallaxFactor;
          const baseAlpha = particle.alpha * (1 - scrollProgress * 0.5);
          p.fill(200, 200, 200, baseAlpha);

          // Update position with parallax
          particle.x += particle.vx;
          particle.y = (particle.y + particle.vy + parallaxOffset) % p.height;

          // Wrap around edges
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;

          // Draw particle
          p.ellipse(
            particle.x,
            particle.y,
            particle.size * (1 + scrollProgress),
            particle.size * (1 + scrollProgress)
          );

          // Occasionally regenerate particles
          if (p.random(1) < 0.001) {
            particles[index] = createParticle();
          }
        });

        // Add parallax wave effect
        const waveAmplitude = 20 * (1 - scrollProgress);
        const waveFrequency = 0.02;
        p.stroke(200, 200, 200, 20);
        p.noFill();
        p.beginShape();
        for (let x = 0; x < p.width; x += 20) {
          const y = p.height / 2 + 
            p.sin(x * waveFrequency + p.frameCount * 0.02) * waveAmplitude;
          p.vertex(x, y + scrollRef.current * 0.2); // Add parallax offset
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