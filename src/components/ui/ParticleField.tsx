'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseSpeed: number;
}

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
}

const ORANGE = 'rgba(224,94,20,0.3)';
const CREAM = 'rgba(244,237,224,0.15)';
const CONNECTION_DISTANCE = 120;
const REPEL_RADIUS = 200;
const ATTRACT_RADIUS = 400;
const REPEL_STRENGTH = 0.8;
const ATTRACT_STRENGTH = 0.02;

function createParticle(width: number, height: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const baseSpeed = 0.15 + Math.random() * 0.35;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * baseSpeed,
    vy: Math.sin(angle) * baseSpeed,
    size: 1 + Math.random() * 2,
    color: Math.random() < 0.75 ? ORANGE : CREAM,
    baseSpeed,
  };
}

export default function ParticleField({
  particleCount = 120,
  className = '',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(width, height),
      );
    },
    [particleCount],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check reduced motion preference
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mql.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener('change', handleMotionChange);

    // Sizing
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      } else {
        // Remap particles that fell outside the new bounds
        for (const p of particlesRef.current) {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        }
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement!);
    resize();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    // Listen on parent so pointer-events-none canvas still works
    const parent = canvas.parentElement!;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Draw static frame for reduced motion
    const drawStatic = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const len = particles.length;

      // Draw connections
      for (let i = 0; i < len; i++) {
        const a = particles[i];
        for (let j = i + 1; j < len; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = 0.15 * (1 - dist / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(224,94,20,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Animation loop
    const animate = () => {
      if (reducedMotionRef.current) {
        drawStatic();
        return;
      }

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const len = particles.length;
      const mouse = mouseRef.current;

      // Update positions
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Mouse interaction
        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < REPEL_RADIUS && dist > 0) {
            // Repel
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          } else if (dist < ATTRACT_RADIUS) {
            // Gentle gravitational pull
            const force =
              ((dist - REPEL_RADIUS) / (ATTRACT_RADIUS - REPEL_RADIUS)) *
              ATTRACT_STRENGTH;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          }
        }

        // Dampen velocity toward baseSpeed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > p.baseSpeed) {
          const damping = 0.98;
          p.vx *= damping;
          p.vy *= damping;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Toroidal wrap
        if (p.x < 0) p.x += w;
        else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        else if (p.y > h) p.y -= h;
      }

      // Draw connections (batched)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < len; i++) {
        const a = particles[i];
        for (let j = i + 1; j < len; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(distSq);
            const opacity = 0.15 * (1 - dist / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(224,94,20,${opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles (batched by color)
      const orangeParticles: Particle[] = [];
      const creamParticles: Particle[] = [];
      for (let i = 0; i < len; i++) {
        if (particles[i].color === ORANGE) {
          orangeParticles.push(particles[i]);
        } else {
          creamParticles.push(particles[i]);
        }
      }

      ctx.fillStyle = ORANGE;
      for (const p of orangeParticles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = CREAM;
      for (const p of creamParticles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      mql.removeEventListener('change', handleMotionChange);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
