"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mounts an IntersectionObserver that adds the `.visible` class
 * to every `.reveal` and `.reveal-scale` element when it enters
 * the viewport.  Also sets `data-reveal-ready` on <html> so the
 * CSS hides those elements only after JS is ready (no FOIC).
 * Re-runs on every route change so SPA navigations work correctly.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const allTargets = document.querySelectorAll<Element>(".reveal, .reveal-scale");

    // Step 1: pre-mark elements already in the viewport
    allTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      }
    });

    // Step 2: enable CSS hiding — only off-screen elements go opacity:0
    document.documentElement.dataset.revealReady = "true";

    // Step 3: if IntersectionObserver is unsupported (old WebKit), reveal everything
    if (typeof IntersectionObserver === "undefined") {
      allTargets.forEach((el) => el.classList.add("visible"));
      return;
    }

    // Step 4: observe only elements not already visible
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
  }, [pathname]);

  return null;
}
