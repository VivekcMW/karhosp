"use client";

import { useEffect } from "react";

/**
 * Mounts an IntersectionObserver that adds the `.visible` class
 * to every `.reveal` and `.reveal-scale` element when it enters
 * the viewport.  Also sets `data-reveal-ready` on <html> so the
 * CSS hides those elements only after JS is ready (no FOIC).
 */
export default function RevealObserver() {
  useEffect(() => {
    // Step 1: pre-mark elements already in the viewport so they are
    // never hidden when data-reveal-ready is set (prevents invisible flash)
    const allTargets = document.querySelectorAll<Element>(".reveal, .reveal-scale");
    allTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      }
    });

    // Step 2: now enable CSS hiding — only off-screen elements go opacity:0
    document.documentElement.setAttribute("data-reveal-ready", "true");

    // Step 3: observe only elements not already visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    allTargets.forEach((el) => {
      if (!el.classList.contains("visible")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
