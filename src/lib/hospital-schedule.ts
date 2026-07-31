export const SESSIONS = [
  { start: 9 * 60 + 30, end: 13 * 60, opensKey: "open1", closesKey: "close1" },
  { start: 16 * 60 + 30, end: 19 * 60, opensKey: "open2", closesKey: "close2" },
] as const;

export const DAY_KEYS = [
  "sun", "mon", "tue", "wed", "thu", "fri", "sat",
] as const;

export type DayKey = (typeof DAY_KEYS)[number];
export type Urgency = "open" | "soon" | "closed";

export type Countdown =
  | { unit: "moment" }
  | { unit: "min"; value: number }
  | { unit: "hr"; value: number }
  | { unit: "hrMin"; h: number; m: number };

export function computeCountdown(mins: number): Countdown {
  if (mins <= 1) return { unit: "moment" };
  if (mins < 60) return { unit: "min", value: mins };
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? { unit: "hr", value: h } : { unit: "hrMin", h, m };
}

export type StatusDetail =
  | { kind: "openNowCloses"; timeKey: string }
  | { kind: "closedOpensIn"; countdown: Countdown }
  | { kind: "closedOpensAt"; timeKey: string }
  | { kind: "closedTodayOpensMonday"; timeKey: string; countdown: Countdown }
  | { kind: "closedForDayOpensMonday"; timeKey: string; countdown: Countdown }
  | { kind: "closedForDayOpensNextDay"; nextDay: DayKey; timeKey: string; countdown: Countdown };

export type Status = {
  isOpen: boolean;
  day: DayKey;
  urgency: Urgency;
  detail: StatusDetail;
};

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

function checkSoon(minsUntil: number, timeKey: string): { detail: StatusDetail; soon: boolean } {
  const soon = minsUntil <= 60;
  return {
    soon,
    detail: soon
      ? { kind: "closedOpensIn", countdown: computeCountdown(minsUntil) }
      : { kind: "closedOpensAt", timeKey },
  };
}

export function computeStatus(day: number, minuteOfDay: number): Status {
  const dayKey = DAY_KEYS[day];

  if (day === 0) {
    const minsUntil = 24 * 60 - minuteOfDay + SESSIONS[0].start;
    return {
      isOpen: false,
      day: dayKey,
      urgency: "closed",
      detail: { kind: "closedTodayOpensMonday", timeKey: "open1", countdown: computeCountdown(minsUntil) },
    };
  }

  for (const session of SESSIONS) {
    if (minuteOfDay >= session.start && minuteOfDay < session.end) {
      return {
        isOpen: true,
        day: dayKey,
        urgency: "open",
        detail: { kind: "openNowCloses", timeKey: session.closesKey },
      };
    }
  }

  if (minuteOfDay < SESSIONS[0].start) {
    const minsUntil = SESSIONS[0].start - minuteOfDay;
    const { detail, soon } = checkSoon(minsUntil, "open1");
    return { isOpen: false, day: dayKey, urgency: soon ? "soon" : "closed", detail };
  }

  if (minuteOfDay < SESSIONS[1].start) {
    const minsUntil = SESSIONS[1].start - minuteOfDay;
    const { detail, soon } = checkSoon(minsUntil, "open2");
    return { isOpen: false, day: dayKey, urgency: soon ? "soon" : "closed", detail };
  }

  const minsUntilMidnight = 24 * 60 - minuteOfDay;
  if (day === 6) {
    const minsUntil = minsUntilMidnight + 24 * 60 + SESSIONS[0].start;
    return {
      isOpen: false,
      day: dayKey,
      urgency: "closed",
      detail: { kind: "closedForDayOpensMonday", timeKey: "open1", countdown: computeCountdown(minsUntil) },
    };
  }

  const nextDay = DAY_KEYS[day + 1];
  const minsUntil = minsUntilMidnight + SESSIONS[0].start;
  return {
    isOpen: false,
    day: dayKey,
    urgency: "closed",
    detail: { kind: "closedForDayOpensNextDay", nextDay, timeKey: "open1", countdown: computeCountdown(minsUntil) },
  };
}
