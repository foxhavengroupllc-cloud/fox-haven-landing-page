"use client";

import type { PortalId, PortalConfig } from "./portalConfig";
import { PORTALS } from "./portalConfig";
import { scrollToSection } from "@/lib/scroll";

interface PortalOverlayContentProps {
  portalId: PortalId;
  onClose: () => void;
}

function PartnerContent({ config, onClose }: { config: PortalConfig; onClose: () => void }) {
  const handleCta = () => {
    onClose();
    setTimeout(() => scrollToSection("#contact"), 400);
  };

  return (
    <div className="space-y-6">
      <p className="font-body text-[#f4ede0]/60 text-base leading-relaxed">
        {config.overlayBody}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "City Agencies", desc: "Municipal heat resilience programs" },
          { label: "Nonprofits", desc: "Community support organizations" },
          { label: "Businesses", desc: "Corporate social responsibility" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
          >
            <h4 className="font-body text-sm font-semibold text-[#f4ede0] mb-1">
              {item.label}
            </h4>
            <p className="font-body text-xs text-[#f4ede0]/40">{item.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleCta}
        className="px-6 py-3 bg-[#e05e14] hover:bg-[#c45212] text-white rounded-full font-body text-sm font-semibold transition-colors duration-200 cursor-pointer"
      >
        {config.overlayCta}
      </button>
    </div>
  );
}

function BetaContent({ config, onClose }: { config: PortalConfig; onClose: () => void }) {
  const handleCta = () => {
    onClose();
    setTimeout(() => scrollToSection("#contact"), 400);
  };

  return (
    <div className="space-y-6">
      <p className="font-body text-[#f4ede0]/60 text-base leading-relaxed">
        {config.overlayBody}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "Real-time Alerts", desc: "Heat warnings pushed to your device" },
          { label: "Cooling Map", desc: "Nearest shelters and water stations" },
          { label: "Community Reports", desc: "Crowdsourced heat hazard data" },
          { label: "Health Tracking", desc: "Personal heat exposure monitoring" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/[0.03] border border-cyan-500/10 rounded-xl p-4"
          >
            <h4 className="font-body text-sm font-semibold text-[#f4ede0] mb-1">
              {item.label}
            </h4>
            <p className="font-body text-xs text-[#f4ede0]/40">{item.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleCta}
        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-body text-sm font-semibold transition-colors duration-200 cursor-pointer"
      >
        {config.overlayCta}
      </button>
    </div>
  );
}

function VolunteerContent({ config, onClose }: { config: PortalConfig; onClose: () => void }) {
  const handleCta = () => {
    onClose();
    setTimeout(() => scrollToSection("#contact"), 400);
  };

  return (
    <div className="space-y-6">
      <p className="font-body text-[#f4ede0]/60 text-base leading-relaxed">
        {config.overlayBody}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { emoji: "⏱️", label: "Volunteer Time", desc: "Events, outreach, installations" },
          { emoji: "🛠️", label: "Share Skills", desc: "Design, code, marketing, data" },
          { emoji: "💛", label: "Donate", desc: "Fund shelters and app development" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/[0.03] border border-amber-500/10 rounded-xl p-4 text-center"
          >
            <div className="text-xl mb-2">{item.emoji}</div>
            <h4 className="font-body text-sm font-semibold text-[#f4ede0] mb-1">
              {item.label}
            </h4>
            <p className="font-body text-xs text-[#f4ede0]/40">{item.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleCta}
        className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-body text-sm font-semibold transition-colors duration-200 cursor-pointer"
      >
        {config.overlayCta}
      </button>
    </div>
  );
}

export default function PortalOverlayContent({ portalId, onClose }: PortalOverlayContentProps) {
  const config = PORTALS.find((p) => p.id === portalId)!;

  return (
    <div className="portal-overlay-content">
      <div className="mb-6">
        <span className="text-3xl mb-3 block">{config.icon}</span>
        <h2
          id="portal-overlay-title"
          className="font-display text-[#f4ede0] text-3xl sm:text-4xl leading-tight mb-2"
        >
          {config.overlayTitle}
        </h2>
        <p
          className="font-mono text-xs tracking-wider uppercase"
          style={{ color: config.accentColor }}
        >
          {config.subtitle}
        </p>
      </div>

      {portalId === "partner" && <PartnerContent config={config} onClose={onClose} />}
      {portalId === "beta" && <BetaContent config={config} onClose={onClose} />}
      {portalId === "volunteer" && <VolunteerContent config={config} onClose={onClose} />}
    </div>
  );
}
