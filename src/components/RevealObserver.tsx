"use client";

import { useEffect, useState } from "react";

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
  const [isHydrated, setIsHydrated] = useState(false);

  // Mark as hydrated after initial render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Don't run until after hydration
    if (!isHydrated) return;

    let ioRef: IntersectionObserver | null = null;
    let moRef: MutationObserver | null = null;
    let rafId: number | null = null;

    // Use requestAnimationFrame to defer until after browser paint
    rafId = requestAnimationFrame(() => {
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
        moRef = new MutationObserver(revealAll);
        moRef.observe(document.body, { childList: true, subtree: true });
        return;
      }

      ioRef = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              ioRef?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
      );

      const processNewElements = (root: ParentNode) => {
        const targets = root.querySelectorAll(".reveal, .reveal-scale");
        targets.forEach((el) => {
          if (el.classList.contains("visible")) return;
          if (!reveal(el)) ioRef?.observe(el);
        });
      };

      processNewElements(document);

      moRef = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            if (node.matches(".reveal, .reveal-scale")) {
              if (!node.classList.contains("visible")) {
                if (!reveal(node)) ioRef?.observe(node);
              }
            }
            processNewElements(node);
          });
        }
      });
      moRef.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ioRef?.disconnect();
      moRef?.disconnect();
    };
  }, [isHydrated]);

  return null;
}
