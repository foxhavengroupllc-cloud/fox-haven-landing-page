"use client";

import { Heart, Lightbulb, Globe, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "Every product we build starts with a real community need. We work alongside the people we serve, not just for them.",
    gradient: "from-rose-500 to-pink-600",
    glow: "glow-purple",
    border: "border-rose-500/20",
    hover: "hover:border-rose-500/40",
  },
  {
    icon: Lightbulb,
    title: "Innovation with Purpose",
    description: "Technology is a tool, not a goal. We harness innovation to solve problems that matter, heat, safety, and family wellbeing.",
    gradient: "from-amber-500 to-orange-600",
    glow: "glow-orange",
    border: "border-orange-500/20",
    hover: "hover:border-orange-500/40",
  },
  {
    icon: Globe,
    title: "Scalable Impact",
    description: "We design every solution to grow. What starts in Phoenix can become a national model for resilient, connected communities.",
    gradient: "from-blue-500 to-indigo-600",
    glow: "glow-blue",
    border: "border-blue-500/20",
    hover: "hover:border-blue-500/40",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-slate-950 circuit-grid relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 glass-card border border-white/10 text-slate-400 rounded-full px-4 py-1.5 text-sm font-mono tracking-wider mb-5">
            OUR STORY
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Why Fox Haven Group Exists
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We&rsquo;re a group of innovators, designers, and community advocates who believe
            that technology and thoughtful infrastructure can fundamentally improve lives.
            Our work spans physical infrastructure and digital tools, all connected by a
            single mission: build a better haven for every family.
          </p>
        </div>

        {/* Values cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20 reveal" style={{ transitionDelay: "0.1s" }}>
          {values.map((value) => (
            <div
              key={value.title}
              className={`text-center p-8 rounded-3xl glass-card border ${value.border} ${value.hover} card-hover hud-corners cursor-default group transition-all duration-300`}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg ${value.glow}`}
              >
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white text-xl mb-3">{value.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Quote block */}
        <div className="relative rounded-3xl p-8 lg:p-14 text-center overflow-hidden neon-border-animated glass-card reveal" style={{ transitionDelay: "0.2s" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <div className="text-slate-600 text-xs font-mono tracking-widest uppercase mb-4">
              Our Commitment
            </div>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8 max-w-3xl mx-auto">
              &ldquo;A haven isn&rsquo;t just a place, it&rsquo;s a feeling of safety,
              connection, and possibility. We&rsquo;re building that, one innovation at a time.&rdquo;
            </blockquote>
            <div className="text-slate-600 text-sm font-mono mb-8">,  Fox Haven Group Team</div>
            <button
              onClick={() => scrollToSection("#contact")}
              className="inline-flex items-center gap-2 btn-neon-orange text-white px-7 py-3.5 rounded-xl font-semibold cursor-pointer"
            >
              Work With Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
