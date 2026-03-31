/**
 * NetworkRenderer — "Partner with Us" portal animation.
 * Drifting nodes connected by proximity-based edges.
 * Conveys ecosystem, partnership, and interconnection.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
}

export class NetworkRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number;
  private width = 0;
  private height = 0;
  private nodes: Node[] = [];
  private hovered = false;
  private modeBlend = 0;
  private rafId: number | null = null;
  private lastTime = 0;
  private accentColor: string;

  constructor(canvas: HTMLCanvasElement, accent = "#e05e14") {
    this.canvas = canvas;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.accentColor = accent;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("NetworkRenderer: no 2D context");
    this.ctx = ctx;

    this.handleResize();
    this.initNodes();
  }

  private initNodes(): void {
    this.nodes = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        radius: 2 + Math.random() * 2.5,
        pulseOffset: Math.random() * Math.PI * 2,
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
    this.initNodes();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawFrame(0, 0);
  }

  private tick = (timestamp: number): void => {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;

    // Lerp modeBlend
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

    // Update node positions
    const speed = 1 + blend * 0.8;
    for (const node of this.nodes) {
      node.x += node.vx * dt * speed;
      node.y += node.vy * dt * speed;

      // Bounce off edges
      if (node.x < 0 || node.x > w) {
        node.vx *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
      }
      if (node.y < 0 || node.y > h) {
        node.vy *= -1;
        node.y = Math.max(0, Math.min(h, node.y));
      }
    }

    // Draw edges
    const threshold = 90 + blend * 50;
    ctx.lineWidth = 1;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          const alpha = (1 - dist / threshold) * (0.08 + blend * 0.12);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const node of this.nodes) {
      const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.3 + 0.7;
      const alpha = (0.35 + blend * 0.35) * pulse;
      const r = node.radius * (1 + blend * 0.4);

      // Glow halo on hover
      if (blend > 0.01) {
        const grad = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, r * 4
        );
        grad.addColorStop(0, `rgba(224,94,20,${0.15 * blend})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(224,94,20,${alpha})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Center radial glow
    const centerGrad = ctx.createRadialGradient(
      w / 2, h / 2, 0,
      w / 2, h / 2, w * 0.4
    );
    centerGrad.addColorStop(0, `rgba(224,94,20,${0.06 + blend * 0.06})`);
    centerGrad.addColorStop(1, "transparent");
    ctx.fillStyle = centerGrad;
    ctx.fillRect(0, 0, w, h);
  }
}
