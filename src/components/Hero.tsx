"use client";

import { ArrowDown, Sun, Smartphone, Home } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const floatingCards = [
  {
    pos: "absolute top-28 right-12 hidden lg:block",
    delay: "0s",
    accent: "border-orange-500/30 bg-orange-500/5",
    label: "INITIATIVE",
    value: "Solar",
    sub: "Heat Relief Shelters · Phoenix",
    dot: "bg-orange-400",
  },
  {
    pos: "absolute top-56 right-36 hidden lg:block",
    delay: "1.5s",
    accent: "border-cyan-500/30 bg-cyan-500/5",
    label: "INITIATIVE",
    value: "App",
    sub: "Heat Relief · Mobile",
    dot: "bg-cyan-400",
  },
  {
    pos: "absolute bottom-52 left-10 hidden lg:block",
    delay: "0.8s",
    accent: "border-blue-500/30 bg-blue-500/5",
    label: "INITIATIVE",
    value: "Hub",
    sub: "Family Hub · Coming Soon",
    dot: "bg-blue-400",
  },
];

export default function Hero() {
  const magnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.18;
    const y = (e.clientY - r.top  - r.height / 2) * 0.18;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };
  const magneticReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient scanlines"
    >
      {/* Circuit grid overlay */}
      <div className="absolute inset-0 circuit-grid opacity-60 pointer-events-none" />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-24 w-[420px] h-[420px] bg-purple-600/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-900/10 rounded-full blur-3xl" />

        {/* Rotating outer ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-cyan-500/5 animate-rotate-slow" />
          <div className="absolute inset-[80px] rounded-full border border-orange-500/5 animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "35s" }} />
        </div>
      </div>

      {/* Floating data cards */}
      {floatingCards.map((card) => (
        <div
          key={card.label}
          className={`${card.pos} animate-float`}
          style={{ animationDelay: card.delay }}
        >
          <div className={`glass-card hud-corners rounded-2xl px-4 py-3 border ${card.accent} min-w-[160px]`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-1.5 h-1.5 rounded-full ${card.dot} animate-pulse`} />
              <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">{card.label}</span>
            </div>
            <div className="text-white font-bold text-xl leading-none mb-1">{card.value}</div>
            <div className="text-slate-500 text-[10px]">{card.sub}</div>
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* HUD badge */}
        <div className="inline-flex items-center gap-2 neon-border-animated rounded-full px-5 py-2 mb-10 animate-fade-in bg-white/3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-300 text-sm font-mono tracking-wider">
            Innovation for Community Well-Being
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08] animate-fade-in-up animate-glitch">
          Building a{" "}
          <span className="holo-text">Better Future</span>
          <br />
          <span className="text-slate-200">for Every Family</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "both" }}
        >
          Fox Haven Group develops technology and infrastructure that
          protect lives, empower communities, and simplify modern family life.
        </p>

        {/* Initiative pills */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.3s", animationFillMode: "both" }}
        >
          {[
            { icon: Sun,        href: "#solar-shelters",  label: "Heat Relief Solar Shelters", color: "border-orange-500/40 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20" },
            { icon: Smartphone, href: "#heat-relief-app", label: "Heat Relief App",             color: "border-red-500/40    bg-red-500/10    text-red-300    hover:bg-red-500/20" },
            { icon: Home,       href: "#family-hub",      label: "Family Hub",                  color: "border-blue-500/40   bg-blue-500/10   text-blue-300   hover:bg-blue-500/20" },
          ].map((pill) => (
            <button
              key={pill.href}
              onClick={() => scrollToSection(pill.href)}
              className={`flex items-center gap-2 border px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${pill.color}`}
            >
              <pill.icon className="w-4 h-4" />
              {pill.label}
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <button
            onClick={() => scrollToSection("#solar-shelters")}
            onMouseMove={magnetic}
            onMouseLeave={magneticReset}
            className="btn-neon-orange text-white px-8 py-4 rounded-2xl font-semibold text-lg cursor-pointer transition-all duration-200"
          >
            Explore Our Work
          </button>
          <button
            onClick={() => scrollToSection("#about")}
            onMouseMove={magnetic}
            onMouseLeave={magneticReset}
            className="glass-card border border-white/15 hover:border-cyan-500/40 hover:text-cyan-300 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 cursor-pointer hover:glow-cyan"
          >
            Our Mission
          </button>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.5s", animationFillMode: "both" }}
        >
          {[
            { value: "3",   label: "Active Initiatives" },
            { value: "PHX", label: "Phoenix & Beyond" },
            { value: "∞",   label: "Impact Potential" },
          ].map((stat) => (
            <div key={stat.label} className="text-center data-line">
              <div className="text-3xl font-bold text-white mb-1 text-glow-cyan">{stat.value}</div>
              <div className="text-slate-600 text-[10px] uppercase tracking-widest font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("#solar-shelters")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-cyan-400 transition-colors animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
}
