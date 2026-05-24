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
    // Signal CSS that JS is ready — elements become opacity:0 only now
    document.documentElement.setAttribute("data-reveal-ready", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );

    const targets = document.querySelectorAll(".reveal, .reveal-scale");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
