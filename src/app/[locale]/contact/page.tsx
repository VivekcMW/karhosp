import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import HospitalStatus from "@/components/HospitalStatus";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <MapPin className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="text-teal-100 text-base sm:text-lg">{t("pageSubtitle")}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#fefdf8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-stone-100 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-[#f0fdfa] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#0f766e]" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 mb-1">{t("address")}</p>
                <p className="text-stone-500 text-sm mb-2">{t("addressValue")}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Karwar+Eye+Hospital+Gurumath+road+Kajubag+Karwar+Karnataka+581301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0f766e] hover:text-[#0d6b63] text-xs font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {t("viewOnMap")}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-100 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 mb-1">{t("phone")}</p>
                <a href="tel:+919019725332" className="text-stone-500 text-sm hover:text-[#0f766e] font-medium">+91 90197 25332</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-100 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 mb-1">{t("email")}</p>
                <a href="mailto:karwareyeclinic52@gmail.com" className="text-stone-500 text-sm hover:text-[#0f766e] break-all">karwareyeclinic52@gmail.com</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-100 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 mb-1">{t("hours")}</p>
                <p className="text-stone-500 text-sm">{t("hoursValue")}</p>
                <p className="text-stone-400 text-sm">{t("hoursValue2")}</p>
                <div className="mt-3">
                  <HospitalStatus variant="inline" />
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-stone-200 h-72 sm:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.5678!2d74.1292!3d14.8013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ4JzA0LjciTiA3NMKwMDcnNDUuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapTitle")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
