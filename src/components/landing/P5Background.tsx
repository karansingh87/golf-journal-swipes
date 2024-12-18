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
        vx: p.random(-0.3, 0.3),
        vy: p.random(-0.3, 0.3),
        size: p.random(2, 3),
        alpha: p.random(5, 15),
        parallaxFactor: p.random(0.2, 0.8)
      });

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        // Initialize particles
        for (let i = 0; i < 40; i++) {
          particles.push(createParticle());
        }
      };

      p.draw = () => {
        p.clear();
        p.noStroke();

        // Update scroll position for parallax effect
        scrollRef.current = window.scrollY;
        const scrollProgress = scrollRef.current / (document.documentElement.scrollHeight - window.innerHeight);

        // Create very subtle gradient background
        const numSteps = 200;
        for (let y = 0; y < p.height; y++) {
          const progress = y / p.height;
          const c = p.color(255, 255, 255, 3); // Almost transparent white
          p.stroke(c);
          p.line(0, y, p.width, y);
        }

        // Draw particles with parallax effect
        particles.forEach((particle, index) => {
          const parallaxOffset = scrollRef.current * particle.parallaxFactor;
          const baseAlpha = particle.alpha * (1 - scrollProgress * 0.3);
          p.fill(240, 240, 240, baseAlpha);

          particle.x += particle.vx;
          particle.y = (particle.y + particle.vy + parallaxOffset) % p.height;

          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;

          p.ellipse(
            particle.x,
            particle.y,
            particle.size,
            particle.size
          );

          if (p.random(1) < 0.001) {
            particles[index] = createParticle();
          }
        });

        // Add very subtle wave effect
        const waveAmplitude = 10 * (1 - scrollProgress);
        const waveFrequency = 0.01;
        p.stroke(240, 240, 240, 10);
        p.noFill();
        p.beginShape();
        for (let x = 0; x < p.width; x += 30) {
          const y = p.height / 2 + 
            p.sin(x * waveFrequency + p.frameCount * 0.01) * waveAmplitude;
          p.vertex(x, y + scrollRef.current * 0.1);
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