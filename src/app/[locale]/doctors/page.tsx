import { useTranslations, useLocale } from "next-intl";
import { Calendar, Users } from "lucide-react";
import Link from "next/link";
import DoctorCard from "@/components/DoctorCard";
import { DOCTORS, SPECIALTIES } from "@/lib/doctors-data";

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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="text-teal-100 text-base sm:text-lg font-medium">{t("pageSubtitle")}</p>
        </div>
      </section>

      {/* Introduction Text */}
      <section className="bg-[#fefdf8] py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed text-center">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Doctors by Specialty */}
      <section className="bg-[#fefdf8] pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {SPECIALTIES.map((specialty) => {
            const specialtyDoctors = doctorData.filter(
              (doc) => doc.specialty === specialty.id
            );
            
            if (specialtyDoctors.length === 0) return null;

            return (
              <div key={specialty.id} className="reveal-scale reveal-d1">
                {/* Specialty Header */}
                <div className="mb-6 sm:mb-8">
                  <div className="mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 uppercase tracking-wide">
                      {t(`specialties.${specialty.key}`)}
                    </h2>
                  </div>
                  <div className="h-1 w-20 bg-[#0f766e] rounded-full" />
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {specialtyDoctors.map((doc, i) => (
                    <DoctorCard
                      key={doc.name}
                      doc={doc}
                      locale={locale}
                      delayClass={`reveal-d${(i % 3) + 1}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-t border-stone-200 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-stone-600 text-base sm:text-lg mb-6">{t("consultCta")}</p>
          <Link
            href={lp("/appointments")}
            className="inline-flex items-center gap-2 bg-[#0f766e] hover:bg-[#0d6b63] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg"
          >
            <Calendar className="w-5 h-5" />
            {t("bookAppointment")}
          </Link>
        </div>
      </section>
    </div>
  );
}

