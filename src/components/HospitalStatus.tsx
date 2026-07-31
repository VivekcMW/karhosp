"use client";

import { useEffect, useState } from "react";
import { computeStatus, getISTTime, type Status as S } from "@/lib/hospital-schedule";

type Status = S;

export default function HospitalStatus({ variant = "inline" }: Readonly<{ variant?: "topbar" | "inline" }>) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const { day, minuteOfDay } = getISTTime();
    setStatus(computeStatus(day, minuteOfDay));
    const id = setInterval(() => {
      const { day: d, minuteOfDay: m } = getISTTime();
      setStatus(computeStatus(d, m));
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  const DOT_COLOR: Record<Status["urgency"], string> = {
    open: "bg-green-400 animate-pulse",
    soon: "bg-amber-400 animate-pulse",
    closed: "bg-red-400",
  };
  const TOPBAR_TEXT_COLOR: Record<Status["urgency"], string> = {
    open: "text-green-300",
    soon: "text-amber-300",
    closed: "text-red-300",
  };
  const BADGE_COLOR: Record<Status["urgency"], string> = {
    open: "bg-green-50 text-green-700 border-green-200",
    soon: "bg-amber-50 text-amber-700 border-amber-200",
    closed: "bg-red-50 text-red-600 border-red-200",
  };

  const dot = <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_COLOR[status.urgency]}`} />;

  if (variant === "topbar") {
    return (
      <span className="hidden sm:flex items-center gap-2 text-xs text-teal-100 shrink-0">
        <span className="font-medium">{status.dayName}</span>
        <span className="w-px h-3 bg-teal-400/50" />
        <span className={`inline-flex items-center gap-1.5 font-semibold ${TOPBAR_TEXT_COLOR[status.urgency]}`}>
          {dot}
          {status.detail}
        </span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold border max-w-full ${BADGE_COLOR[status.urgency]}`}>
      {dot}
      <span>
        <span className="font-bold">{status.dayName}</span>
        {" · "}
        {status.detail}
      </span>
    </div>
  );
}
