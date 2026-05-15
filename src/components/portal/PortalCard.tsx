"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import type { PortalConfig, PortalId } from "./portalConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NetworkRenderer } from "./renderers/NetworkRenderer";
import { AppSimRenderer } from "./renderers/AppSimRenderer";
import { RippleRenderer } from "./renderers/RippleRenderer";

type Renderer = NetworkRenderer | AppSimRenderer | RippleRenderer;

function createRenderer(id: PortalId, canvas: HTMLCanvasElement): Renderer {
  switch (id) {
    case "partner":
      return new NetworkRenderer(canvas);
    case "beta":
      return new AppSimRenderer(canvas);
    case "volunteer":
      return new RippleRenderer(canvas);
  }
}

interface PortalCardProps {
  config: PortalConfig;
  index: number;
  onOpen: (id: PortalId, el: HTMLElement) => void;
}

export default function PortalCard({ config, index, onOpen }: PortalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const rendererRef = useRef<Renderer | null>(null);
  const rafId = useRef(0);
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // Init renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createRenderer(config.id, canvas);
    rendererRef.current = renderer;

    if (reducedMotion) {
      renderer.drawStatic();
    } else {
      renderer.start();
    }

    const ro = new ResizeObserver(() => {
      renderer.handleResize();
      if (reducedMotion) renderer.drawStatic();
    });
    ro.observe(canvas);

    return () => {
      renderer.stop();
      ro.disconnect();
      rendererRef.current = null;
    };
  }, [config.id, reducedMotion]);

  // Hover state → renderer
  useEffect(() => {
    rendererRef.current?.setHovered(hovered);
  }, [hovered]);

  // Tilt effect
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion) return;
      const el = cardRef.current;
      if (!el) return;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const ratioX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ratioY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        const rotateX = -ratioY * 14;
        const rotateY = ratioX * 14;
        el.style.transition = "none";
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
      });
    },
    [reducedMotion]
  );

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(rafId.current);
    el.style.transition =
      "transform 0.5s ease-out, box-shadow 0.4s ease-out";
    el.style.transform = "";
  }, []);

  const handleClick = () => {
    const el = cardRef.current;
    if (el) onOpen(config.id, el);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${config.title}, ${config.subtitle}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="portal-card relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#0b1c2e]/50 cursor-pointer group reveal"
      style={{
        transitionDelay: `${index * 0.08}s`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        animation: reducedMotion
          ? "none"
          : `portalFloat ${3 + index * 0.4}s ease-in-out infinite`,
        animationDelay: `${index * 0.6}s`,
      }}
    >
      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-400"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${config.accentColor}40, 0 0 30px ${config.accentGlow}`,
        }}
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-10 p-7 flex flex-col h-full min-h-[220px]">
        <div className="text-2xl mb-3">{config.icon}</div>

        <h3 className="font-body text-[16px] font-bold text-[#f4ede0] mb-1">
          {config.title}
        </h3>
        <p
          className="font-mono text-[11px] tracking-wider uppercase mb-3 transition-opacity duration-300"
          style={{ color: config.accentColor, opacity: hovered ? 1 : 0.5 }}
        >
          {config.subtitle}
        </p>

        <p className="font-body text-[13px] text-[#f4ede0]/40 leading-relaxed flex-1">
          {config.description}
        </p>

        <span
          className="font-body text-[13px] font-medium mt-4 inline-flex items-center gap-1 transition-all duration-300"
          style={{
            color: config.accentColor,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          {config.cta}
        </span>
      </div>
    </div>
  );
}
