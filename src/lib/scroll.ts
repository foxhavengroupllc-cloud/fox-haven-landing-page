export const NAV_HEIGHT = 88;

export function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
  window.scrollTo({ top: y, behavior: "smooth" });
}
