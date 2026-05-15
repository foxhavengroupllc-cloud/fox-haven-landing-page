"use client";

import {
  Home, ArrowRight, Calendar, ShoppingCart, FileText,
  Users, Bell, CheckSquare, CreditCard, MessageCircle, Play,
} from "lucide-react";
import Link from "next/link";
import { scrollToSection } from "@/lib/scroll";

const hubFeatures = [
  {
    icon: Calendar,
    title: "Shared Family Calendar",
    description: "One calendar for the whole family, synced across everyone's devices with smart scheduling.",
    iconBg: "bg-blue-500/15", iconBorder: "border-blue-500/25", iconColor: "text-blue-400",
  },
  {
    icon: ShoppingCart,
    title: "Smart Grocery Lists",
    description: "Collaborative shopping lists with auto-categorization and pantry tracking.",
    iconBg: "bg-green-500/15", iconBorder: "border-green-500/25", iconColor: "text-green-400",
  },
  {
    icon: FileText,
    title: "Document Vault",
    description: "Secure shared storage for family documents, medical records, insurance, and important files.",
    iconBg: "bg-purple-500/15", iconBorder: "border-purple-500/25", iconColor: "text-purple-400",
  },
  {
    icon: CreditCard,
    title: "Household Budget",
    description: "Track shared expenses, set budgets, and split bills transparently across family members.",
    iconBg: "bg-amber-500/15", iconBorder: "border-amber-500/25", iconColor: "text-amber-400",
  },
  {
    icon: CheckSquare,
    title: "Chore & Task Board",
    description: "Assign chores, track completion, and keep everyone accountable with progress tracking.",
    iconBg: "bg-rose-500/15", iconBorder: "border-rose-500/25", iconColor: "text-rose-400",
  },
  {
    icon: MessageCircle,
    title: "Family Messaging",
    description: "A private family thread separate from work and social noise, just your people.",
    iconBg: "bg-cyan-500/15", iconBorder: "border-cyan-500/25", iconColor: "text-cyan-400",
  },
];

const dashboardItems = [
  { icon: Calendar,    label: "Soccer Practice",  time: "Tue 4:30pm",  iconBg: "bg-blue-500/15",   iconColor: "text-blue-400" },
  { icon: ShoppingCart,label: "Groceries",         time: "12 items",    iconBg: "bg-green-500/15",  iconColor: "text-green-400" },
  { icon: Bell,        label: "Dentist Reminder",  time: "Thu 9am",     iconBg: "bg-amber-500/15",  iconColor: "text-amber-400" },
  { icon: CheckSquare, label: "Lawn, Marcus",     time: "3/5 done",    iconBg: "bg-rose-500/15",   iconColor: "text-rose-400" },
  { icon: CreditCard,  label: "Utilities Bill",    time: "$148 due",    iconBg: "bg-purple-500/15", iconColor: "text-purple-400" },
  { icon: Users,       label: "Family Check-in",   time: "Tonight 7pm", iconBg: "bg-cyan-500/15",   iconColor: "text-cyan-400" },
];

export default function FamilyHub() {
  return (
    <section id="family-hub" className="py-24 lg:py-32 bg-[#020408] circuit-grid relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-400 rounded-full px-4 py-1.5 text-sm font-mono tracking-wider mb-5">
            <Home className="w-4 h-4" />
            INITIATIVE · 03
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Family Hub App
            <br />
            <span className="gradient-text-cool">One App for All of Home</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Modern families juggle a hundred moving pieces. Family Hub brings
            schedules, tasks, budgets, documents, and communication into one
            beautifully simple app, built to actually work the way families do.
          </p>
        </div>

        {/* Dashboard + features */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* App dashboard mock */}
          <div className="relative reveal" style={{ transitionDelay: "0.1s" }}>
            <div className="glass-card border border-blue-500/15 rounded-3xl overflow-hidden hud-corners-blue hud-corners glow-blue">
              {/* App header */}
              <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 px-6 py-5 border-b border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-white/60 text-xs font-mono uppercase tracking-wider">Good morning</div>
                    <div className="text-white font-bold text-xl">The Johnson Family</div>
                  </div>
                  <div className="w-10 h-10 bg-white/10 border border-white/15 rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs font-medium">4 Members</div>
                  <div className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs font-medium">3 Upcoming</div>
                  <div className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-orange-300 text-xs font-medium">2 Due Today</div>
                </div>
              </div>

              {/* Dashboard items */}
              <div className="p-4 bg-black/20">
                <div className="text-slate-600 text-xs font-mono uppercase tracking-wider mb-3 px-2">
                  Today&rsquo;s Overview
                </div>
                <div className="space-y-1.5">
                  {dashboardItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/4 transition-colors cursor-pointer group"
                    >
                      <div className={`w-9 h-9 ${item.iconBg} rounded-lg flex items-center justify-center shrink-0 border border-white/5`}>
                        <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{item.label}</div>
                      </div>
                      <div className="text-slate-600 text-xs shrink-0 font-mono">{item.time}</div>
                    </div>
                  ))}
                </div>

                {/* Quick add */}
                <div className="mt-3 flex items-center gap-2 bg-white/4 border border-white/5 rounded-xl px-4 py-3">
                  <div className="text-slate-600 text-sm flex-1">Add to family...</div>
                  <div className="w-7 h-7 bg-blue-500/80 border border-blue-400/30 rounded-lg flex items-center justify-center glow-blue">
                    <span className="text-white font-bold text-lg leading-none">+</span>
                  </div>
                </div>
              </div>

              {/* Bottom nav */}
              <div className="border-t border-white/5 px-4 py-3 flex justify-around bg-black/30">
                {[
                  { icon: Home,        label: "Home",     active: true },
                  { icon: Calendar,    label: "Calendar", active: false },
                  { icon: CheckSquare, label: "Tasks",    active: false },
                  { icon: Users,       label: "Family",   active: false },
                ].map((nav) => (
                  <div key={nav.label} className="flex flex-col items-center gap-1 cursor-pointer">
                    <nav.icon className={`w-5 h-5 ${nav.active ? "text-blue-400" : "text-slate-600"}`} />
                    <span className={`text-xs ${nav.active ? "text-blue-400 font-semibold" : "text-slate-600"}`}>
                      {nav.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -top-5 -right-5 glass-card rounded-2xl p-4 border border-blue-500/20 max-w-[180px] hud-corners-blue hud-corners">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white">Family Hub</span>
              </div>
              <div className="text-xs text-slate-400">
                📅 Emma&rsquo;s recital is tomorrow at 6pm. 3 family members confirmed.
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold text-white mb-7">
              Everything Your Household Needs
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {hubFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="glass-card border border-white/5 hover:border-blue-500/20 rounded-2xl p-5 card-hover cursor-default"
                >
                  <div className={`w-10 h-10 ${feature.iconBg} border ${feature.iconBorder} rounded-xl flex items-center justify-center mb-3`}>
                    <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <div className="font-semibold text-white text-sm mb-1.5">{feature.title}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="neon-border-animated rounded-3xl p-8 lg:p-12 text-center glass-card reveal" style={{ transitionDelay: "0.3s" }}>
          <h3 className="text-3xl font-bold text-white mb-3">
            Built for Real Families
          </h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            From toddlers to teenagers to aging parents, Family Hub grows with your family
            and adapts to how you actually live.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("#contact")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105 glow-blue cursor-pointer"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/initiatives/family-brain"
              className="inline-flex items-center gap-2 border border-purple-500/30 bg-purple-500/8 hover:bg-purple-500/15 text-purple-400 hover:text-purple-300 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200"
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
