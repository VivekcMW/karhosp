import { describe, it, expect } from "vitest";
import { computeStatus, computeCountdown } from "@/lib/hospital-schedule";

describe("computeCountdown", () => {
  it('returns "moment" unit for 0-1 minutes', () => {
    expect(computeCountdown(0)).toEqual({ unit: "moment" });
    expect(computeCountdown(1)).toEqual({ unit: "moment" });
  });

  it("returns minutes for < 60", () => {
    expect(computeCountdown(30)).toEqual({ unit: "min", value: 30 });
    expect(computeCountdown(59)).toEqual({ unit: "min", value: 59 });
  });

  it("returns hours for exact hour", () => {
    expect(computeCountdown(60)).toEqual({ unit: "hr", value: 1 });
    expect(computeCountdown(180)).toEqual({ unit: "hr", value: 3 });
  });

  it("returns hours and minutes for mixed", () => {
    expect(computeCountdown(90)).toEqual({ unit: "hrMin", h: 1, m: 30 });
    expect(computeCountdown(150)).toEqual({ unit: "hrMin", h: 2, m: 30 });
  });
});

describe("computeStatus — open hours", () => {
  it("is open during morning session (Mon-Sat)", () => {
    const result = computeStatus(1, 9 * 60 + 30); // Monday 9:30 AM
    expect(result.isOpen).toBe(true);
    expect(result.urgency).toBe("open");
    expect(result.detail.kind).toBe("openNowCloses");
  });

  it("is open during afternoon session", () => {
    const result = computeStatus(2, 17 * 60); // Tuesday 5:00 PM
    expect(result.isOpen).toBe(true);
    expect(result.urgency).toBe("open");
    expect(result.detail.kind).toBe("openNowCloses");
  });

  it("is open at 6:59 PM", () => {
    const result = computeStatus(3, 18 * 60 + 59); // Wednesday 6:59 PM
    expect(result.isOpen).toBe(true);
  });

  it("is closed at 1:00 PM (end of morning session)", () => {
    const result = computeStatus(4, 13 * 60); // Thursday 1:00 PM
    expect(result.isOpen).toBe(false);
  });

  it("is closed at 7:00 PM (end of afternoon session)", () => {
    const result = computeStatus(5, 19 * 60); // Friday 7:00 PM
    expect(result.isOpen).toBe(false);
  });
});

describe("computeStatus — closed periods", () => {
  it("is closed before morning session", () => {
    const result = computeStatus(1, 6 * 60); // Monday 6:00 AM
    expect(result.isOpen).toBe(false);
    expect(result.detail).toEqual({ kind: "closedOpensAt", timeKey: "open1" });
  });

  it("shows 'soon' urgency within 1 hour of opening", () => {
    const result = computeStatus(1, 9 * 60); // Monday 9:00 AM (30 min before)
    expect(result.isOpen).toBe(false);
    expect(result.urgency).toBe("soon");
    expect(result.detail.kind).toBe("closedOpensIn");
  });

  it("is closed between sessions", () => {
    const result = computeStatus(2, 14 * 60); // Tuesday 2:00 PM
    expect(result.isOpen).toBe(false);
    expect(result.detail).toEqual({ kind: "closedOpensAt", timeKey: "open2" });
  });

  it("is closed after evening session on Saturday", () => {
    const result = computeStatus(6, 21 * 60); // Saturday 9:00 PM
    expect(result.isOpen).toBe(false);
    expect(result.detail.kind).toBe("closedForDayOpensMonday");
  });
});

describe("computeStatus — Sunday", () => {
  it("is closed all Sunday", () => {
    const result = computeStatus(0, 10 * 60); // Sunday 10:00 AM
    expect(result.isOpen).toBe(false);
    expect(result.urgency).toBe("closed");
    expect(result.detail.kind).toBe("closedTodayOpensMonday");
  });

  it("on Sunday mentions Monday opening", () => {
    const result = computeStatus(0, 12 * 60);
    expect(result.detail.kind).toBe("closedTodayOpensMonday");
  });
});

describe("computeStatus — day boundaries", () => {
  it("handles the first minute of Monday", () => {
    const result = computeStatus(1, 0);
    expect(result.isOpen).toBe(false);
    expect(result.day).toBe("mon");
  });

  it("handles the last minute of Saturday", () => {
    const result = computeStatus(6, 23 * 60 + 59);
    expect(result.isOpen).toBe(false);
    expect(result.day).toBe("sat");
  });
});

describe("computeStatus — session boundary edge cases", () => {
  it("is open at 9:30:00 AM", () => {
    const result = computeStatus(1, 9 * 60 + 30);
    expect(result.isOpen).toBe(true);
  });

  it("is closed at 12:59:59 (before 1PM cut-off is still open)", () => {
    const result = computeStatus(1, 12 * 60 + 59);
    expect(result.isOpen).toBe(true);
  });

  it("is closed 1 min before afternoon session (soon)", () => {
    const result = computeStatus(1, 16 * 60 + 29);
    expect(result.isOpen).toBe(false);
    expect(result.urgency).toBe("soon");
    expect(result.detail.kind).toBe("closedOpensIn");
  });

  it("is open at 4:30 PM sharp", () => {
    const result = computeStatus(1, 16 * 60 + 30);
    expect(result.isOpen).toBe(true);
  });
});
