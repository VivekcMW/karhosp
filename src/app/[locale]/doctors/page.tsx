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
              {/* Photo box */}
              <div className="mx-3 mt-3 rounded-2xl bg-[#ccfbf1] overflow-hidden h-64 flex items-end justify-center relative">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="img-zoom w-full h-[92%] object-cover object-top"
                />
              </div>

              {/* Info */}
              <div className="px-5 py-4 text-center">
                <h3 className="font-bold text-stone-800 text-lg leading-tight">{doc.name}</h3>
                <p className="text-stone-500 text-sm mt-0.5">{doc.spec}</p>

                {/* Consultation days */}
                <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-[#0f766e] font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{doc.consults}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-stone-100 mt-3 pt-3 flex items-center justify-center gap-4">
                  <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#f0fdfa] flex items-center justify-center text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-colors">
                    {/* Facebook */}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="X / Twitter" className="w-8 h-8 rounded-full bg-[#f0fdfa] flex items-center justify-center text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-colors">
                    {/* X / Twitter */}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#f0fdfa] flex items-center justify-center text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-colors">
                    {/* Instagram */}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book CTA */}
        <div className="reveal text-center mt-12">
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

