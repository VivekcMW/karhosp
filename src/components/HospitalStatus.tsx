"use client";

import { useEffect, useState } from "react";

// ── Schedule (IST, minutes from midnight) ──────────────────────────────────
const SESSIONS = [
  { start: 9 * 60 + 30, end: 13 * 60, closesLabel: "1:00 PM" },   // 9:30 AM – 1:00 PM
  { start: 16 * 60 + 30, end: 19 * 60, closesLabel: "7:00 PM" },  // 4:30 PM – 7:00 PM
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// IST = UTC+5:30 — derive local IST day & minute-of-day without relying on Intl
function getISTTime() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const istMs = utcMs + (5 * 60 + 30) * 60_000;
  const ist = new Date(istMs);
  return {
    day: ist.getDay(),                              // 0=Sun … 6=Sat
    minuteOfDay: ist.getHours() * 60 + ist.getMinutes(),
  };
}

function fmtCountdown(mins: number): string {
  if (mins <= 1) return "any moment";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

type Status = {
  isOpen: boolean;
  dayName: string;
  detail: string;
  urgency: "open" | "soon" | "closed";
};

function closedResult(day: number, detail: string, soon: boolean): Status {
  return {
    isOpen: false,
    dayName: DAY_NAMES[day],
    detail,
    urgency: soon ? "soon" : "closed",
  };
}

function checkSoon(minsUntil: number, openAt: string): string {
  return minsUntil <= 60
    ? `Closed · Opens in ${fmtCountdown(minsUntil)}`
    : `Closed · Opens at ${openAt}`;
}

function computeStatus(): Status {
  const { day, minuteOfDay } = getISTTime();
  const dayName = DAY_NAMES[day];

  if (day === 0) {
    const minsUntil = (24 * 60 - minuteOfDay) + SESSIONS[0].start;
    return { isOpen: false, dayName, urgency: "closed",
      detail: `Closed Today · Opens Monday, 9:30 AM (in ${fmtCountdown(minsUntil)})` };
  }

  for (const session of SESSIONS) {
    if (minuteOfDay >= session.start && minuteOfDay < session.end) {
      return { isOpen: true, dayName, urgency: "open",
        detail: `Open Now · Closes ${session.closesLabel}` };
    }
  }

  if (minuteOfDay < SESSIONS[0].start) {
    const minsUntil = SESSIONS[0].start - minuteOfDay;
    return closedResult(day, checkSoon(minsUntil, "9:30 AM"), minsUntil <= 60);
  }

  if (minuteOfDay < SESSIONS[1].start) {
    const minsUntil = SESSIONS[1].start - minuteOfDay;
    return closedResult(day, checkSoon(minsUntil, "4:30 PM"), minsUntil <= 60);
  }

  const minsUntilMidnight = 24 * 60 - minuteOfDay;
  if (day === 6) {
    const minsUntil = minsUntilMidnight + 24 * 60 + SESSIONS[0].start;
    return { isOpen: false, dayName, urgency: "closed",
      detail: `Closed for the Day · Opens Monday, 9:30 AM (in ${fmtCountdown(minsUntil)})` };
  }

  const nextDayName = DAY_NAMES[day + 1];
  const minsUntil = minsUntilMidnight + SESSIONS[0].start;
  return { isOpen: false, dayName, urgency: "closed",
    detail: `Closed for the Day · Opens ${nextDayName}, 9:30 AM (in ${fmtCountdown(minsUntil)})` };
}

// ── Variants ─────────────────────────────────────────────────────────────────
// "topbar"  → compact, for teal navbar top bar
// "inline"  → badge for page sections (contact, appointments)

export default function HospitalStatus({ variant = "inline" }: Readonly<{ variant?: "topbar" | "inline" }>) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(computeStatus());
    const id = setInterval(() => setStatus(computeStatus()), 30_000);
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
