export const SESSIONS = [
  { start: 9 * 60 + 30, end: 13 * 60, closesLabel: "1:00 PM" },
  { start: 16 * 60 + 30, end: 19 * 60, closesLabel: "7:00 PM" },
];

export const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export type Urgency = "open" | "soon" | "closed";

export type Status = {
  isOpen: boolean;
  dayName: string;
  detail: string;
  urgency: Urgency;
};

export function fmtCountdown(mins: number): string {
  if (mins <= 1) return "any moment";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

export function getISTTime(): { day: number; minuteOfDay: number } {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const istMs = utcMs + (5 * 60 + 30) * 60_000;
  const ist = new Date(istMs);
  return {
    day: ist.getDay(),
    minuteOfDay: ist.getHours() * 60 + ist.getMinutes(),
  };
}

function checkSoon(minsUntil: number, openAt: string): string {
  return minsUntil <= 60
    ? `Closed · Opens in ${fmtCountdown(minsUntil)}`
    : `Closed · Opens at ${openAt}`;
}

function closedResult(day: number, detail: string, soon: boolean): Status {
  return {
    isOpen: false,
    dayName: DAY_NAMES[day],
    detail,
    urgency: soon ? "soon" : "closed",
  };
}

export function computeStatus(day: number, minuteOfDay: number): Status {
  const dayName = DAY_NAMES[day];

  if (day === 0) {
    const minsUntil = 24 * 60 - minuteOfDay + SESSIONS[0].start;
    return {
      isOpen: false,
      dayName,
      urgency: "closed",
      detail: `Closed Today · Opens Monday, 9:30 AM (in ${fmtCountdown(minsUntil)})`,
    };
  }

  for (const session of SESSIONS) {
    if (minuteOfDay >= session.start && minuteOfDay < session.end) {
      return {
        isOpen: true,
        dayName,
        urgency: "open",
        detail: `Open Now · Closes ${session.closesLabel}`,
      };
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
    return {
      isOpen: false,
      dayName,
      urgency: "closed",
      detail: `Closed for the Day · Opens Monday, 9:30 AM (in ${fmtCountdown(minsUntil)})`,
    };
  }

  const nextDayName = DAY_NAMES[day + 1];
  const minsUntil = minsUntilMidnight + SESSIONS[0].start;
  return {
    isOpen: false,
    dayName,
    urgency: "closed",
    detail: `Closed for the Day · Opens ${nextDayName}, 9:30 AM (in ${fmtCountdown(minsUntil)})`,
  };
}
