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
        bloomSize: number;
        bloomIntensity: number;
      }> = [];
      
      const createParticle = () => ({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.3, 0.3),
        vy: p.random(-0.3, 0.3),
        size: p.random(2, 4),
        alpha: p.random(10, 30),
        parallaxFactor: p.random(0.3, 1),
        bloomSize: p.random(40, 60),
        bloomIntensity: p.random(0.05, 0.15)
      });

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        // Initialize particles with fewer elements for better performance
        for (let i = 0; i < 30; i++) {
          particles.push(createParticle());
        }
      };

      p.draw = () => {
        p.clear();
        p.noStroke();

        // Update scroll position for parallax effect
        scrollRef.current = window.scrollY;
        const scrollProgress = scrollRef.current / (document.documentElement.scrollHeight - window.innerHeight);

        // Create smoother gradient background
        const numSteps = 200;
        const colors = [
          p.color('#F2FCE2'),
          p.color('#FEF7CD'),
          p.color('#E5DEFF'),
          p.color('#D3E4FD')
        ];
        
        for (let y = 0; y < p.height; y++) {
          const progress = y / p.height;
          let c;
          
          if (progress < 0.33) {
            c = p.lerpColor(colors[0], colors[1], progress * 3);
          } else if (progress < 0.66) {
            c = p.lerpColor(colors[1], colors[2], (progress - 0.33) * 3);
          } else {
            c = p.lerpColor(colors[2], colors[3], (progress - 0.66) * 3);
          }
          
          p.stroke(c);
          p.line(0, y, p.width, y);
        }

        // Draw bloom effects and particles
        particles.forEach((particle, index) => {
          const parallaxOffset = scrollRef.current * particle.parallaxFactor;
          
          // Draw bloom glow effect
          const bloomColor = p.color('#ACE580');
          bloomColor.setAlpha(particle.bloomIntensity * 255);
          
          // Create multiple layers of bloom for more organic feel
          for (let i = 3; i > 0; i--) {
            p.fill(bloomColor);
            const size = particle.bloomSize * i;
            p.ellipse(
              particle.x,
              (particle.y + parallaxOffset) % p.height,
              size,
              size
            );
          }

          // Draw particle
          const baseAlpha = particle.alpha * (1 - scrollProgress * 0.5);
          p.fill(200, 200, 200, baseAlpha);

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

          // Randomly regenerate particles
          if (p.random(1) < 0.001) {
            particles[index] = createParticle();
          }
        });

        // Add subtle wave effect
        const waveAmplitude = 20 * (1 - scrollProgress);
        const waveFrequency = 0.02;
        p.stroke(200, 200, 200, 20);
        p.noFill();
        p.beginShape();
        for (let x = 0; x < p.width; x += 20) {
          const y = p.height / 2 + 
            p.sin(x * waveFrequency + p.frameCount * 0.02) * waveAmplitude;
          p.vertex(x, y + scrollRef.current * 0.2);
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