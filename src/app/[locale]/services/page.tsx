import { useTranslations } from "next-intl";
import { Eye, Scan, EyeOff, Microscope, Baby, GlassWater, Stethoscope, Monitor, Activity } from "lucide-react";

const serviceList = [
  { icon: Eye, key: "cataract", color: "bg-teal-50", iconColor: "text-[#0f766e]", border: "border-teal-100" },
  { icon: Scan, key: "lasik", color: "bg-amber-50", iconColor: "text-amber-600", border: "border-amber-100" },
  { icon: EyeOff, key: "glaucoma", color: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100" },
  { icon: Microscope, key: "retina", color: "bg-purple-50", iconColor: "text-purple-600", border: "border-purple-100" },
  { icon: Baby, key: "pediatric", color: "bg-pink-50", iconColor: "text-pink-600", border: "border-pink-100" },
  { icon: GlassWater, key: "diabetic", color: "bg-orange-50", iconColor: "text-orange-600", border: "border-orange-100" },
  { icon: Stethoscope, key: "specs", color: "bg-green-50", iconColor: "text-green-600", border: "border-green-100" },
  { icon: Monitor, key: "cvs", color: "bg-indigo-50", iconColor: "text-indigo-600", border: "border-indigo-100" },
] as const;

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Activity className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="text-teal-100 text-base sm:text-lg">{t("pageSubtitle")}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 bg-[#fefdf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {serviceList.map(({ icon: Icon, key, color, iconColor, border }) => (
            <div
              key={key}
              className={`bg-white rounded-2xl p-5 sm:p-7 border ${border} hover:shadow-lg transition-shadow`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${color} flex items-center justify-center mb-4 sm:mb-5`}>
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColor}`} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-800 mb-2">{t(`${key}.title`)}</h3>
              <p className="text-stone-500 leading-relaxed text-sm">{t(`${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
