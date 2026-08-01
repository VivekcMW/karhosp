"use client";

import { useEffect } from "react";

/**
 * Mounts an IntersectionObserver that adds the `.visible` class
 * to every `.reveal` and `.reveal-scale` element when it enters
 * the viewport.  Also sets `data-reveal-ready` on <html> so the
 * CSS hides those elements only after JS is ready (no FOIC).
 *
 * Reacts to a MutationObserver instead of the route pathname: Next.js
 * client-side navigations can commit page content in more than one pass
 * (e.g. an instant/prefetched render followed by the real one), which
 * replaces DOM nodes after a pathname-keyed effect has already run and
 * leaves the new nodes permanently unobserved. Watching the DOM directly
 * catches every element whenever it actually appears.
 */
export default function RevealObserver() {
  useEffect(() => {
    document.documentElement.dataset.revealReady = "true";

    const reveal = (el: Element) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
        return true;
      }
      return false;
    };

    // Fallback for old WebKit: reveal everything immediately.
    if (typeof IntersectionObserver === "undefined") {
      const revealAll = () => {
        document.querySelectorAll(".reveal, .reveal-scale").forEach((el) => el.classList.add("visible"));
      };
      revealAll();
      const fallbackMo = new MutationObserver(revealAll);
      fallbackMo.observe(document.body, { childList: true, subtree: true });
      return () => fallbackMo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    const processNewElements = (root: ParentNode) => {
      const targets = root.querySelectorAll(".reveal, .reveal-scale");
      targets.forEach((el) => {
        if (el.classList.contains("visible")) return;
        if (!reveal(el)) io.observe(el);
      });
    };

    processNewElements(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(".reveal, .reveal-scale")) {
            if (!node.classList.contains("visible")) {
              if (!reveal(node)) io.observe(node);
            }
          }
          processNewElements(node);
        });
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
