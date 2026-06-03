import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  Eye, Calendar, ChevronRight, Star, Award, Stethoscope,
  EyeOff, Microscope, Baby, GlassWater, Monitor, Crosshair,
  Phone, Quote
} from "lucide-react";
import StatCounter from "@/components/StatCounter";
import DoctorCard from "@/components/DoctorCard";

export default function HomePage() {
  const t = useTranslations("home");
  const ts = useTranslations("services");
  const locale = useLocale();
  const lp = (href: string) => `/${locale}${href}`;

  const stats = [
    { value: "14+", label: t("stats.years") },
    { value: "15,000+", label: t("stats.patients") },
    { value: "5,000+", label: t("stats.surgeries") },
    { value: "6", label: t("stats.doctors") },
  ];

  const services = [
    { icon: Eye, key: "cataract", color: "bg-teal-50 text-[#0f766e]" },
    { icon: EyeOff, key: "glaucoma", color: "bg-blue-50 text-blue-600" },
    { icon: Microscope, key: "retina", color: "bg-purple-50 text-purple-600" },
    { icon: Baby, key: "pediatric", color: "bg-pink-50 text-pink-600" },
    { icon: GlassWater, key: "diabetic", color: "bg-orange-50 text-orange-600" },
    { icon: Stethoscope, key: "specs", color: "bg-green-50 text-green-600" },
    { icon: Monitor, key: "cvs", color: "bg-indigo-50 text-indigo-600" },
    { icon: Crosshair, key: "squint", color: "bg-rose-50 text-rose-600" },
  ] as const;

  const doctors = [
    { name: "Dr. Sharad Anil Kolvekar", spec: "Cataract & Squint Specialist", exp: 15, qual: "MBBS, MS, FIGO — Sankara Eye Hospital", consults: "All Days", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=500&q=80" },
    { name: "Dr. Siddhi Pandit", spec: "Cataract & Medical Retina Specialist", exp: 10, qual: "MBBS, MS, DNB, Fellowship in Medical Retina — Aravind Eye Hospitals", consults: "All Days", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=500&q=80" },
    { name: "Dr. Ravindra Bhat", spec: "Cataract & Glaucoma Surgeon", exp: 12, qual: "MBBS, D.O, DNB, FPRS", consults: "All Days", photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&h=500&q=80" },
  ];

  const testimonials = [
    {
      name: "Priya Desai",
      text: "After my cataract surgery here, I can see clearly for the first time in years. The staff were so caring and professional.",
      rating: 5,
    },
    {
      name: "Mohan Shenoy",
      text: "Dr. Hegde diagnosed my retina problem early. Excellent care and very affordable. I highly recommend this hospital.",
      rating: 5,
    },
    {
      name: "Leela Naik",
      text: "My daughter's squint was corrected here. The pediatric team was wonderful with her. Very happy with the results.",
      rating: 5,
    },
  ];

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#0a4a45] overflow-hidden">
        {/* Background video — poster image shown on slow connections */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          {/* Primary: girl on an eyesight test with an ophthalmologist */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-girl-on-an-eyesight-test-with-an-ophthalmologist-39501-large.mp4"
            type="video/mp4"
          />
          {/* Fallback: doctor examining patient with slit lamp */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-doctor-doing-an-eye-examination-to-his-patient-4891-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f766e]/80 via-[#0d9488]/70 to-[#0a4a45]/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <span className="hero-badge inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-5 sm:mb-6">
              <Award className="w-3.5 h-3.5" /> Karwar's Trusted Eye Care Centre
            </span>
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {t("heroTitle")}<br />
              <span className="text-amber-300">{t("heroTitleSpan")}</span>
            </h1>
            <p className="hero-sub text-teal-100 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              {t("heroSubtitle")}
            </p>
            <div className="hero-cta flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href={lp("/appointments")}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                {t("heroCta")}
              </Link>
              <a
                href="tel:+919019725332"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-xl transition-colors border border-white/30 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                Call for Appointment
              </a>
            </div>
          </div>
        </div>

        {/* Walk-in banner — pinned to bottom of hero */}
        <div className="relative z-10 bg-amber-400/90 backdrop-blur-sm py-2.5 px-4 text-center">
          <p className="text-amber-900 font-bold text-sm sm:text-base tracking-wide">
            Walk-ins Welcome — No Appointment Necessary! Just come in during working hours.
          </p>
        </div>
      </section>
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {stats.map(({ value, label }, i) => (
            <div key={label} className={`reveal reveal-d${i + 1} p-3 sm:p-4`}>
              <p className="text-2xl sm:text-3xl font-bold text-[#0f766e]">
                <StatCounter value={value} />
              </p>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-12 sm:py-16 bg-[#fefdf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800">{t("servicesTitle")}</h2>
            <p className="text-stone-500 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("servicesSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map(({ icon: Icon, key, color }, i) => (
              <Link key={key} href={lp("/services")} className={`reveal-scale reveal-d${(i % 4) + 1} bg-white rounded-2xl p-5 sm:p-6 border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex sm:block items-center gap-4`}>
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${color} flex items-center justify-center shrink-0 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 text-sm mb-0.5 sm:mb-1">{ts(`${key}.title`)}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{ts(`${key}.desc`)}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* ─── CALL TO BOOK ─── */}
          <div className="reveal mt-10 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#0d9488] px-6 py-7 sm:px-10 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-lg sm:text-xl leading-snug">Ready to book your eye check-up?</h3>
              <p className="text-teal-100 text-sm mt-1">Our specialists are available Mon – Sat, 9 AM – 6 PM</p>
            </div>
            <div className="flex flex-col xs:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:+919019725332"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0f766e] font-semibold px-5 py-3 rounded-xl hover:bg-teal-50 active:scale-[0.97] transition-all text-sm shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Call: +91 90197 25332
              </a>
              <Link
                href={lp("/appointments")}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-semibold px-5 py-3 rounded-xl hover:bg-amber-600 active:scale-[0.97] transition-all text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOCTORS ─── */}
      <section className="py-12 sm:py-16 bg-[#f0fdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800">{t("doctorsTitle")}</h2>
            <p className="text-stone-500 mt-2 text-sm sm:text-base">{t("doctorsSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doctors.map((doc, i) => (
              <DoctorCard
                key={doc.name}
                doc={doc}
                locale={locale}
                delayClass={`reveal-d${i + 1}`}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={lp("/doctors")} className="inline-flex items-center gap-1.5 text-[#0f766e] font-semibold text-sm hover:underline">
              View all doctors <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-stone-800 text-center mb-8 sm:mb-12">{t("testimonialsTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((item, i) => (
              <div key={item.name} className={`reveal reveal-d${i + 1} bg-[#f0fdfa] rounded-2xl p-6 border border-teal-100 hover:shadow-md transition-shadow duration-300`}>
                <Quote className="w-8 h-8 text-[#14b8a6] mb-3 opacity-60" />
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{item.text}</p>
                <div className="flex justify-end">
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-gradient-to-r from-[#0f766e] to-[#0d9488] py-12 sm:py-14">
        <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t("ctaBannerTitle")}</h2>
          <p className="text-teal-100 mb-6 sm:mb-8 text-base sm:text-lg">{t("ctaBannerSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href={lp("/appointments")}
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4" />
              {t("ctaBannerBtn")}
            </Link>
            <a
              href="tel:+919019725332"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-8 py-3 rounded-xl transition-colors border border-white/30 w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              {t("ctaBannerCall")}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
