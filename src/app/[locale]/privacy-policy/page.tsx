import { useTranslations } from "next-intl";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  const sections = [
    { title: t("s1Title"), body: t("s1") },
    { title: t("s2Title"), body: t("s2") },
    { title: t("s3Title"), body: t("s3") },
    { title: t("s4Title"), body: t("s4") },
    { title: t("s5Title"), body: t("s5") },
    { title: t("s6Title"), body: t("s6") },
    { title: t("s7Title"), body: t("s7") },
    { title: t("s8Title"), body: t("s8") },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Shield className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="text-teal-100 text-sm sm:text-base">{t("effective")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-[#fefdf8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-stone-600 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
            {t("intro")}
          </p>

          <div className="space-y-8">
            {sections.map(({ title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-100 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-[#0f766e] mb-3">{title}</h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
