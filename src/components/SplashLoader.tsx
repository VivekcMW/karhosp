"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SHOWN_KEY = "khe_splash_shown";
const DURATION_MS = 1000;

export default function SplashLoader() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SHOWN_KEY)) return;

    // Client-only sessionStorage check: splash must stay hidden until we know this is a fresh session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    const fadeTimer = setTimeout(() => setFading(true), DURATION_MS - 200);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0f766e] transition-opacity duration-200 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/logos/logo-wave-icon.svg"
        alt=""
        width={140}
        height={140}
        priority
        unoptimized
        className="w-28 h-28 animate-pulse"
      />
    </div>
  );
}
