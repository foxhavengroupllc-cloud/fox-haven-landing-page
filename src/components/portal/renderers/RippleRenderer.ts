/**
 * RippleRenderer — "Volunteer or Donate" portal animation.
 * Warm concentric ripples with orbiting particles.
 * Conveys human warmth and expanding impact.
 */

interface Ripple {
  cx: number;
  cy: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface Particle {
  angle: number;
  distance: number;
  speed: number;
  size: number;
  baseOpacity: number;
}

export class RippleRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number;
  private width = 0;
  private height = 0;
  private hovered = false;
  private modeBlend = 0;
  private rafId: number | null = null;
  private lastTime = 0;
  private ripples: Ripple[] = [];
  private particles: Particle[] = [];
  private rippleTimer = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("RippleRenderer: no 2D context");
    this.ctx = ctx;

    this.handleResize();
    this.initParticles();
  }

  private initParticles(): void {
    this.particles = [];
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        angle: (Math.PI * 2 * i) / 6 + Math.random() * 0.5,
        distance: 30 + Math.random() * 30,
        speed: 0.3 + Math.random() * 0.4,
        size: 1.5 + Math.random() * 1.5,
        baseOpacity: 0.3 + Math.random() * 0.3,
      });
    }
  }

  handleResize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  setHovered(hovered: boolean): void {
    this.hovered = hovered;
  }

  start(): void {
    if (this.rafId !== null) return;
    this.lastTime = performance.now();
    this.tick(this.lastTime);
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  drawStatic(): void {
    this.handleResize();
    this.ctx.clearRect(0, 0, this.width, this.height);
    // Draw static concentric circles
    const cx = this.width / 2;
    const cy = this.height / 2;
    for (let i = 1; i <= 4; i++) {
      const r = i * 20;
      this.ctx.strokeStyle = `rgba(245,158,11,${0.08 - i * 0.015})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.stroke();
    }
  }

  private tick = (timestamp: number): void => {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;

    const target = this.hovered ? 1 : 0;
    this.modeBlend += (target - this.modeBlend) * Math.min(dt * 5, 1);

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawFrame(dt, timestamp / 1000);

    this.rafId = requestAnimationFrame(this.tick);
  };

  private drawFrame(dt: number, time: number): void {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const blend = this.modeBlend;
    const cx = w / 2;
    const cy = h / 2;

    // Emit ripples
    const interval = 2.5 - blend * 1.2;
    this.rippleTimer += dt;
    if (this.rippleTimer > interval) {
      this.rippleTimer = 0;
      this.ripples.push({
        cx: cx + (blend > 0.5 ? (Math.random() - 0.5) * 30 : 0),
        cy: cy + (blend > 0.5 ? (Math.random() - 0.5) * 20 : 0),
        radius: 0,
        maxRadius: Math.min(w, h) * 0.45,
        opacity: 0.25 + blend * 0.15,
      });
    }

    // Update & draw ripples
    this.ripples = this.ripples.filter((r) => {
      r.radius += dt * (35 + blend * 20);
      r.opacity -= dt * (0.08 + blend * 0.04);
      if (r.opacity <= 0 || r.radius > r.maxRadius) return false;

      ctx.strokeStyle = `rgba(245,158,11,${r.opacity})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(r.cx, r.cy, r.radius, 0, Math.PI * 2);
      ctx.stroke();
      return true;
    });

    // Draw particles
    const particleCount = 6 + Math.floor(blend * 6);
    for (let i = 0; i < Math.min(particleCount, this.particles.length); i++) {
      const p = this.particles[i];
      p.angle += p.speed * dt;
      const dist = p.distance * (1 + blend * 0.5);
      const px = cx + Math.cos(p.angle) * dist;
      const py = cy + Math.sin(p.angle) * dist;
      const alpha = p.baseOpacity * (0.6 + blend * 0.4);

      // Particle glow
      const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
      grad.addColorStop(0, `rgba(245,158,11,${alpha})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Particle core
      ctx.fillStyle = `rgba(245,158,11,${alpha * 1.5})`;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add extra particles on hover
    while (this.particles.length < particleCount) {
      this.particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 20 + Math.random() * 40,
        speed: 0.3 + Math.random() * 0.4,
        size: 1 + Math.random() * 1.5,
        baseOpacity: 0.2 + Math.random() * 0.3,
      });
    }

    // Center warmth glow
    const warmGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
    warmGrad.addColorStop(0, `rgba(245,158,11,${0.08 + blend * 0.08})`);
    warmGrad.addColorStop(0.5, `rgba(245,158,11,${0.03 + blend * 0.03})`);
    warmGrad.addColorStop(1, "transparent");
    ctx.fillStyle = warmGrad;
    ctx.fillRect(0, 0, w, h);
  }
}
