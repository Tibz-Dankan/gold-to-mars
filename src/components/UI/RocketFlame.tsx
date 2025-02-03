// import { useEffect, useRef } from "react";

// export const RocketFlame = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const particles: Particle[] = [];

//   const gravity = 0.02; // Simulating the effect of gravity on particles

//   class Particle {
//     x: number;
//     y: number;
//     size: number;
//     velocityX: number;
//     velocityY: number;
//     opacity: number;
//     color: string;

//     constructor(x: number, y: number) {
//       this.x = x;
//       this.y = y;
//       this.size = Math.random() * 4 + 2; // Particle size
//       this.velocityX = (Math.random() - 0.5) * 2; // Random sideways motion
//       this.velocityY = -Math.random() * 3 - 1; // Upward motion
//       this.opacity = 1;
//       this.color = `rgba(${255}, ${Math.floor(Math.random() * 150)}, 0, ${
//         this.opacity
//       })`; // Random orange-red flame
//     }

//     update() {
//       this.x += this.velocityX;
//       this.y += this.velocityY;
//       this.velocityY += gravity; // Apply gravity effect
//       this.opacity -= 0.02; // Fade out effect
//     }

//     draw(ctx: CanvasRenderingContext2D) {
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.fillStyle = this.color;
//       ctx.globalAlpha = this.opacity;
//       ctx.fill();
//       ctx.globalAlpha = 1;
//     }
//   }

//   useEffect(() => {
//     const canvas = canvasRef.current!;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let animationFrameId: number;

//     function animate() {
//       if (!ctx) return;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Generate new particles
//       if (Math.random() < 0.5) {
//         particles.push(new Particle(canvas.width / 2, canvas.height - 100));
//       }

//       // Update and draw particles
//       for (let i = particles.length - 1; i >= 0; i--) {
//         particles[i].update();
//         particles[i].draw(ctx);
//         if (particles[i].opacity <= 0) {
//           particles.splice(i, 1); // Remove faded particles
//         }
//       }

//       animationFrameId = requestAnimationFrame(animate);
//     }

//     animate();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
//   );
// };

import { useEffect, useRef } from "react";

export const RocketFlame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles: Particle[] = [];
  const gravity = 0.05; // Strength of downward motion

  class Particle {
    x: number;
    y: number;
    size: number;
    velocityX: number;
    velocityY: number;
    opacity: number;
    color: string;
    shape: number;

    constructor(x: number, y: number) {
      this.x = x + (Math.random() - 0.5) * 10; // Small horizontal variation
      this.y = y + Math.random() * 5; // Slight variation in Y spawn
      this.size = Math.random() * 6 + 4; // Larger particles for flames
      this.velocityX = (Math.random() - 0.5) * 2; // Random sideways drift
      this.velocityY = Math.random() * 2 + 1; // Downward motion
      this.opacity = 1;
      this.shape = Math.random() * 2 + 1; // Irregular shape factor

      // Flame-like color gradient
      const r = 255;
      const g = Math.floor(Math.random() * 150); // Random red/yellow shades
      const b = 0;
      this.color = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    }

    update() {
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.velocityY += gravity; // Apply downward gravity
      this.opacity -= 0.015; // Slow fading effect
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.size * this.shape, this.y + this.size);
      ctx.lineTo(this.x - this.size * this.shape, this.y + this.size);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    function animate() {
      if (!ctx) return;
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Generate a lot of particles for dense flames
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(canvas.width / 2, canvas.height - 50));
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1); // Remove faded particles
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
};
