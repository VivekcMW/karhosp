"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { computeStatus, getISTTime, type Status, type Countdown } from "@/lib/hospital-schedule";

export default function HospitalStatus({ variant = "inline" }: Readonly<{ variant?: "topbar" | "inline" }>) {
  const t = useTranslations("hospitalStatus");
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const { day, minuteOfDay } = getISTTime();
    // Live clock: the current status is only knowable client-side and must tick every 30s.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(computeStatus(day, minuteOfDay));
    const id = setInterval(() => {
      const { day: d, minuteOfDay: m } = getISTTime();
      setStatus(computeStatus(d, m));
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  const formatCountdown = (c: Countdown): string => {
    switch (c.unit) {
      case "moment": return t("anyMoment");
      case "min": return t("minUnit", { value: c.value });
      case "hr": return t("hrUnit", { value: c.value });
      case "hrMin": return t("hrMinUnit", { h: c.h, m: c.m });
    }
  };

  const formatDetail = (): string => {
    const d = status.detail;
    switch (d.kind) {
      case "openNowCloses":
        return t("openNowCloses", { time: t(`times.${d.timeKey}`) });
      case "closedOpensIn":
        return t("closedOpensIn", { countdown: formatCountdown(d.countdown) });
      case "closedOpensAt":
        return t("closedOpensAt", { time: t(`times.${d.timeKey}`) });
      case "closedTodayOpensMonday":
        return t("closedTodayOpensMonday", { time: t(`times.${d.timeKey}`), countdown: formatCountdown(d.countdown) });
      case "closedForDayOpensMonday":
        return t("closedForDayOpensMonday", { time: t(`times.${d.timeKey}`), countdown: formatCountdown(d.countdown) });
      case "closedForDayOpensNextDay":
        return t("closedForDayOpensNextDay", {
          day: t(`days.${d.nextDay}`),
          time: t(`times.${d.timeKey}`),
          countdown: formatCountdown(d.countdown),
        });
    }
  };

  const dayName = t(`days.${status.day}`);
  const detail = formatDetail();

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
        <span className="font-medium">{dayName}</span>
        <span className="w-px h-3 bg-teal-400/50" />
        <span className={`inline-flex items-center gap-1.5 font-semibold ${TOPBAR_TEXT_COLOR[status.urgency]}`}>
          {dot}
          {detail}
        </span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold border max-w-full ${BADGE_COLOR[status.urgency]}`}>
      {dot}
      <span>
        <span className="font-bold">{dayName}</span>
        {" · "}
        {detail}
      </span>
    </div>
  );
}
