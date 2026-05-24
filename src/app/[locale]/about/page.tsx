import { useTranslations } from "next-intl";
import { CheckCircle, Eye, Heart, Target } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  const whyItems = [
    t("why1"), t("why2"), t("why3"),
    t("why4"), t("why5"), t("why6"),
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Eye className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="text-teal-100 text-base sm:text-lg leading-relaxed">{t("intro")}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div className="bg-[#f0fdfa] rounded-2xl p-8 border border-teal-100">
            <div className="w-12 h-12 rounded-xl bg-[#0f766e] flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-stone-800 mb-3">{t("missionTitle")}</h2>
            <p className="text-stone-600 leading-relaxed">{t("mission")}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-stone-800 mb-3">{t("visionTitle")}</h2>
            <p className="text-stone-600 leading-relaxed">{t("vision")}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-[#fefdf8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-8 sm:mb-10">{t("whyTitle")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left">
            {whyItems.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#0f766e] mt-0.5 shrink-0" />
                <p className="text-stone-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
