import { describe, it, expect } from "vitest";
import { computeStatus, fmtCountdown, SESSIONS } from "@/lib/hospital-schedule";

describe("fmtCountdown", () => {
  it('returns "any moment" for 0-1 minutes', () => {
    expect(fmtCountdown(0)).toBe("any moment");
    expect(fmtCountdown(1)).toBe("any moment");
  });

  it("returns minutes for < 60", () => {
    expect(fmtCountdown(30)).toBe("30 min");
    expect(fmtCountdown(59)).toBe("59 min");
  });

  it("returns hours for exact hour", () => {
    expect(fmtCountdown(60)).toBe("1 hr");
    expect(fmtCountdown(180)).toBe("3 hr");
  });

  it("returns hours and minutes for mixed", () => {
    expect(fmtCountdown(90)).toBe("1 hr 30 min");
    expect(fmtCountdown(150)).toBe("2 hr 30 min");
  });
});

describe("computeStatus — open hours", () => {
  it("is open during morning session (Mon-Sat)", () => {
    const result = computeStatus(1, 9 * 60 + 30); // Monday 9:30 AM
    expect(result.isOpen).toBe(true);
    expect(result.urgency).toBe("open");
    expect(result.detail).toContain("Open Now");
  });

  it("is open during afternoon session", () => {
    const result = computeStatus(2, 17 * 60); // Tuesday 5:00 PM
    expect(result.isOpen).toBe(true);
    expect(result.urgency).toBe("open");
    expect(result.detail).toContain("Open Now");
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
    expect(result.detail).toContain("Opens at 9:30 AM");
  });

  it("shows 'soon' urgency within 1 hour of opening", () => {
    const result = computeStatus(1, 9 * 60); // Monday 9:00 AM (30 min before)
    expect(result.isOpen).toBe(false);
    expect(result.urgency).toBe("soon");
    expect(result.detail).toContain("Opens in");
  });

  it("is closed between sessions", () => {
    const result = computeStatus(2, 14 * 60); // Tuesday 2:00 PM
    expect(result.isOpen).toBe(false);
    expect(result.detail).toContain("Opens at 4:30 PM");
  });

  it("is closed after evening session on Saturday", () => {
    const result = computeStatus(6, 21 * 60); // Saturday 9:00 PM
    expect(result.isOpen).toBe(false);
    expect(result.detail).toContain("Opens Monday");
  });
});

describe("computeStatus — Sunday", () => {
  it("is closed all Sunday", () => {
    const result = computeStatus(0, 10 * 60); // Sunday 10:00 AM
    expect(result.isOpen).toBe(false);
    expect(result.urgency).toBe("closed");
    expect(result.detail).toContain("Closed Today");
  });

  it("on Sunday mentions Monday opening", () => {
    const result = computeStatus(0, 12 * 60);
    expect(result.detail).toContain("Opens Monday");
  });
});

describe("computeStatus — day boundaries", () => {
  it("handles the first minute of Monday", () => {
    const result = computeStatus(1, 0);
    expect(result.isOpen).toBe(false);
    expect(result.dayName).toBe("Monday");
  });

  it("handles the last minute of Saturday", () => {
    const result = computeStatus(6, 23 * 60 + 59);
    expect(result.isOpen).toBe(false);
    expect(result.dayName).toBe("Saturday");
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
    expect(result.detail).toContain("Opens in");
  });

  it("is open at 4:30 PM sharp", () => {
    const result = computeStatus(1, 16 * 60 + 30);
    expect(result.isOpen).toBe(true);
  });
});
