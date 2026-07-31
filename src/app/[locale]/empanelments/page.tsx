import { useLocale } from "next-intl";
import Link from "next/link";
import { ShieldCheck, ChevronRight, BadgeCheck, Phone, FileText } from "lucide-react";

type Empanelment = {
  name: string;
  type: string;
  desc: string;
};

const EMPANELMENTS: Empanelment[] = [
  { name: "Digit Insurance", type: "Private", desc: "Cashless & reimbursement health insurance across Digit policy variants." },
  { name: "Manipal CIGNA", type: "Private", desc: "Complete health solutions under the Manipal CIGNA network." },
  { name: "HDFC ERGO General Insurance", type: "Private", desc: "Comprehensive health plans including Optima and Energy series." },
  { name: "IFFCO Tokio Insurance", type: "Private", desc: "Health insurance coverage under IFFCO Tokio general insurance plans." },
  { name: "ICICI Lombard Insurance", type: "Private", desc: "Cashless treatment for ICICI Lombard health insurance policyholders." },
  { name: "ACKO General Insurance Company", type: "Private", desc: "Paperless and cashless claims for ACKO health insurance customers." },
  { name: "Star Health Insurance", type: "Private", desc: "Cashless claims across all Star Health policy variants." },
  { name: "Reliance General Insurance", type: "Private", desc: "Health insurance plans under Reliance General Insurance." },
  { name: "Bajaj General Insurance Ltd", type: "Private", desc: "Health Guard, Critical Illness and group health plans." },
  { name: "Care Health Insurance", type: "Private", desc: "Care, Care Freedom and Care Classic policyholders." },
  { name: "Aditya Birla Health Insurance Co. Ltd", type: "Private", desc: "Activ Health and comprehensive health plans from Aditya Birla." },
  { name: "Liberty General Insurance", type: "Private", desc: "Health insurance coverage under Liberty General Insurance plans." },
  { name: "NAVI General Insurance Ltd", type: "Private", desc: "Health insurance plans with cashless facility for NAVI customers." },
  { name: "Galaxy Health Insurance", type: "Private", desc: "Health insurance coverage under Galaxy Health Insurance plans." },
  { name: "Generali Central Insurance Co. Ltd", type: "Private", desc: "Cashless healthcare services for Generali policyholders." },
  { name: "SBI General Insurance", type: "Public", desc: "Comprehensive health insurance plans from SBI General Insurance." },
  { name: "Universal Sompo General Insurance Company Limited", type: "Private", desc: "Health insurance coverage under Universal Sompo plans." },
  { name: "Cholamandalam MS General Insurance Co. Ltd", type: "Private", desc: "Health insurance coverage for Chola MS policyholders." },
  { name: "Health Insurance TPA", type: "TPA", desc: "Third-party claim processing for multiple health insurance policies." },
  { name: "Link Insurance TPA Pvt. Ltd", type: "TPA", desc: "TPA services for cashless authorisation and claim settlement." },
  { name: "Heritage Health Insurance TPA", type: "TPA", desc: "Cashless and reimbursement claim management." },
  { name: "MD India Health Insurance TPA", type: "TPA", desc: "End-to-end TPA services for cashless hospitalisation." },
  { name: "Health Assist Insurance TPA Pvt. Ltd", type: "TPA", desc: "TPA services for cashless and reimbursement claim processing." },
  { name: "Mediassist TPA", type: "TPA", desc: "One of India's leading TPAs — processes claims for multiple insurers." },
];

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

const STEPS = [
  { icon: BadgeCheck, title: "Show Your Card", desc: "Present your health card, insurance card or government ID at our registration counter." },
  { icon: FileText,   title: "We Handle Paperwork", desc: "Our billing team verifies your coverage and prepares cashless authorisation or reimbursement forms." },
  { icon: Phone,      title: "Get Treated", desc: "Receive world-class eye care with zero upfront payment or easy reimbursement after treatment." },
];

export default function EmpanelmentsPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" /> Trusted Coverage
          </div>
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Your Treatment,<br />
            <span className="text-amber-300">Fully Covered</span>
          </h1>
          <p className="hero-sub text-teal-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Karwar Eye Hospital is empaneled with major insurance companies and TPAs — so you can focus on getting better, not on billing.
          </p>
          <div className="mt-8 inline-grid grid-cols-3 divide-x divide-white/20 bg-white/15 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <p className="text-xl sm:text-2xl font-bold text-white">{EMPANELMENTS.length}</p>
              <p className="text-teal-200 text-[10px] sm:text-xs mt-0.5">Empanelments</p>
            </div>
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <p className="text-xl sm:text-2xl font-bold text-white">24/7</p>
              <p className="text-teal-200 text-[10px] sm:text-xs mt-0.5">Cashless Support</p>
            </div>
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <p className="text-xl sm:text-2xl font-bold text-amber-300">Cashless</p>
              <p className="text-teal-200 text-[10px] sm:text-xs mt-0.5">Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-7">How to avail cashless treatment</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative flex gap-4 items-start">
                  {i < STEPS.length - 1 && (
                    <div className="hidden sm:block absolute top-5 left-[calc(100%-1rem)] w-full h-px bg-stone-200 z-0" />
                  )}
                  <div className="relative z-10 w-10 h-10 rounded-md bg-[#0f766e] flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-800 text-sm">{step.title}</p>
                    <p className="text-stone-400 text-xs leading-relaxed mt-1">{step.desc}</p>
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
                    <p className="text-stone-400 text-xs leading-relaxed flex-1">{item.desc}</p>
                    <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${styles.badge}`}>
                      {item.type}
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
            Don&apos;t see your insurer listed?
          </p>
          <p className="relative text-teal-200 text-sm mb-6">
            New empanelments are added regularly. Contact us to check your eligibility.
          </p>
          <Link
            href={lp("/contact")}
            className="relative inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-7 py-3 rounded-md transition-colors text-sm shadow-md"
          >
            Contact Us <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
