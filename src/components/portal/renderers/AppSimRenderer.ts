/**
 * AppSimRenderer, "Join the App Beta" portal animation.
 * Abstract phone wireframe with auto-scrolling UI elements.
 * Conveys a product being built and refined.
 */

interface UIElement {
  y: number;
  w: number;
  h: number;
  type: "bar" | "card" | "button" | "line";
  fillProgress: number;
}

export class AppSimRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number;
  private width = 0;
  private height = 0;
  private hovered = false;
  private modeBlend = 0;
  private rafId: number | null = null;
  private lastTime = 0;
  private scrollOffset = 0;
  private elements: UIElement[] = [];
  private cursorY = 0;
  private cursorBlink = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("AppSimRenderer: no 2D context");
    this.ctx = ctx;

    this.handleResize();
    this.initElements();
  }

  private initElements(): void {
    this.elements = [];
    const types: UIElement["type"][] = ["bar", "card", "line", "line", "card", "button", "line", "line", "card", "line"];
    let y = 40;
    for (const type of types) {
      const h = type === "bar" ? 8 : type === "card" ? 28 : type === "button" ? 14 : 6;
      const w = type === "bar" ? 0.6 + Math.random() * 0.3 : type === "button" ? 0.4 : type === "line" ? 0.5 + Math.random() * 0.4 : 0.85;
      this.elements.push({ y, w, h, type, fillProgress: 0 });
      y += h + (type === "card" ? 10 : 6);
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
    this.initElements();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawFrame(0, 0);
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

    // Phone bezel dimensions
    const phoneW = w * 0.52;
    const phoneH = h * 0.82;
    const phoneX = (w - phoneW) / 2;
    const phoneY = (h - phoneH) / 2;
    const cornerR = 12;
    const padding = 10;

    // Phone bezel outline
    ctx.strokeStyle = `rgba(6,182,212,${0.15 + blend * 0.15})`;
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.stroke();

    // Notch
    const notchW = phoneW * 0.3;
    ctx.fillStyle = `rgba(6,182,212,${0.1 + blend * 0.08})`;
    this.roundRect(ctx, phoneX + (phoneW - notchW) / 2, phoneY, notchW, 6, 3);
    ctx.fill();

    // Auto-scroll
    const scrollSpeed = 6 + blend * 10;
    this.scrollOffset += dt * scrollSpeed;
    if (this.scrollOffset > 60) this.scrollOffset = 0;

    // Draw UI elements inside phone
    ctx.save();
    ctx.beginPath();
    this.roundRect(ctx, phoneX + 2, phoneY + 10, phoneW - 4, phoneH - 14, cornerR - 2);
    ctx.clip();

    const innerX = phoneX + padding;
    const innerW = phoneW - padding * 2;

    for (const el of this.elements) {
      const elY = phoneY + 16 + el.y - this.scrollOffset;
      if (elY + el.h < phoneY || elY > phoneY + phoneH) continue;

      // Fill progress on hover
      if (blend > 0 && el.type === "bar") {
        el.fillProgress = Math.min(el.fillProgress + dt * 0.8, 1);
      }

      const alpha = 0.12 + blend * 0.12;
      const elW = innerW * el.w;

      if (el.type === "card") {
        ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
        ctx.lineWidth = 1;
        this.roundRect(ctx, innerX, elY, elW, el.h, 4);
        ctx.stroke();
      } else if (el.type === "bar") {
        // Background
        ctx.fillStyle = `rgba(6,182,212,${alpha * 0.5})`;
        this.roundRect(ctx, innerX, elY, elW, el.h, 3);
        ctx.fill();
        // Fill
        if (el.fillProgress > 0) {
          ctx.fillStyle = `rgba(6,182,212,${0.3 + blend * 0.2})`;
          this.roundRect(ctx, innerX, elY, elW * el.fillProgress, el.h, 3);
          ctx.fill();
        }
      } else if (el.type === "button") {
        ctx.fillStyle = `rgba(6,182,212,${0.15 + blend * 0.15})`;
        this.roundRect(ctx, innerX, elY, elW, el.h, 7);
        ctx.fill();
      } else {
        // Line placeholder
        ctx.fillStyle = `rgba(6,182,212,${alpha * 0.6})`;
        this.roundRect(ctx, innerX, elY, elW, el.h, 2);
        ctx.fill();
      }
    }

    // Blinking cursor
    this.cursorBlink += dt;
    this.cursorY = phoneY + 50 + Math.sin(time * 0.7) * 20;
    if (Math.sin(this.cursorBlink * 4) > 0) {
      ctx.fillStyle = `rgba(6,182,212,${0.4 + blend * 0.3})`;
      ctx.beginPath();
      ctx.arc(innerX + 4, this.cursorY, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Scan line on hover
    if (blend > 0.1) {
      const scanY = phoneY + ((time * 40) % phoneH);
      const scanGrad = ctx.createLinearGradient(phoneX, scanY - 4, phoneX, scanY + 4);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, `rgba(6,182,212,${0.08 * blend})`);
      scanGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(phoneX, scanY - 4, phoneW, 8);
    }

    ctx.restore();

    // Center glow
    const cGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.4);
    cGrad.addColorStop(0, `rgba(6,182,212,${0.04 + blend * 0.04})`);
    cGrad.addColorStop(1, "transparent");
    ctx.fillStyle = cGrad;
    ctx.fillRect(0, 0, w, h);
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}
