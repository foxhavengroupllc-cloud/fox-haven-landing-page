/**
 * OrbitalRenderer, Canvas 2D orbital node system for the Family Brain experience.
 *
 * Renders a constellation of colored nodes representing family life domains
 * (calendar, tasks, groceries, budget, documents, messages).
 *
 * Visual arc matches the narrative emotional arc:
 *   Phase 0, Chaos:         nodes scattered, erratic bounce physics
 *   Phase 1, Fragmentation: nodes cluster by category, isolated silos
 *   Phase 2, Organize:      nodes converge to calm orbits around a home node
 *   Phase 3, Intelligence:  same orbit, nodes pulse softly (AI annotation on DOM)
 *   Phase 4, Clarity:       slowest orbit, maximum glow, resolved calm
 *
 * Extends Canvas2DRenderer (Phase 2 engine).
 * Does NOT contain project-specific copy or UI, only visual rendering.
 *
 * Color grammar: blue/purple/multi-category, distinct from orange (shelter) and cyan (heat app).
 */

import { Canvas2DRenderer } from '../../renderers/Canvas2DRenderer';
import type { Canvas2DRendererOptions } from '../../renderers/Canvas2DRenderer';

// ─── Category Definitions ─────────────────────────────────────────────────────

const CATEGORIES = [
  { name: 'calendar',  r: 59,  g: 130, b: 246 }, // blue-500
  { name: 'tasks',     r: 244, g: 63,  b: 94  }, // rose-500
  { name: 'groceries', r: 34,  g: 197, b: 94  }, // green-500
  { name: 'documents', r: 168, g: 85,  b: 247 }, // purple-500
  { name: 'budget',    r: 245, g: 158, b: 11  }, // amber-500
  { name: 'messages',  r: 6,   g: 182, b: 212 }, // cyan-500
] as const;

const CAT_COUNT = CATEGORIES.length;

// ─── Node ─────────────────────────────────────────────────────────────────────

interface OrbitalNode {
  x: number;
  y: number;
  vx: number;              // phase-0 velocity
  vy: number;
  category: number;        // 0–5 index into CATEGORIES
  size: number;
  /** orbital angle in radians, increments in phase 2+ */
  orbitAngle: number;
  /** rad/s orbital speed (negative = clockwise) */
  orbitSpeed: number;
  /** distance from canvas center for this node's orbit ring */
  orbitRadius: number;
  /** cluster group center: stable in phase 1 */
  clusterX: number;
  clusterY: number;
  /** offset within cluster */
  clusterOffsetAngle: number;
  clusterOffsetRadius: number;
  /** impulse countdown timer (phase 0) */
  impulseTimer: number;
  impulseInterval: number;
  /** for breathing / pulse animations */
  pulseOffset: number;
}

// ─── Renderer Options ─────────────────────────────────────────────────────────

export interface OrbitalRendererOptions extends Canvas2DRendererOptions {
  /** Total node count at standard tier. Default: 48 */
  nodeCount?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ─── OrbitalRenderer ──────────────────────────────────────────────────────────

export class OrbitalRenderer extends Canvas2DRenderer {
  private nodes: OrbitalNode[] = [];
  private phase = 0;
  private phaseAge = 0;
  private totalAge = 0;
  private readonly nodeCount: number;
  private gridBuilt = false;

  // Orbit rings: 3 concentric rings around center
  private static readonly ORBIT_RINGS = [
    { radius: 0.18, speed:  0.40, capacity: 8 },
    { radius: 0.30, speed: -0.25, capacity: 16 },
    { radius: 0.42, speed:  0.18, capacity: 24 },
  ];

  constructor(canvas: HTMLCanvasElement, options: OrbitalRendererOptions) {
    super(canvas, options);
    this.nodeCount = options.nodeCount ?? 48;
  }

  setPhase(phase: number): void {
    const p = Math.max(0, Math.min(4, Math.round(phase)));
    if (p === this.phase) return;
    this.phase = p;
    this.phaseAge = 0;
  }

  protected onStart(): void {
    this.buildNodes();
    this.gridBuilt = true;
  }

  protected onResize(): void {
    if (this.gridBuilt) this.buildNodes();
  }

  // ─── Node Construction ────────────────────────────────────────────────────

  private buildNodes(): void {
    const w = this.width;
    const h = this.height;
    if (w === 0 || h === 0) return;

    const cx = w * 0.5;
    const cy = h * 0.5;
    const minDim = Math.min(w, h);

    this.nodes = [];

    // Build cluster centers in a hexagonal arrangement around the viewport
    const clusterAngleStep = (Math.PI * 2) / CAT_COUNT;
    const clusterRadius = minDim * 0.33;
    const clusterCenters = Array.from({ length: CAT_COUNT }, (_, i) => ({
      x: cx + clusterRadius * Math.cos(clusterAngleStep * i - Math.PI / 2),
      y: cy + clusterRadius * Math.sin(clusterAngleStep * i - Math.PI / 2),
    }));

    // Assign nodes to orbit rings round-robin
    const rings = OrbitalRenderer.ORBIT_RINGS;
    let ringAssignment = 0;
    let ringCount = [0, 0, 0];

    for (let i = 0; i < this.nodeCount; i++) {
      const cat = i % CAT_COUNT;
      const nodesPerCat = Math.floor(this.nodeCount / CAT_COUNT);
      const offsetIndex = Math.floor(i / CAT_COUNT);

      // Assign to ring with space, cycling
      while (ringCount[ringAssignment] >= rings[ringAssignment].capacity) {
        ringAssignment = (ringAssignment + 1) % rings.length;
      }
      const ring = rings[ringAssignment];
      ringCount[ringAssignment]++;
      const actualRingIdx = ringAssignment;
      ringAssignment = (ringAssignment + 1) % rings.length;

      // Spread nodes evenly around the orbit ring, offset by category
      const totalInRing = ring.capacity;
      const ringSlot = ringCount[actualRingIdx] - 1;
      const baseOrbitAngle =
        (ringSlot / totalInRing) * Math.PI * 2 + (cat / CAT_COUNT) * 0.5;

      // Cluster position, within the category's cluster
      const clusterCx = clusterCenters[cat].x;
      const clusterCy = clusterCenters[cat].y;
      const clusterOffsetAngle = (offsetIndex / nodesPerCat) * Math.PI * 2;
      const clusterOffsetRadius = 20 + Math.random() * 25;

      const node: OrbitalNode = {
        // Chaos start positions, scattered
        x: w * 0.1 + Math.random() * w * 0.8,
        y: h * 0.1 + Math.random() * h * 0.8,
        vx: (Math.random() - 0.5) * 120,
        vy: (Math.random() - 0.5) * 120,
        category: cat,
        size: 3 + Math.random() * 4,
        orbitAngle: baseOrbitAngle,
        orbitSpeed: ring.speed * (0.8 + Math.random() * 0.4),
        orbitRadius: ring.radius * minDim * (0.9 + Math.random() * 0.2),
        clusterX: clusterCx,
        clusterY: clusterCy,
        clusterOffsetAngle,
        clusterOffsetRadius,
        impulseTimer: Math.random() * 2,
        impulseInterval: 1.5 + Math.random() * 2,
        pulseOffset: Math.random() * Math.PI * 2,
      };

      this.nodes.push(node);
    }
  }

  // ─── Rendering ────────────────────────────────────────────────────────────

  protected draw(ctx: CanvasRenderingContext2D, dt: number): void {
    const w = this.width;
    const h = this.height;
    const cx = w * 0.5;
    const cy = h * 0.5;
    this.phaseAge += dt;
    this.totalAge += dt;

    // Dark background with subtle bleed of the active state color
    ctx.fillStyle = 'rgba(2,4,8,0.88)';
    ctx.fillRect(0, 0, w, h);

    // Phase 2+: soft central glow (the "home" radiates calm)
    if (this.phase >= 2) {
      const glowOpacity = Math.min(this.phaseAge * 0.25, 0.08);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
      glow.addColorStop(0, `rgba(168,85,247,${glowOpacity})`);
      glow.addColorStop(0.5, `rgba(59,130,246,${glowOpacity * 0.5})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
    }

    // Update nodes
    for (const node of this.nodes) {
      this.updateNode(node, dt, cx, cy, w, h);
    }

    // Draw connections (phase 2+)
    if (this.phase >= 2) {
      this.drawConnections(ctx);
    }

    // Draw orbit ring guides (phase 2+)
    if (this.phase >= 2) {
      this.drawOrbitRings(ctx, cx, cy);
    }

    // Draw nodes
    for (const node of this.nodes) {
      this.renderNode(ctx, node);
    }

    // Draw home node (phase 2+)
    if (this.phase >= 2) {
      this.drawHomeNode(ctx, cx, cy);
    }
  }

  private updateNode(
    node: OrbitalNode,
    dt: number,
    cx: number,
    cy: number,
    w: number,
    h: number
  ): void {
    switch (this.phase) {
      case 0:
        this.updateChaos(node, dt, w, h);
        break;

      case 1: {
        const tx = node.clusterX + node.clusterOffsetRadius * Math.cos(node.clusterOffsetAngle);
        const ty = node.clusterY + node.clusterOffsetRadius * Math.sin(node.clusterOffsetAngle);
        const lerpRate = Math.min(this.phaseAge * 0.8, 1.5);
        node.x += (tx - node.x) * lerpRate * dt;
        node.y += (ty - node.y) * lerpRate * dt;
        break;
      }

      case 2:
      case 3:
      case 4: {
        node.orbitAngle += node.orbitSpeed * dt;
        const tx = cx + node.orbitRadius * Math.cos(node.orbitAngle);
        const ty = cy + node.orbitRadius * Math.sin(node.orbitAngle);
        const speed = this.phase === 4 ? 8.0 : 6.0;
        node.x += (tx - node.x) * speed * dt;
        node.y += (ty - node.y) * speed * dt;
        break;
      }
    }
  }

  private updateChaos(node: OrbitalNode, dt: number, w: number, h: number): void {
    // Random impulse on timer
    node.impulseTimer -= dt;
    if (node.impulseTimer <= 0) {
      node.vx += (Math.random() - 0.5) * 180;
      node.vy += (Math.random() - 0.5) * 180;
      node.impulseTimer = node.impulseInterval;
      // Clamp speed
      const speed = Math.hypot(node.vx, node.vy);
      if (speed > 200) {
        node.vx = (node.vx / speed) * 200;
        node.vy = (node.vy / speed) * 200;
      }
    }

    // Integrate
    node.x += node.vx * dt;
    node.y += node.vy * dt;

    // Wall bounce with margin
    const m = 30;
    if (node.x < m) { node.x = m; node.vx = Math.abs(node.vx); }
    if (node.x > w - m) { node.x = w - m; node.vx = -Math.abs(node.vx); }
    if (node.y < m) { node.y = m; node.vy = Math.abs(node.vy); }
    if (node.y > h - m) { node.y = h - m; node.vy = -Math.abs(node.vy); }

    // Light drag
    node.vx *= 1 - 0.4 * dt;
    node.vy *= 1 - 0.4 * dt;
  }

  private drawConnections(ctx: CanvasRenderingContext2D): void {
    const connectionOpacity = Math.min(this.phaseAge * 0.3, 0.15);
    if (connectionOpacity <= 0) return;

    ctx.save();
    // Group by category and draw lines between same-category nodes
    for (let cat = 0; cat < CAT_COUNT; cat++) {
      const catNodes = this.nodes.filter((n) => n.category === cat);
      const c = CATEGORIES[cat];
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${connectionOpacity})`;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < catNodes.length - 1; i++) {
        const a = catNodes[i];
        const b = catNodes[i + 1];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  private drawOrbitRings(ctx: CanvasRenderingContext2D, cx: number, cy: number): void {
    const ringOpacity = Math.min(this.phaseAge * 0.15, 0.06);
    if (ringOpacity <= 0) return;

    const minDim = Math.min(this.width, this.height);
    ctx.save();
    ctx.strokeStyle = `rgba(168,85,247,${ringOpacity})`;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 6]);

    for (const ring of OrbitalRenderer.ORBIT_RINGS) {
      const r = ring.radius * minDim;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.restore();
  }

  private renderNode(ctx: CanvasRenderingContext2D, node: OrbitalNode): void {
    const cat = CATEGORIES[node.category];
    const pulse = 0.5 + 0.5 * Math.sin(this.totalAge * 1.2 + node.pulseOffset);

    let alpha: number;
    let extraGlow = false;

    switch (this.phase) {
      case 0:
        // Chaos: muted, flickering
        alpha = 0.25 + pulse * 0.15;
        break;
      case 1:
        // Fragmentation: category-bright within cluster
        alpha = 0.55 + pulse * 0.2;
        break;
      case 2:
        // Organize: nodes arrive and settle
        alpha = 0.65 + pulse * 0.2;
        extraGlow = true;
        break;
      case 3:
        // Intelligence: slightly dimmed so AI annotations stand out
        alpha = 0.55 + pulse * 0.15;
        extraGlow = true;
        break;
      case 4:
        // Clarity: full glow
        alpha = 0.8 + pulse * 0.2;
        extraGlow = true;
        break;
      default:
        alpha = 0.4;
    }

    const r = node.size;

    // Soft radial glow
    if (extraGlow) {
      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
      grad.addColorStop(0, `rgba(${cat.r},${cat.g},${cat.b},${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(${cat.r},${cat.g},${cat.b},0)`);
      ctx.beginPath();
      ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Core dot
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${cat.r},${cat.g},${cat.b},${alpha})`;
    ctx.fill();
  }

  private drawHomeNode(ctx: CanvasRenderingContext2D, cx: number, cy: number): void {
    const appear = Math.min(this.phase >= 2 ? this.phaseAge * 0.5 : 0, 1);
    if (appear <= 0) return;

    const pulse = 0.5 + 0.5 * Math.sin(this.totalAge * 0.8);
    const radius = 8 + pulse * 2;

    // Outer soft ring
    const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 4);
    outerGrad.addColorStop(0, `rgba(255,255,255,${appear * 0.12})`);
    outerGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 4, 0, Math.PI * 2);
    ctx.fillStyle = outerGrad;
    ctx.fill();

    // White core
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${appear * 0.9})`;
    ctx.fill();

    // Purple inner
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168,85,247,${appear * 0.8})`;
    ctx.fill();
  }

  protected onDestroy(): void {
    this.nodes = [];
  }
}
