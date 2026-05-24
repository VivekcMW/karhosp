import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

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
          <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="hero-sub text-teal-100 text-base sm:text-lg">{t("pageSubtitle")}</p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 sm:py-16 bg-[#fefdf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {doctorData.map((doc, i) => (
            <div
              key={doc.name}
              className={`reveal-scale reveal-d${(i % 3) + 1} bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
            >
              {/* Photo */}
              <div className="mx-3 mt-3 rounded-2xl bg-[#ccfbf1] overflow-hidden h-56 flex items-end justify-center">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="img-zoom w-full h-[94%] object-cover object-top"
                />
              </div>

              {/* Info */}
              <div className="px-5 pt-4 pb-5 flex flex-col gap-1">
                <h3 className="font-bold text-stone-800 text-lg leading-tight text-center">{doc.name}</h3>
                <p className="text-[#0f766e] font-semibold text-sm text-center">{doc.spec}</p>
                <p className="text-stone-400 text-xs text-center leading-snug">{doc.qual}</p>

                {/* Experience + Consultation */}
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-xs text-stone-500">
                    <span className="font-bold text-stone-700">{doc.exp}+</span> yrs exp
                  </span>
                  <span className="w-px h-3.5 bg-stone-200" />
                  <div className="flex items-center gap-1 text-xs text-[#0f766e] font-medium">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span>{doc.consults}</span>
                  </div>
                </div>

                {/* Book button */}
                <Link
                  href={lp("/appointments")}
                  className="mt-3 flex items-center justify-center gap-1.5 bg-[#f0fdfa] hover:bg-[#0f766e] text-[#0f766e] hover:text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  Book Appointment
                </Link>
              </div>
            </div>
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

