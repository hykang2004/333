import React, { useEffect, useRef } from 'react';

interface SparkleCursorProps {
  enabled: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'star' | 'circle' | 'spark';
}

const COLORS = [
  '#f59e0b', // amber
  '#ec4899', // pink
  '#a855f7', // purple
  '#38bdf8', // sky cyan
  '#fde047', // yellow
  '#ffffff', // white
  '#4ade80'  // emerald
];

export const SparkleCursor: React.FC<SparkleCursorProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const createParticles = (x: number, y: number, count = 3) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.4;
        const shapes: ('star' | 'circle' | 'spark')[] = ['star', 'spark', 'circle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          size: Math.random() * 6 + 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.3, // slight downward drift
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          shape
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      createParticles(e.clientX, e.clientY, 3);
      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        createParticles(touch.clientX, touch.clientY, 3);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Draw 4-point star helper
    const drawStar = (cx: number, cy: number, spikes = 4, outerRadius = 6, innerRadius = 2) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === 'star') {
          drawStar(0, 0, 4, p.size, p.size * 0.35);
        } else if (p.shape === 'spark') {
          drawStar(0, 0, 8, p.size * 0.9, p.size * 0.2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      id="magic-sparkle-canvas"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
