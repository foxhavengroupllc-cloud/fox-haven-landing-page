/**
 * HeatRenderer — Canvas 2D particle system for the solar shelter experience.
 *
 * Renders a heat distortion particle field whose intensity and color shift
 * with narrative phase. Phase 0 (problem) = dense hot orange.
 * Phase 4 (action) = sparse cool blue-white.
 *
 * Extends Canvas2DRenderer (Phase 2 engine).
 * Does NOT contain project-specific copy or UI — only visual rendering.
 */

import { Canvas2DRenderer } from '../../renderers/Canvas2DRenderer';

// ─── Particle ─────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  /** 0–1: individual heat offset, randomized so particles aren't uniform */
  heatOffset: number;
}

// ─── Color Interpolation ──────────────────────────────────────────────────────

// Hot: orange (#f97316)  Cool: cyan-white (#e0f2fe)
const HOT_R = 249, HOT_G = 115, HOT_B = 22;
const COOL_R = 224, COOL_G = 242, COOL_B = 254;

function lerpColor(t: number): string {
  // t = 0 → hot orange; t = 1 → cool white-blue
  const r = Math.round(HOT_R + (COOL_R - HOT_R) * t);
  const g = Math.round(HOT_G + (COOL_G - HOT_G) * t);
  const b = Math.round(HOT_B + (COOL_B - HOT_B) * t);
  return `${r},${g},${b}`;
}

// ─── Renderer Options ─────────────────────────────────────────────────────────

export interface HeatRendererOptions {
  dpr: number;
  onDowngrade: () => void;
  /** 0–1: how intense/hot the particle field is. 1 = max heat. Default: 1.0 */
  initialHeatLevel?: number;
  /** Max particles at standard tier. Default: 80 */
  particleCount?: number;
}

// ─── HeatRenderer ─────────────────────────────────────────────────────────────

export class HeatRenderer extends Canvas2DRenderer {
  private particles: Particle[] = [];
  private heatLevel: number;
  private targetHeatLevel: number;
  private maxParticles: number;

  constructor(canvas: HTMLCanvasElement, options: HeatRendererOptions) {
    super(canvas, options);
    this.heatLevel = options.initialHeatLevel ?? 1.0;
    this.targetHeatLevel = this.heatLevel;
    this.maxParticles = options.particleCount ?? 80;
  }

  /** Smoothly transition to a new heat level. Called on phase change. */
  setHeatLevel(level: number): void {
    this.targetHeatLevel = Math.max(0, Math.min(1, level));
  }

  protected onStart(): void {
    this.spawnInitialParticles();
  }

  private spawnInitialParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  private createParticle(randomY = false): Particle {
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;
    const maxLife = 2000 + Math.random() * 3000; // 2–5 seconds
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + Math.random() * 20,
      vx: (Math.random() - 0.5) * 15,
      vy: 18 + Math.random() * 30, // upward speed (px/sec)
      size: 1.5 + Math.random() * 3.5,
      life: randomY ? Math.random() * maxLife : 0,
      maxLife,
      heatOffset: Math.random() * 0.3 - 0.15, // ±0.15 personal heat offset
    };
  }

  protected draw(ctx: CanvasRenderingContext2D, dt: number): void {
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;
    const dtSec = Math.min(dt, 50) / 1000;

    // Lerp heat level toward target
    this.heatLevel += (this.targetHeatLevel - this.heatLevel) * dtSec * 0.8;

    // Clear with dark background (slight persistence for heat shimmer)
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgba(5, 8, 18, ${0.12 + (1 - this.heatLevel) * 0.06})`;
    ctx.fillRect(0, 0, w, h);

    // Draw ambient heat glow in background
    this.drawAmbientGlow(ctx, w, h);

    // Update and draw particles
    const targetCount = Math.round(this.maxParticles * (0.1 + this.heatLevel * 0.9));

    // Remove excess particles when cooling
    while (this.particles.length > targetCount + 5) {
      this.particles.pop();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += dt;

      // Respawn if life exceeded or particle escaped top
      if (p.life > p.maxLife || p.y < -10) {
        if (this.particles.length <= targetCount) {
          this.particles[i] = this.createParticle(false);
        } else {
          this.particles.splice(i, 1);
        }
        continue;
      }

      // Update position — slight sine drift on x
      const age = p.life / p.maxLife;
      p.y -= p.vy * dtSec;
      p.x += p.vx * dtSec * 0.3;
      p.x += Math.sin(p.life * 0.002 + p.heatOffset * 10) * 0.5;

      // Opacity: fade in for first 20%, fade out for last 30%
      let opacity: number;
      if (age < 0.2) {
        opacity = age / 0.2;
      } else if (age > 0.7) {
        opacity = (1 - age) / 0.3;
      } else {
        opacity = 1;
      }
      opacity *= 0.35 + this.heatLevel * 0.45; // intensity by heat level

      // Color: mix between hot and cool based on heat level + personal offset
      const particleHeat = Math.max(0, Math.min(1, this.heatLevel + p.heatOffset));
      const coolness = 1 - particleHeat;
      const colorRGB = lerpColor(coolness);

      // Draw particle as soft circle
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
      gradient.addColorStop(0, `rgba(${colorRGB},${opacity})`);
      gradient.addColorStop(1, `rgba(${colorRGB},0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Spawn new particles to maintain target count
    while (this.particles.length < targetCount) {
      this.particles.push(this.createParticle(false));
    }
  }

  private drawAmbientGlow(ctx: CanvasRenderingContext2D, w: number, h: number): void {
    if (this.heatLevel < 0.05) return;

    // Hot glow from bottom — feels like heated ground
    const bottomGlow = ctx.createRadialGradient(w * 0.5, h, 0, w * 0.5, h, w * 0.7);
    const glowOpacity = this.heatLevel * 0.08;
    bottomGlow.addColorStop(0, `rgba(249, 115, 22, ${glowOpacity})`);
    bottomGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');

    ctx.fillStyle = bottomGlow;
    ctx.fillRect(0, 0, w, h);
  }

  protected onDestroy(): void {
    this.particles = [];
  }

  /** Expose current interpolated heat level for phase content to read. */
  getCurrentHeatLevel(): number {
    return this.heatLevel;
  }
}
