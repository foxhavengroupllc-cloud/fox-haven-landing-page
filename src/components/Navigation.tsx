"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const navLinks = [
  { label: "Solar Shelters",  href: "#solar-shelters" },
  { label: "Heat Relief App", href: "#heat-relief-app" },
  { label: "Family Hub",      href: "#family-hub" },
  { label: "About",           href: "#about" },
  { label: "Contact",         href: "#contact" },
];

export default function Navigation() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur ${
        scrolled
          ? "bg-black/70 border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg glow-orange group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-sm">FH</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-orange-500 ping-ring text-orange-500 opacity-0 group-hover:opacity-100" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Fox Haven <span className="text-orange-400">Group</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative text-slate-400 hover:text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-cyan-500/5 cursor-pointer group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-cyan-400 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-neon-orange text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            >
              Get Involved
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-400 hover:text-cyan-400 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-2xl border-t border-white/5 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full btn-neon-orange text-white px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer"
            >
              Get Involved
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
