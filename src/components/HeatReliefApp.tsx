"use client";

import { Smartphone, Bell, MapPin, Thermometer, ArrowRight, AlertTriangle, Navigation, Heart, Clock, Play } from "lucide-react";
import Link from "next/link";
import { scrollToSection } from "@/lib/scroll";

/* Explicit Tailwind-safe classes, no dynamic class construction */
const appFeatures = [
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Push notifications for extreme heat warnings, cooling center openings, and emergency resources in your area.",
    iconBg:   "bg-red-500/15",
    iconBorder: "border-red-500/25",
    iconColor: "text-red-400",
  },
  {
    icon: MapPin,
    title: "Cooling Center Map",
    description: "Live map of open cooling centers, misting stations, and solar shelters, updated in real time.",
    iconBg:   "bg-orange-500/15",
    iconBorder: "border-orange-500/25",
    iconColor: "text-orange-400",
    href: "/initiatives/heat-relief-app?phase=3",
  },
  {
    icon: Thermometer,
    title: "Heat Index Tracker",
    description: "Hyper-local heat index readings with hourly forecasts and personalized safety thresholds.",
    iconBg:   "bg-amber-500/15",
    iconBorder: "border-amber-500/25",
    iconColor: "text-amber-400",
  },
  {
    icon: Heart,
    title: "Wellness Check-Ins",
    description: "Automated wellness check-ins for elderly or vulnerable residents, alerting designated contacts if needed.",
    iconBg:   "bg-rose-500/15",
    iconBorder: "border-rose-500/25",
    iconColor: "text-rose-400",
  },
  {
    icon: Navigation,
    title: "Route Safety Scores",
    description: "Walking and transit routes scored by heat exposure risk, helping you plan the safest path.",
    iconBg:   "bg-orange-500/15",
    iconBorder: "border-orange-500/25",
    iconColor: "text-orange-400",
  },
  {
    icon: Clock,
    title: "Emergency History",
    description: "Track your heat safety over time and share reports with healthcare providers.",
    iconBg:   "bg-red-500/15",
    iconBorder: "border-red-500/25",
    iconColor: "text-red-400",
  },
];

const mockScreens = [
  {
    label: "Heat Alert",
    icon: AlertTriangle,
    bg: "from-red-600 to-orange-600",
    content: [
      { type: "header", text: "⚠️ EXTREME HEAT WARNING" },
      { type: "temp",   text: "116°F" },
      { type: "sub",    text: "Heat index: 122°F" },
      { type: "badge",  text: "Dangerous, Take Action Now" },
      { type: "item",   text: "📍 3 cooling centers nearby" },
      { type: "item",   text: "🔋 2 charging stations open" },
      { type: "button", text: "Find Shelter Now" },
    ],
  },
  {
    label: "Nearby Resources",
    icon: MapPin,
    bg: "from-slate-800 to-slate-900",
    content: [
      { type: "header", text: "Cooling Centers Near You" },
      { type: "item",   text: "🏛️ Burton Barr Library, 0.3mi" },
      { type: "item",   text: "🏪 Albertsons (AC), 0.5mi" },
      { type: "item",   text: "⛪ St. Mary's, 0.8mi" },
      { type: "divider", text: "" },
      { type: "item",   text: "☀️ Solar Shelter #1, 0.2mi" },
      { type: "item",   text: "☀️ Solar Shelter #2, 0.6mi" },
      { type: "button", text: "Get Directions" },
    ],
  },
];

export default function HeatReliefApp() {
  return (
    <section id="heat-relief-app" className="py-24 lg:py-32 bg-slate-950 circuit-grid relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-orange-900/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-20 reveal">
          <div className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 text-red-400 rounded-full px-4 py-1.5 text-sm font-mono tracking-wider mb-5">
            <Smartphone className="w-4 h-4" />
            INITIATIVE · 02
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Heat Relief App
            <br />
            <span className="shimmer-text">Alerts That Save Lives</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A mobile-first platform that connects Phoenix residents to real-time heat
            emergency alerts, cooling resources, and safety guidance, when every
            minute matters.
          </p>
        </div>

        {/* Phone mockups + features */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Phones */}
          <div className="flex justify-center gap-6 relative reveal" style={{ transitionDelay: "0.1s" }}>
            {mockScreens.map((screen, i) => (
              <div
                key={screen.label}
                className={`relative w-52 ${i === 0 ? "mt-0" : "mt-12"}`}
                style={{ zIndex: i === 0 ? 10 : 5 }}
              >
                {/* Neon glow under phone */}
                <div className={`absolute -inset-2 rounded-[3rem] blur-xl opacity-20 bg-gradient-to-b ${screen.bg} pointer-events-none`} />

                {/* Phone frame */}
                <div className="relative bg-slate-800/80 rounded-[2.5rem] p-2 shadow-2xl border border-white/10 hud-corners-cyan hud-corners">
                  <div className="bg-slate-900 rounded-[2rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="flex justify-between items-center px-5 py-2 bg-black/60">
                      <span className="text-white text-xs font-semibold font-mono">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-1.5 bg-white rounded-sm" />
                        <div className="w-1 h-1.5 bg-white/40 rounded-sm" />
                      </div>
                    </div>
                    {/* Screen content */}
                    <div className={`bg-gradient-to-b ${screen.bg} min-h-[380px] p-4 flex flex-col gap-2`}>
                      {screen.content.map((item, j) => (
                        <div key={j}>
                          {item.type === "header"  && <div className="text-white font-bold text-sm text-center py-1">{item.text}</div>}
                          {item.type === "temp"    && <div className="text-white font-black text-5xl text-center py-2">{item.text}</div>}
                          {item.type === "sub"     && <div className="text-white/60 text-xs text-center">{item.text}</div>}
                          {item.type === "badge"   && <div className="bg-white/15 text-white text-xs rounded-lg px-3 py-2 text-center font-semibold my-1 border border-white/10">{item.text}</div>}
                          {item.type === "item"    && <div className="bg-white/8 rounded-lg px-3 py-2 text-white text-xs border border-white/5">{item.text}</div>}
                          {item.type === "divider" && <div className="border-t border-white/15 my-1" />}
                          {item.type === "button"  && <div className="bg-white text-slate-900 rounded-xl px-4 py-2.5 text-xs font-bold text-center mt-2 cursor-pointer">{item.text}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4 text-slate-500 text-xs font-mono tracking-wider">
                  {screen.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature list */}
          <div className="space-y-3 reveal" style={{ transitionDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold text-white mb-7">
              Everything You Need in a Heat Emergency
            </h3>
            {appFeatures.slice(0, 4).map((feature) => {
              const inner = (
                <>
                  <div className={`w-11 h-11 ${feature.iconBg} border ${feature.iconBorder} rounded-xl flex items-center justify-center shrink-0`}>
                    <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white mb-1 flex items-center gap-2">
                      {feature.title}
                      {'href' in feature && (
                        <ArrowRight className="w-3.5 h-3.5 text-orange-400/60 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
                      )}
                    </div>
                    <div className="text-slate-500 text-sm leading-relaxed">{feature.description}</div>
                  </div>
                </>
              );
              return 'href' in feature ? (
                <Link
                  key={feature.title}
                  href={feature.href as string}
                  className="flex gap-4 p-5 rounded-2xl glass-card border border-white/5 hover:border-orange-500/30 card-hover cursor-pointer group transition-colors duration-200"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={feature.title}
                  className="flex gap-4 p-5 rounded-2xl glass-card border border-white/5 hover:border-red-500/20 card-hover cursor-default group"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12 reveal" style={{ transitionDelay: "0.3s" }}>
          {appFeatures.slice(4).map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 p-5 rounded-2xl glass-card border border-white/5 hover:border-red-500/20 card-hover cursor-default"
            >
              <div className={`w-11 h-11 ${feature.iconBg} border ${feature.iconBorder} rounded-xl flex items-center justify-center shrink-0`}>
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <div>
                <div className="font-semibold text-white mb-1">{feature.title}</div>
                <div className="text-slate-500 text-sm leading-relaxed">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center reveal" style={{ transitionDelay: "0.4s" }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("#contact")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 hover:scale-105 glow-orange cursor-pointer"
            >
              Join the Beta
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/initiatives/heat-relief-app"
              className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/8 hover:bg-cyan-500/15 text-cyan-400 hover:text-cyan-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              Experience the App
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
