"use client";

import { Sun, Smartphone, Home, Mail, ExternalLink } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const initiatives = [
  { icon: Sun,        label: "Solar Shelters",  href: "#solar-shelters" },
  { icon: Smartphone, label: "Heat Relief App", href: "#heat-relief-app" },
  { icon: Home,       label: "Family Hub",      href: "#family-hub" },
];

const links = {
  Company: [
    { label: "About Us",     href: "#about" },
    { label: "Our Mission",  href: "#about" },
    { label: "Get Involved", href: "#contact" },
    { label: "Contact",      href: "#contact" },
  ],
  Initiatives: [
    { label: "Solar Shelters",  href: "#solar-shelters" },
    { label: "Heat Relief App", href: "#heat-relief-app" },
    { label: "Family Hub",      href: "#family-hub" },
  ],
  Connect: [
    { label: "foxhavengroup.org", href: "#", external: true },
    { label: "Partner Inquiry",   href: "#contact" },
    { label: "Media & Press",     href: "#contact" },
    { label: "Volunteer",         href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#020408] border-t border-cyan-500/8">
      {/* Top divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => scrollToSection("#hero")}
              className="flex items-center gap-3 mb-5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg glow-orange group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-sm">FH</span>
              </div>
              <div>
                <div className="text-white font-bold text-base">Fox Haven Group</div>
                <div className="text-slate-600 text-xs font-mono">foxhavengroup.org</div>
              </div>
            </button>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Building technology and infrastructure that protects lives and empowers
              communities across Phoenix and beyond.
            </p>
            {/* Initiative icons */}
            <div className="flex gap-2">
              {initiatives.map((init) => (
                <button
                  key={init.label}
                  onClick={() => scrollToSection(init.href)}
                  className="w-9 h-9 glass-card border border-white/8 hover:border-cyan-500/30 hover:text-cyan-400 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer group"
                  aria-label={init.label}
                  title={init.label}
                >
                  <init.icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#contact")}
                className="w-9 h-9 glass-card border border-white/8 hover:border-cyan-500/30 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer group"
                aria-label="Contact"
                title="Contact"
              >
                <Mail className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-slate-500 font-mono text-xs mb-5 uppercase tracking-widest">
                {category}
              </div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        className="text-slate-500 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5 font-mono"
                      >
                        {item.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="text-slate-500 hover:text-cyan-400 text-sm transition-colors cursor-pointer text-left"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-700 text-sm font-mono">
            © {new Date().getFullYear()} Fox Haven Group. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-slate-700 text-sm">
            <button className="hover:text-slate-400 transition-colors cursor-pointer font-mono text-xs">Privacy Policy</button>
            <button className="hover:text-slate-400 transition-colors cursor-pointer font-mono text-xs">Terms of Service</button>
            <span className="flex items-center gap-1.5 font-mono text-xs">
              Built with{" "}
              <span className="text-red-500">♥</span>{" "}
              for Phoenix
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
