"use client";

import { useEffect, useRef, useState } from "react";

function parseStatValue(raw: string): { num: number; suffix: string; hasComma: boolean } {
  const clean = raw.replace(/,/g, "");
  const match = clean.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: raw, hasComma: false };
  return {
    num: parseInt(match[1], 10),
    suffix: match[2],
    hasComma: raw.includes(","),
  };
}

export default function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const { num, suffix, hasComma } = parseStatValue(value);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setCount(num);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setCount(num);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1800;
          const startTime = performance.now();

          const tick = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            // ease-out-cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * num));
            if (t < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  const display = hasComma ? count.toLocaleString("en-IN") : count.toString();

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
