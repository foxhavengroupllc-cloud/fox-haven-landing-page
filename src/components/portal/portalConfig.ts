export type PortalId = "partner" | "beta" | "volunteer";

export interface PortalConfig {
  id: PortalId;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  accentColor: string;
  accentGlow: string;
  glareColor: string;
  overlayTitle: string;
  overlayBody: string;
  overlayCta: string;
}

export const PORTALS: PortalConfig[] = [
  {
    id: "partner",
    icon: "☀️",
    title: "Partner with Us",
    subtitle: "Build the ecosystem",
    description:
      "Business, organization, or city agency? Let's build something together.",
    cta: "Explore partnership →",
    accentColor: "#e05e14",
    accentGlow: "rgba(224,94,20,0.25)",
    glareColor: "rgba(224,94,20,0.10)",
    overlayTitle: "Let's Build Together",
    overlayBody:
      "We partner with cities, nonprofits, and businesses to deploy solar shelters, heat relief technology, and family support systems where they're needed most.",
    overlayCta: "Start a conversation →",
  },
  {
    id: "beta",
    icon: "📱",
    title: "Join the App Beta",
    subtitle: "Shape the product",
    description:
      "Be first to use the Heat Relief App. Your feedback shapes the product.",
    cta: "Get early access →",
    accentColor: "#06b6d4",
    accentGlow: "rgba(6,182,212,0.25)",
    glareColor: "rgba(6,182,212,0.10)",
    overlayTitle: "Get Early Access",
    overlayBody:
      "The Heat Relief App connects vulnerable communities with cooling resources in real time. Join our beta program and help us refine the experience before public launch.",
    overlayCta: "Request beta access →",
  },
  {
    id: "volunteer",
    icon: "🤝",
    title: "Volunteer or Donate",
    subtitle: "Expand the impact",
    description:
      "Help expand our reach. Time, skills, or resources, every bit matters.",
    cta: "Get involved →",
    accentColor: "#f59e0b",
    accentGlow: "rgba(245,158,11,0.25)",
    glareColor: "rgba(245,158,11,0.10)",
    overlayTitle: "Make a Difference",
    overlayBody:
      "Every contribution, whether time, talent, or financial support, directly powers our mission to protect families from extreme heat and build stronger communities.",
    overlayCta: "Get involved →",
  },
];
