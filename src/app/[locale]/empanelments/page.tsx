import { useLocale } from "next-intl";
import Link from "next/link";
import { ShieldCheck, Building2, HeartPulse, Users, ChevronRight, BadgeCheck, Phone, FileText } from "lucide-react";

type Empanelment = {
  name: string;
  type: string;
  desc: string;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accentBar: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  cardLeft: string;
  items: Empanelment[];
};

const CATEGORIES: Category[] = [
  {
    id: "govt",
    title: "Government Schemes",
    subtitle: "Central & State government health programmes",
    icon: ShieldCheck,
    accentBar: "bg-teal-500",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    cardLeft: "border-l-4 border-l-teal-400",
    items: [
      { name: "Ayushman Bharat – PM-JAY", type: "Central Govt.", desc: "Cashless treatment up to ₹5 lakh per family under Pradhan Mantri Jan Arogya Yojana." },
      { name: "Arogya Karnataka", type: "State Govt.", desc: "Karnataka State health insurance for government employees and BPL families." },
      { name: "CGHS", type: "Central Govt.", desc: "Comprehensive healthcare for Central Government employees, pensioners and dependents." },
      { name: "ECHS", type: "Defence", desc: "Cashless medical facilities for retired defence personnel and their dependents." },
      { name: "ESIC", type: "Labour Ministry", desc: "Health coverage for organised-sector employees under ESI Act, 1948." },
      { name: "Railway Health Service (RHS)", type: "Railways", desc: "Medical care for railway employees and their families." },
      { name: "Karnataka Govt. Employees Health Scheme", type: "State Govt.", desc: "Mediclaim benefit for Karnataka State Government servants." },
      { name: "Department of Posts Health Scheme", type: "Central Govt.", desc: "Health benefits for India Post employees and their dependants." },
    ],
  },
  {
    id: "psu",
    title: "PSU & Corporate",
    subtitle: "Public sector undertakings operating in the region",
    icon: Building2,
    accentBar: "bg-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    cardLeft: "border-l-4 border-l-blue-400",
    items: [
      { name: "ONGC", type: "PSU", desc: "Medical facility for ONGC employees at Karwar and Uttara Kannada region." },
      { name: "KPTCL", type: "State PSU", desc: "Eye care for Karnataka Power Transmission Corporation employees and dependents." },
      { name: "KPCL", type: "State PSU", desc: "Medical empanelment for Karnataka Power Corporation staff in Uttara Kannada." },
      { name: "Konkan Railway Corporation (KRCL)", type: "PSU", desc: "Eye care services for Konkan Railway employees and families." },
    ],
  },
  {
    id: "insurance",
    title: "Insurance & TPA Panels",
    subtitle: "Cashless & reimbursement with all major health insurers",
    icon: HeartPulse,
    accentBar: "bg-rose-500",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
    cardLeft: "border-l-4 border-l-rose-400",
    items: [
      { name: "Star Health & Allied Insurance", type: "Private", desc: "Cashless claims across all Star Health policy variants." },
      { name: "New India Assurance", type: "Public", desc: "India's largest non-life insurer — mediclaim & health policies." },
      { name: "United India Insurance", type: "Public", desc: "Empaneled for United India health and mediclaim products." },
      { name: "National Insurance Company", type: "Public", desc: "Mediclaim & group health insurance policies." },
      { name: "Oriental Insurance Company", type: "Public", desc: "Happy Family Floater, Individual Mediclaim and group health plans." },
      { name: "HDFC ERGO Health Insurance", type: "Private", desc: "My:health Suraksha and Optima plans (formerly Apollo Munich)." },
      { name: "Bajaj Allianz Health Insurance", type: "Private", desc: "Health Guard, Critical Illness and group health plans." },
      { name: "Niva Bupa Health Insurance", type: "Private", desc: "ReAssure and Health Companion policyholders." },
      { name: "Care Health Insurance", type: "Private", desc: "Care, Care Freedom and Care Classic policyholders." },
      { name: "Reliance Health Insurance", type: "Private", desc: "Health Infinity and HealthGain plan holders." },
      { name: "Medi Assist TPA", type: "TPA", desc: "One of India's leading TPAs — processes claims for multiple insurers." },
      { name: "Raksha TPA", type: "TPA", desc: "TPA services for PSU and private insurance companies." },
      { name: "Vipul Medcorp TPA", type: "TPA", desc: "Claims processing for New India, Oriental and national insurer policies." },
      { name: "Heritage Health TPA", type: "TPA", desc: "Cashless and reimbursement claim management." },
      { name: "Paramount Health Services TPA", type: "TPA", desc: "End-to-end managed care and TPA services." },
    ],
  },
  {
    id: "ngo",
    title: "NGO & Community Partners",
    subtitle: "Extending eye care to the underserved",
    icon: Users,
    accentBar: "bg-amber-500",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    cardLeft: "border-l-4 border-l-amber-400",
    items: [
      { name: "Rotary Club of Karwar", type: "NGO", desc: "Annual free eye camps and cataract surgery drives for BPL patients." },
      { name: "Lions Club International – Karwar", type: "NGO", desc: "Vision screening and glasses distribution for school children." },
      { name: "District Blindness Control Society (DBCS)", type: "Govt. Programme", desc: "NPCB cataract surgeries under National Programme for Control of Blindness." },
    ],
  },
];

const STEPS = [
  { icon: BadgeCheck, title: "Show Your Card", desc: "Present your health card, insurance card or government ID at our registration counter." },
  { icon: FileText,   title: "We Handle Paperwork", desc: "Our billing team verifies your coverage and prepares cashless authorisation or reimbursement forms." },
  { icon: Phone,      title: "Get Treated", desc: "Receive world-class eye care with zero upfront payment or easy reimbursement after treatment." },
];

export default function EmpanelmentsPage() {
  const locale = useLocale();
  const lp = (href: string) => `/${locale}${href}`;

  const totalItems = CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <div className="bg-[#fafaf9]">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0f766e] to-[#0d9488] overflow-hidden">
        {/* Subtle geometric background */}
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
            Karwar Eye Hospital is empaneled with major government schemes, PSUs, insurance companies and TPAs — so you can focus on getting better, not on billing.
          </p>
          {/* Stats strip */}
          <div className="mt-8 inline-grid grid-cols-3 divide-x divide-white/20 bg-white/15 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <p className="text-xl sm:text-2xl font-bold text-white">{totalItems}+</p>
              <p className="text-teal-200 text-[10px] sm:text-xs mt-0.5">Empanelments</p>
            </div>
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <p className="text-xl sm:text-2xl font-bold text-white">{CATEGORIES.length}</p>
              <p className="text-teal-200 text-[10px] sm:text-xs mt-0.5">Categories</p>
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
                  {/* Connector line */}
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

      {/* ── Categories ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-14">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="reveal">
                {/* Category header row */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-11 h-11 rounded-md flex items-center justify-center shrink-0 shadow-sm ${cat.iconBg}`}>
                    <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl font-bold text-stone-800">{cat.title}</h2>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${cat.badgeBg} ${cat.badgeText}`}>
                        {cat.items.length} listed
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm mt-0.5">{cat.subtitle}</p>
                  </div>
                  {/* Accent rule */}
                  <div className={`hidden sm:block flex-1 h-0.5 rounded-full opacity-30 ${cat.accentBar}`} />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className={`bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden ${cat.cardLeft}`}
                    >
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-stone-800 text-sm leading-snug">{item.name}</p>
                        </div>
                        <p className="text-stone-400 text-xs leading-relaxed flex-1">{item.desc}</p>
                        <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${cat.badgeBg} ${cat.badgeText}`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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

