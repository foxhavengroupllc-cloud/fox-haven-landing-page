"use client";
import { useEffect } from "react";

export default function ScrollRevealProvider() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    function observe(root: ParentNode) {
      root.querySelectorAll(".reveal:not(.revealed)").forEach((el) => io.observe(el));
    }

    // Observe existing elements
    observe(document);

    // Watch for dynamically added .reveal elements (e.g. route changes)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("reveal")) io.observe(node);
            observe(node);
          }
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
