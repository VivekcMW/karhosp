import { useTranslations, useLocale } from "next-intl";
import { Calendar, Users } from "lucide-react";
import Link from "next/link";
import DoctorCard from "@/components/DoctorCard";
import { DOCTORS } from "@/lib/doctors-data";

export default function DoctorsPage() {
  const t = useTranslations("doctors");
  const td = useTranslations("doctorsData");
  const locale = useLocale();
  const lp = (href: string) => `/${locale}${href}`;

  const doctorData = DOCTORS.map((d) => ({
    ...d,
    spec: td(`${d.id}.spec`),
    qual: td(`${d.id}.qual`),
    consults: td(`${d.id}.consults`),
  }));

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="hero-sub text-teal-100 text-base sm:text-lg">{t("pageSubtitle")}</p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 sm:py-16 bg-[#fefdf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {doctorData.map((doc, i) => (
            <DoctorCard
              key={doc.name}
              doc={doc}
              locale={locale}
              delayClass={`reveal-d${(i % 3) + 1}`}
            />
          ))}
        </div>

        {/* Book CTA */}
        <div className="text-center mt-12">
          <p className="text-stone-500 text-sm mb-4">{t("consultCta")}</p>
          <Link
            href={lp("/appointments")}
            className="inline-flex items-center gap-2 bg-[#0f766e] hover:bg-[#0d6b63] text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-md"
          >
            <Calendar className="w-4 h-4" />
            {t("bookAppointment")}
          </Link>
        </div>
      </section>
    </div>
  );
}

