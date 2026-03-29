"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  MapPin,
  Zap,
  Shield,
  Users,
  Wind,
  ArrowRight,
  Play,
  Thermometer,
  Clock,
  AlertTriangle,
  Building2,
  Truck,
  FileCheck,
} from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

/* ── Crisis stats ── */
const crisisStats = [
  { value: "645+", label: "Heat deaths in Maricopa County (2023)", icon: AlertTriangle },
  { value: "119°F", label: "Record high in Phoenix", icon: Thermometer },
  { value: "31", label: "Consecutive days above 110°F (2023)", icon: Sun },
  { value: "55", label: "Days above 110°F (2024 season)", icon: Thermometer },
];

/* ── Core feature cards ── */
const features = [
  {
    icon: Sun,
    title: "Solar-Powered Thermal Relief",
    description:
      "Integrated rooftop photovoltaic panels generate all power on-site — running cooling systems, fans, lighting, and charging stations with zero grid dependency. PV surplus powers the full shelter load with capacity to spare.",
  },
  {
    icon: Wind,
    title: "Advanced Cooling Architecture",
    description:
      "High-albedo surfaces, radiant cooling panels, and high-airflow fans deliver measurable thermal-stress reduction. Published research shows 35-45% reduction in thermal stress versus unshaded conditions.",
  },
  {
    icon: Zap,
    title: "Emergency Charging & Connectivity",
    description:
      "Free USB and power outlets keep vulnerable residents connected to 911 services, family, and emergency alerts during heat emergencies when they need it most.",
  },
  {
    icon: Shield,
    title: "ADA Compliant & City-Ready",
    description:
      "Designed to 2010 ADA Standards for Accessible Design — wheelchair-integrated seating, accessible routes, clear floor space at controls, and QR-code emergency call options.",
  },
  {
    icon: MapPin,
    title: "Strategic Heat-Zone Placement",
    description:
      "Sited near bus stops, park nodes, downtown corridors, and \"last-mile\" walking routes to cooling centers — exactly where heat exposure is highest and indoor relief is hardest to reach.",
  },
  {
    icon: Users,
    title: "Scalable Municipal Deployment",
    description:
      "From Phoenix pilot to Maricopa County and beyond. Pre-packaged compliance, standardized specs, and tiered pricing let us scale from pilot MOU to formal procurement at 50+ units.",
  },
];

/* ── Performance metrics ── */
const performanceMetrics = [
  {
    value: "≥30%",
    label: "Thermal Stress Reduction",
    detail: "Benchmarked against unshaded outdoor conditions using standard thermal indices",
  },
  {
    value: "30–40°F",
    label: "MRT Reduction",
    detail: "Mean radiant temperature drop in the occupied zone, consistent with Phoenix pilot data",
  },
  {
    value: "<2 hrs",
    label: "Rapid Deployment",
    detail: "Two-person setup with modular, pre-fabricated components and temporary anchoring",
  },
  {
    value: "8–12",
    label: "Seated Capacity",
    detail: "Plus 6–10 standing/transient occupants in the 150–200 sq ft shelter footprint",
  },
];

/* ── Deployment targets ── */
const deploymentTargets = [
  { icon: Building2, label: "Bus Stops & Transit Hubs", detail: "Highest pedestrian heat exposure" },
  { icon: MapPin, label: "Park Nodes & Trailheads", detail: "Recreation-adjacent relief" },
  { icon: Users, label: "Downtown Service Corridors", detail: "Near respite & social services" },
  { icon: Truck, label: "Last-Mile Cooling Routes", detail: "Bridging gaps to cooling centers" },
];

/* ── Compliance checklist ── */
const complianceItems = [
  { icon: Shield, label: "ADA Title II" },
  { icon: Zap, label: "NRTL-Listed Electrical" },
  { icon: FileCheck, label: "City Permitting Aligned" },
  { icon: Clock, label: "Documented O&M Plan" },
];

export default function SolarShelters() {
  return (
    <section
      id="solar-shelters"
      className="py-24 lg:py-32 bg-slate-950 circuit-grid relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6 reveal">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 text-orange-400 rounded-full px-4 py-1.5 text-sm font-mono tracking-wider mb-5">
              <Sun className="w-4 h-4" />
              INITIATIVE · 01
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Heat Relief
              <br />
              <span className="gradient-text">Solar Shelters</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Phoenix summers are deadly — and getting worse. We&rsquo;re deploying
              modular, solar-powered cooling shelters that deliver measurable
              thermal-stress reduction right where people need it: bus stops,
              park nodes, and the last-mile walking routes where heat kills.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/initiatives/solar-shelter"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-orange-500/40 text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all"
            >
              <Play className="w-4 h-4 text-orange-400" />
              Experience the Shelter
            </Link>
            <button
              onClick={() => scrollToSection("#contact")}
              className="flex items-center gap-2 btn-neon-orange text-white px-7 py-4 rounded-2xl font-semibold text-base cursor-pointer"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Crisis banner ── */}
        <div className="mb-20 reveal">
          <div className="glass-card border border-red-500/20 rounded-3xl p-6 lg:p-8 hud-corners relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs tracking-widest mb-5">
                <AlertTriangle className="w-4 h-4" />
                THE CRISIS — WHY THIS MATTERS
              </div>
              <p className="text-slate-300 leading-relaxed mb-8 max-w-3xl">
                Phoenix has institutionalized extreme-heat response as a
                municipal priority with a dedicated Office of Heat Response and
                Mitigation. But existing infrastructure — indoor cooling centers
                and simple shade canopies — leaves a critical gap. People die on
                the walk <em>to</em> relief, not inside it.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {crisisStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card border border-red-500/10 rounded-2xl p-4 text-center group hover:border-red-500/30 transition-colors"
                  >
                    <stat.icon className="w-5 h-5 text-red-400/60 mx-auto mb-2" />
                    <div className="font-black text-2xl sm:text-3xl text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-slate-500 text-xs leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Design sheet + features ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Design sheet */}
          <div className="relative reveal" style={{ transitionDelay: "0.1s" }}>
            <div className="rounded-3xl overflow-hidden border border-orange-500/20 glow-orange hud-corners">
              {/* Title bar */}
              <div className="bg-black/80 px-5 py-3 flex items-center justify-between border-b border-orange-500/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-slate-500 text-xs font-mono tracking-wide">
                  SHEET A-01 — Modular Solar Cooling Shelter
                </span>
                <span className="text-orange-500/60 text-xs font-mono">PDF</span>
              </div>
              <div className="bg-slate-900/50">
                <Image
                  src="/images/solar-shelter-design.png"
                  alt="Architectural drawings for the modular solar cooling shelter — front elevation, side elevation, plan view, and electrical schematic with insulated R-16 panels, solar-powered A/C, and ADA compliance"
                  width={2125}
                  height={2750}
                  className="w-full h-auto opacity-90"
                  priority
                />
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-5 -left-5 glass-card hud-corners rounded-2xl p-4 border border-orange-500/20 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-orange-500/15 rounded-xl flex items-center justify-center border border-orange-500/20">
                  <Truck className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Rapid Deploy</div>
                  <div className="text-slate-500 text-xs">&lt;2 hrs · 2-person crew</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-5 -right-5 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl shadow-xl px-4 py-3 hidden sm:block glow-orange">
              <div className="text-xs font-semibold opacity-80 mb-0.5 font-mono">MODULAR UNIT</div>
              <div className="font-black text-xl leading-none">8′ × 12′</div>
              <div className="text-xs opacity-80 mt-0.5">Insulated · R-16 · Solar</div>
            </div>
          </div>

          {/* Feature bullets */}
          <div className="space-y-3 lg:pt-2 reveal" style={{ transitionDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold text-white mb-2">
              Thermal-Relief Micro-Infrastructure
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Not just shade — measurable cooling. Our shelters fill the gap
              between indoor cooling centers and simple canopies with a product
              that arrives pre-packaged for municipal procurement.
            </p>
            {features.slice(0, 4).map((f) => (
              <div
                key={f.title}
                className="flex gap-4 p-4 rounded-2xl glass-card border border-white/5 hover:border-orange-500/20 card-hover group cursor-default"
              >
                <div className="w-11 h-11 bg-orange-500/10 group-hover:bg-orange-500/20 border border-orange-500/20 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                  <f.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-slate-500 text-sm leading-relaxed">
                    {f.description}
                  </div>
                </div>
              </div>
            ))}

            {/* Specs strip */}
            <div className="mt-6 grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
              {[
                { label: "Insulation", value: "R-16" },
                { label: "Power", value: "100% Solar" },
                { label: "Access", value: "ADA \u2713" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass-card border border-orange-500/10 rounded-xl p-3 text-center"
                >
                  <div className="font-bold text-orange-400 text-sm">{s.value}</div>
                  <div className="text-slate-600 text-xs mt-0.5 font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Performance metrics ── */}
        <div className="mb-20 reveal" style={{ transitionDelay: "0.15s" }}>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest mb-6">
            <Thermometer className="w-4 h-4" />
            VERIFIED PERFORMANCE TARGETS
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((m) => (
              <div
                key={m.label}
                className="glass-card border border-cyan-500/15 hover:border-cyan-500/30 rounded-2xl p-6 hud-corners-cyan group card-hover cursor-default"
              >
                <div className="font-black text-3xl sm:text-4xl text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {m.value}
                </div>
                <div className="font-semibold text-cyan-400 text-sm mb-2">
                  {m.label}
                </div>
                <div className="text-slate-500 text-xs leading-relaxed">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Deployment targets ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Target locations */}
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            <div className="flex items-center gap-2 text-orange-400 font-mono text-xs tracking-widest mb-6">
              <MapPin className="w-4 h-4" />
              PRIORITY DEPLOYMENT ZONES
            </div>
            <div className="space-y-3">
              {deploymentTargets.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-4 glass-card border border-orange-500/10 hover:border-orange-500/25 rounded-2xl p-5 card-hover cursor-default group"
                >
                  <div className="w-11 h-11 bg-orange-500/10 group-hover:bg-orange-500/20 border border-orange-500/20 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                    <t.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.label}</div>
                    <div className="text-slate-500 text-xs">{t.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance readiness + remaining feature cards */}
          <div className="space-y-4 reveal" style={{ transitionDelay: "0.25s" }}>
            {/* Compliance strip */}
            <div className="glass-card border border-green-500/15 rounded-2xl p-6 hud-corners">
              <div className="flex items-center gap-2 text-green-400 font-mono text-xs tracking-widest mb-5">
                <FileCheck className="w-4 h-4" />
                MUNICIPAL COMPLIANCE READINESS
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Cities don&rsquo;t buy prototypes — they buy risk-managed
                infrastructure. Every shelter ships with pre-packaged compliance
                documentation ready for city inspectors.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {complianceItems.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-2.5 bg-green-500/5 border border-green-500/10 rounded-xl px-4 py-3"
                  >
                    <c.icon className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-white text-sm font-medium">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remaining 2 feature cards */}
            {features.slice(4).map((f) => (
              <div
                key={f.title}
                className="glass-card border border-orange-500/10 hover:border-orange-500/25 rounded-2xl p-6 card-hover hud-corners cursor-default"
              >
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{f.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Community impact CTA strip ── */}
        <div className="reveal" style={{ transitionDelay: "0.3s" }}>
          <div className="glass-card border border-orange-500/15 rounded-3xl p-8 lg:p-10 neon-border-animated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Bridging the Last Mile to Safety
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Our shelters serve the most vulnerable — unsheltered individuals,
                  older adults, outdoor workers, and transit riders in peak heat.
                  Deployed as complementary nodes to existing cooling centers, each
                  unit delivers documented thermal relief, measurable usage data,
                  and a council-ready pilot report that turns one shelter into a
                  citywide network.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/initiatives/solar-shelter"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-orange-500/40 text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all"
                >
                  <Play className="w-4 h-4 text-orange-400" />
                  See It In Action
                </Link>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="flex items-center gap-2 btn-neon-orange text-white px-7 py-4 rounded-2xl font-semibold text-base cursor-pointer"
                >
                  Pilot With Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
