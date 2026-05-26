import { useTranslations } from "next-intl";
import { Calendar, Phone, Clock, MessageCircle, MapPin } from "lucide-react";

const HOSPITAL_WHATSAPP = "919019725332";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Karwar Eye Hospital! 👋\nI would like to book an appointment. Please let me know the available slots.\n\nThank you!"
);
const WHATSAPP_URL = `https://wa.me/${HOSPITAL_WHATSAPP}?text=${WHATSAPP_MESSAGE}`;

export default function AppointmentsPage() {
  const t = useTranslations("appointments");

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="hero-sub text-teal-100 text-base sm:text-lg">{t("pageSubtitle")}</p>
        </div>
      </section>

      {/* Booking options */}
      <section className="py-14 sm:py-20 bg-[#fefdf8]">
        <div className="max-w-lg mx-auto px-4 sm:px-6 space-y-5">

          {/* WhatsApp CTA — primary */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] text-white font-semibold px-6 py-5 rounded-2xl shadow-lg transition-all duration-200 group"
          >
            <span className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </span>
            <div className="text-left">
              <p className="text-base font-bold leading-tight">Book via WhatsApp</p>
              <p className="text-sm text-white/80 mt-0.5">Tap to open a pre-filled message</p>
            </div>
            <span className="ml-auto text-white/60 group-hover:translate-x-1 transition-transform text-xl">→</span>
          </a>

          {/* Call CTA — secondary */}
          <a
            href="tel:+919019725332"
            className="flex items-center gap-4 w-full bg-white hover:bg-[#f0fdfa] active:scale-[0.98] text-stone-800 font-semibold px-6 py-5 rounded-2xl shadow-sm border border-stone-100 hover:border-teal-200 transition-all duration-200 group"
          >
            <span className="w-12 h-12 bg-[#f0fdfa] rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-[#0f766e]" />
            </span>
            <div className="text-left">
              <p className="text-base font-bold leading-tight">Call Us Directly</p>
              <p className="text-sm text-stone-500 mt-0.5">+91 90197 25332</p>
            </div>
            <span className="ml-auto text-stone-300 group-hover:translate-x-1 transition-transform text-xl">→</span>
          </a>

          {/* Info card */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-6 py-5 space-y-4 mt-2">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Details</p>
            <div className="flex items-start gap-3 text-sm text-stone-600">
              <Clock className="w-4 h-4 text-[#0f766e] mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-stone-800">Working Hours</p>
                <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
                <p className="text-stone-400">Sunday: Closed</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-stone-600">
              <MapPin className="w-4 h-4 text-[#0f766e] mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-stone-800">Location</p>
                <p>Karwar Eye Hospital, Karwar,</p>
                <p>Uttara Kannada District, Karnataka – 581301</p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-stone-400 pt-1">
            Walk-ins are also welcome during working hours.
          </p>
        </div>
      </section>
    </div>
  );
}

