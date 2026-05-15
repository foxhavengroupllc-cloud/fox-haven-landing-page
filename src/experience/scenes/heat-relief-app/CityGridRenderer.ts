/**
 * CityGridRenderer, Canvas 2D city-block dot grid for the Heat Relief App experience.
 *
 * Renders a sparse grid of dots representing city blocks. Visual mode shifts
 * with narrative phase: emergency (alert wave) → discovery (resource pings) →
 * navigate (animated path) → decide (comparison highlights) → act (calm).
 *
 * Extends Canvas2DRenderer (Phase 2 engine).
 * Does NOT contain project-specific copy or UI, only visual rendering.
 *
 * Color grammar: primarily cyan (#06b6d4), inverted from HeatRenderer's orange.
 * Represents wayfinding and utility, not thermal atmosphere.
 */

import { Canvas2DRenderer } from '../../renderers/Canvas2DRenderer';
import type { Canvas2DRendererOptions } from '../../renderers/Canvas2DRenderer';

// ─── Grid Dot ─────────────────────────────────────────────────────────────────

interface GridDot {
  /** CSS pixel x position */
  x: number;
  /** CSS pixel y position */
  y: number;
  /** True if this dot represents a cooling center resource */
  isResource: boolean;
  /** Seconds since ping animation started; negative = waiting to start */
  pingAge: number;
  /** Random phase offset for breathing animation */
  pulseOffset: number;
}

// ─── Path Segment ─────────────────────────────────────────────────────────────

interface PathSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// ─── Renderer Options ─────────────────────────────────────────────────────────

export interface CityGridRendererOptions extends Canvas2DRendererOptions {
  /** Total dot count at standard tier. Default: 55 */
  dotCount?: number;
  /** Number of resource (cooling center) dots. Default: 7 */
  resourceCount?: number;
}

// ─── CityGridRenderer ─────────────────────────────────────────────────────────

export class CityGridRenderer extends Canvas2DRenderer {
  private dots: GridDot[] = [];
  private phase = 0;
  private phaseAge = 0;
  private alertWave = 0;
  private pathProgress = 0;
  private pathSegments: PathSegment[] = [];
  private userDotIndex = 0;
  private nearestResourceIndex = 0;
  private readonly maxDotCount: number;
  private readonly resourceCount: number;
  private gridBuilt = false;

  constructor(canvas: HTMLCanvasElement, options: CityGridRendererOptions) {
    super(canvas, options);
    this.maxDotCount = options.dotCount ?? 55;
    this.resourceCount = options.resourceCount ?? 7;
  }

  /** Set the current narrative phase. 0–4. Triggers visual mode transition. */
  setPhase(phase: number): void {
    const p = Math.max(0, Math.min(4, Math.round(phase)));
    if (p === this.phase) return;
    this.phase = p;
    this.phaseAge = 0;

    // Phase 1: queue resource dot pings with staggered delays
    if (p === 1) {
      let delay = 0;
      for (const d of this.dots) {
        if (d.isResource) {
          d.pingAge = -delay;
          delay += 0.4 + Math.random() * 0.3;
        }
      }
    }

    // Phase 2: reset path animation
    if (p === 2) {
      this.pathProgress = 0;
    }
  }

  protected onStart(): void {
    this.buildGrid();
    this.gridBuilt = true;
  }

  protected onResize(): void {
    if (this.gridBuilt) this.buildGrid();
  }

  // ─── Grid Construction ──────────────────────────────────────────────────────

  private buildGrid(): void {
    const w = this.width;
    const h = this.height;
    if (w === 0 || h === 0) return;

    const cols = Math.ceil(Math.sqrt(this.maxDotCount * (w / h)));
    const rows = Math.ceil(this.maxDotCount / cols);
    const cellW = w / cols;
    const cellH = h / rows;

    this.dots = [];

    for (let row = 0; row < rows && this.dots.length < this.maxDotCount; row++) {
      for (let col = 0; col < cols && this.dots.length < this.maxDotCount; col++) {
        const jx = (Math.random() - 0.5) * cellW * 0.55;
        const jy = (Math.random() - 0.5) * cellH * 0.55;
        const x = Math.max(24, Math.min(w - 24, (col + 0.5) * cellW + jx));
        const y = Math.max(24, Math.min(h - 24, (row + 0.5) * cellH + jy));

        this.dots.push({
          x,
          y,
          isResource: false,
          pingAge: -1,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    // Place user dot near left-center
    this.userDotIndex = this.findDotNear(w * 0.27, h * 0.58);

    // Select resource (cooling center) dots spread across the canvas
    const occupied = new Set<number>([this.userDotIndex]);
    for (let attempt = 0; attempt < this.resourceCount; attempt++) {
      let best = -1;
      let bestScore = 0;
      for (let j = 0; j < this.dots.length; j++) {
        if (occupied.has(j)) continue;
        const d = this.dots[j];
        // Score: minimum distance to any occupied dot (maximize spread)
        let minDist = Infinity;
        for (const k of occupied) {
          const dk = this.dots[k];
          const dist = Math.hypot(d.x - dk.x, d.y - dk.y);
          if (dist < minDist) minDist = dist;
        }
        if (minDist > bestScore) {
          bestScore = minDist;
          best = j;
        }
      }
      if (best >= 0) {
        this.dots[best].isResource = true;
        occupied.add(best);
      }
    }

    // Find nearest resource dot to user
    this.nearestResourceIndex = this.findNearestResource();

    // Build Manhattan-style path from user to nearest resource
    this.buildPath();
  }

  private findDotNear(tx: number, ty: number): number {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < this.dots.length; i++) {
      const dist = Math.hypot(this.dots[i].x - tx, this.dots[i].y - ty);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  }

  private findNearestResource(): number {
    const user = this.dots[this.userDotIndex];
    if (!user) return 0;
    let nearest = -1;
    let nearestDist = Infinity;
    for (let i = 0; i < this.dots.length; i++) {
      if (!this.dots[i].isResource) continue;
      const dist = Math.hypot(this.dots[i].x - user.x, this.dots[i].y - user.y);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    }
    return nearest >= 0 ? nearest : 0;
  }

  private buildPath(): void {
    const user = this.dots[this.userDotIndex];
    const resource = this.dots[this.nearestResourceIndex];
    if (!user || !resource) return;

    // Manhattan path: horizontal then vertical
    this.pathSegments = [
      { x1: user.x, y1: user.y, x2: resource.x, y2: user.y },
      { x1: resource.x, y1: user.y, x2: resource.x, y2: resource.y },
    ];
  }

  // ─── Rendering ──────────────────────────────────────────────────────────────

  protected draw(ctx: CanvasRenderingContext2D, dt: number): void {
    const w = this.width;
    const h = this.height;
    this.phaseAge += dt;

    // Dark background
    ctx.fillStyle = 'rgba(2,4,8,0.90)';
    ctx.fillRect(0, 0, w, h);

    // Phase 0: emergency vignette + alert wave
    if (this.phase === 0) {
      const pulse = 0.03 + 0.02 * Math.sin(this.phaseAge * 1.8);
      const vignette = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.1, w * 0.5, h * 0.5, h * 0.8);
      vignette.addColorStop(0, 'rgba(239,68,68,0)');
      vignette.addColorStop(1, `rgba(239,68,68,${pulse})`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      this.alertWave = (this.alertWave + dt * 0.45) % 1;
      const waveR = this.alertWave * Math.max(w, h) * 0.9;
      const waveOpacity = (1 - this.alertWave) * 0.18;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, waveR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(239,68,68,${waveOpacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Phase 2+: draw animated path
    if (this.phase >= 2 && this.pathSegments.length > 0) {
      // Animate path drawing in phase 2; show full path in phases 3–4
      if (this.phase === 2) {
        const target = Math.min(this.phaseAge * 1.2, 1);
        this.pathProgress += (target - this.pathProgress) * Math.min(dt * 4, 0.9);
      } else {
        this.pathProgress = Math.min(this.pathProgress + dt * 2, 1);
      }
      this.drawPath(ctx);
    } else if (this.phase < 2) {
      this.pathProgress = 0;
    }

    // Draw all non-user dots
    for (let i = 0; i < this.dots.length; i++) {
      const d = this.dots[i];
      if (i === this.userDotIndex) continue;

      // Update ping animation
      if (d.pingAge >= -0.001) {
        d.pingAge += dt;
        if (d.pingAge > 2.4) {
          // Loop pings in phase 1; stop in later phases
          d.pingAge = this.phase === 1 ? 0 : -1;
        }
      } else if (d.pingAge < 0) {
        d.pingAge += dt; // counting up toward 0 (staggered start)
      }

      this.renderDot(ctx, d, i);
    }

    // User dot drawn on top
    if (this.dots[this.userDotIndex]) {
      this.renderUserDot(ctx, this.dots[this.userDotIndex]);
    }
  }

  private renderDot(ctx: CanvasRenderingContext2D, d: GridDot, i: number): void {
    const pulse = 0.5 + 0.5 * Math.sin(this.phaseAge * 0.9 + d.pulseOffset);
    let r = 6, g = 182, b = 212;
    let alpha: number;
    let dotRadius: number;

    switch (this.phase) {
      case 0: // Emergency, orange-red, dim
        r = 249; g = 115; b = 22;
        alpha = d.isResource ? 0.25 + pulse * 0.08 : 0.07 + pulse * 0.04;
        dotRadius = d.isResource ? 3 : 1.8;
        break;

      case 1: // Discovery, cyan, resources glow
        alpha = d.isResource ? 0.75 + pulse * 0.2 : 0.10 + pulse * 0.04;
        dotRadius = d.isResource ? 3.5 : 1.8;
        break;

      case 2: // Navigate, nearest resource bright, others very dim
        if (i === this.nearestResourceIndex) {
          alpha = 0.9;
          dotRadius = 4.5;
        } else if (d.isResource) {
          alpha = 0.18;
          dotRadius = 2.5;
        } else {
          alpha = 0.05;
          dotRadius = 1.5;
        }
        break;

      case 3: // Decide, resources highlighted for comparison
        alpha = d.isResource ? 0.7 + pulse * 0.2 : 0.05;
        dotRadius = d.isResource ? 4 : 1.5;
        break;

      case 4: // Act, calm uniform glow
        alpha = d.isResource ? 0.45 + pulse * 0.15 : 0.12 + pulse * 0.06;
        dotRadius = d.isResource ? 3 : 1.8;
        break;

      default:
        alpha = 0.1;
        dotRadius = 1.8;
    }

    ctx.beginPath();
    ctx.arc(d.x, d.y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.fill();

    // Ping rings for resource dots
    if (d.isResource && d.pingAge > 0) {
      const progress = Math.min(d.pingAge / 2.0, 1);
      const ringR = progress * 30;
      const ringOpacity = (1 - progress) * 0.55;
      ctx.beginPath();
      ctx.arc(d.x, d.y, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r},${g},${b},${ringOpacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  private renderUserDot(ctx: CanvasRenderingContext2D, d: GridDot): void {
    const pulse = 0.5 + 0.5 * Math.sin(this.phaseAge * 2.2 + d.pulseOffset);

    // Outer pulse ring
    ctx.beginPath();
    ctx.arc(d.x, d.y, 9 + pulse * 3, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${0.12 + pulse * 0.1})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner white dot
    ctx.beginPath();
    ctx.arc(d.x, d.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Cyan center
    ctx.beginPath();
    ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6,182,212,0.95)';
    ctx.fill();
  }

  private drawPath(ctx: CanvasRenderingContext2D): void {
    const totalLength = this.pathSegments.reduce(
      (sum, s) => sum + Math.hypot(s.x2 - s.x1, s.y2 - s.y1),
      0
    );
    const targetLength = totalLength * this.pathProgress;
    let remaining = targetLength;

    ctx.save();
    ctx.strokeStyle = 'rgba(6,182,212,0.45)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.lineDashOffset = -(this.phaseAge * 18) % 10;

    for (const seg of this.pathSegments) {
      const segLen = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1);
      if (remaining <= 0) break;

      const ratio = Math.min(remaining / segLen, 1);
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x1 + (seg.x2 - seg.x1) * ratio, seg.y1 + (seg.y2 - seg.y1) * ratio);
      ctx.stroke();

      remaining -= segLen;
    }

    ctx.restore();
  }

  protected onDestroy(): void {
    this.dots = [];
    this.pathSegments = [];
  }
}
