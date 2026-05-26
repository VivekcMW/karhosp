import { useTranslations, useLocale } from "next-intl";
import { Calendar, Users } from "lucide-react";
import Link from "next/link";
import DoctorCard from "@/components/DoctorCard";

const doctorData = [
  {
    name: "Dr. Ramesh Naik",
    spec: "Cataract & LASIK Specialist",
    qual: "MBBS, MS (Ophthalmology)",
    exp: 18,
    consults: "Mon, Wed, Fri",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=500&q=80",
  },
  {
    name: "Dr. Suma Hegde",
    spec: "Retina & Vitreous Surgeon",
    qual: "MBBS, MS, FRCS (Retina)",
    exp: 14,
    consults: "Tue, Thu, Sat",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=500&q=80",
  },
  {
    name: "Dr. Anand Kamat",
    spec: "Pediatric Ophthalmology",
    qual: "MBBS, DNB (Ophthalmology)",
    exp: 10,
    consults: "Mon – Fri",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&h=500&q=80",
  },
  {
    name: "Dr. Kavitha Shenoy",
    spec: "Glaucoma Specialist",
    qual: "MBBS, MS (Ophthalmology), FAICO",
    exp: 12,
    consults: "Mon, Wed, Sat",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&h=500&q=80",
  },
  {
    name: "Dr. Vinod Bhat",
    spec: "General Ophthalmology",
    qual: "MBBS, DO",
    exp: 8,
    consults: "Tue, Thu, Sat",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&h=500&q=80",
  },
  {
    name: "Dr. Pooja Nayak",
    spec: "Cornea & External Disease",
    qual: "MBBS, MS, Fellowship (Cornea)",
    exp: 7,
    consults: "Mon – Sat",
    photo: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&h=500&q=80",
  },
];

export default function DoctorsPage() {
  const t = useTranslations("doctors");
  const locale = useLocale();
  const lp = (href: string) => `/${locale}${href}`;

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
          <p className="text-stone-500 text-sm mb-4">Want to consult one of our specialists?</p>
          <Link
            href={lp("/appointments")}
            className="inline-flex items-center gap-2 bg-[#0f766e] hover:bg-[#0d6b63] text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-md"
          >
            <Calendar className="w-4 h-4" />
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}

