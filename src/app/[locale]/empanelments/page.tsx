import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ShieldCheck, ChevronRight, BadgeCheck, Phone, FileText } from "lucide-react";
import { EMPANELMENTS, type EmpanelmentType } from "@/lib/empanelments-data";

const TYPE_STYLES: Record<string, { badge: string; leftBorder: string }> = {
  Private: {
    badge: "bg-rose-100 text-rose-700",
    leftBorder: "border-l-rose-400",
  },
  Public: {
    badge: "bg-blue-100 text-blue-700",
    leftBorder: "border-l-blue-400",
  },
  TPA: {
    badge: "bg-purple-100 text-purple-700",
    leftBorder: "border-l-purple-400",
  },
};

const TYPE_LABEL_KEY: Record<EmpanelmentType, string> = {
  Private: "typePrivate",
  Public: "typePublic",
  TPA: "typeTPA",
};

const STEPS = [
  { icon: BadgeCheck, key: "s1" },
  { icon: FileText,   key: "s2" },
  { icon: Phone,      key: "s3" },
] as const;

export default function EmpanelmentsPage() {
  const t = useTranslations("empanelments");
  const locale = useLocale();
  const lp = (href: string) => `/${locale}${href}`;

  return (
    <div className="bg-[#fafaf9]">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0f766e] to-[#0d9488] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" /> {t("badge")}
          </div>
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("heroTitle1")}<br />
            <span className="text-amber-300">{t("heroTitle2")}</span>
          </h1>
          <p className="hero-sub text-teal-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 inline-grid grid-cols-3 divide-x divide-white/20 bg-white/15 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <p className="text-xl sm:text-2xl font-bold text-white">{EMPANELMENTS.length}</p>
              <p className="text-teal-200 text-[10px] sm:text-xs mt-0.5">{t("statEmpanelments")}</p>
            </div>
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <p className="text-xl sm:text-2xl font-bold text-white">24/7</p>
              <p className="text-teal-200 text-[10px] sm:text-xs mt-0.5">{t("statCashlessSupport")}</p>
            </div>
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <p className="text-xl sm:text-2xl font-bold text-amber-300">{t("statCashlessValue")}</p>
              <p className="text-teal-200 text-[10px] sm:text-xs mt-0.5">{t("statAvailable")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-7">{t("howItWorks")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.key} className="relative flex gap-4 items-start">
                  {i < STEPS.length - 1 && (
                    <div className="hidden sm:block absolute top-5 left-[calc(100%-1rem)] w-full h-px bg-stone-200 z-0" />
                  )}
                  <div className="relative z-10 w-10 h-10 rounded-md bg-[#0f766e] flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-800 text-sm">{t(`steps.${step.key}.title`)}</p>
                    <p className="text-stone-400 text-xs leading-relaxed mt-1">{t(`steps.${step.key}.desc`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Empanelments Grid ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {EMPANELMENTS.map((item) => {
              const styles = TYPE_STYLES[item.type] ?? TYPE_STYLES.Private;
              return (
                <div
                  key={item.name}
                  className={`bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden border-l-4 ${styles.leftBorder}`}
                >
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <p className="font-semibold text-stone-800 text-sm leading-snug">{item.name}</p>
                    <p className="text-stone-400 text-xs leading-relaxed flex-1">{t(`items.${item.key}.desc`)}</p>
                    <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${styles.badge}`}>
                      {t(TYPE_LABEL_KEY[item.type])}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-4 sm:mx-6 lg:mx-8 mb-12 max-w-7xl xl:mx-auto">
        <div className="relative bg-gradient-to-r from-[#0f766e] to-[#134e4a] rounded-md overflow-hidden px-5 sm:px-8 py-8 sm:py-10 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
          </div>
          <p className="relative text-white font-bold text-lg sm:text-xl mb-1">
            {t("ctaTitle")}
          </p>
          <p className="relative text-teal-200 text-sm mb-6">
            {t("ctaSubtitle")}
          </p>
          <Link
            href={lp("/contact")}
            className="relative inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-7 py-3 rounded-md transition-colors text-sm shadow-md"
          >
            {t("ctaButton")} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
