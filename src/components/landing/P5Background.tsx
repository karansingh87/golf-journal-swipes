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

        // Create smoother gradient background using cosine interpolation
        const numSteps = 400;
        for (let i = 0; i < numSteps; i++) {
          const y = (i / numSteps) * p.height;
          const progress = y / p.height;
          
          // Use cosine interpolation for smoother transitions
          const t = (1 - Math.cos(progress * Math.PI)) / 2;
          
          // Interpolate between soft greens with more subtle transition
          const c = p.lerpColor(
            p.color(242, 252, 226, 255), // #F2FCE2
            p.color(232, 245, 214, 255), // Slightly darker
            t
          );
          
          p.stroke(c);
          p.line(0, y, p.width, y);
        }

        // Draw particles with improved fluid motion
        particles.forEach((particle, index) => {
          const parallaxOffset = scrollRef.current * particle.parallaxFactor * 0.1;
          const baseAlpha = particle.alpha * (1 - scrollProgress * 0.3);
          
          // Add subtle sine wave motion
          const time = p.frameCount * 0.01;
          const waveOffset = p.sin(time + particle.x * 0.01) * 2;
          
          // Smoother particle movement
          particle.x += particle.vx + p.sin(time) * 0.1;
          particle.y = (particle.y + particle.vy + parallaxOffset + waveOffset) % p.height;

          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;

          // Create a subtle glow effect
          p.fill(172, 229, 128, baseAlpha * 0.3); // #ACE580 with lower opacity
          p.ellipse(
            particle.x,
            particle.y,
            particle.size * 2,
            particle.size * 2
          );
          
          p.fill(172, 229, 128, baseAlpha * 0.6);
          p.ellipse(
            particle.x,
            particle.y,
            particle.size,
            particle.size
          );

          // Occasionally refresh particles
          if (p.random(1) < 0.001) {
            particles[index] = createParticle();
          }
        });

        // Add flowing curves with varying amplitudes
        p.stroke(172, 229, 128, 15); // #ACE580 with very low opacity
        p.noFill();
        for (let i = 0; i < 3; i++) {
          p.beginShape();
          for (let x = 0; x < p.width; x += 30) {
            const frequency = 0.01;
            const amplitude = 20 * (1 - scrollProgress * 0.5);
            const y = p.height / 2 + 
              p.sin(x * frequency + p.frameCount * 0.01 + i) * amplitude +
              p.cos(x * frequency * 0.5 + p.frameCount * 0.005) * amplitude;
            p.curveVertex(x, y + scrollRef.current * 0.1);
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