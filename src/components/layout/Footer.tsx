import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Eye, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("contact");
  const tn = useTranslations("nav");
  const locale = useLocale();

  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <footer className="bg-[#0f766e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Karwar Eye Hospital</p>
                <p className="text-[10px] text-teal-200 tracking-widest uppercase">Karwar, Karnataka</p>
              </div>
            </div>
            <p className="text-teal-100 text-sm leading-relaxed">{t("tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {(["home", "about", "services", "doctors", "gallery", "appointments", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link href={localePath(key === "home" ? "/" : `/${key}`)} className="text-teal-100 hover:text-white text-sm transition-colors">
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">{t("contactInfo")}</h3>
            <ul className="space-y-3 text-sm text-teal-100">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{tc("addressValue")}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+919019725332" className="hover:text-white transition-colors">+91 90197 25332</a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@karwareyehospital.com" className="hover:text-white transition-colors">info@karwareyehospital.com</a>
              </li>
              <li className="flex gap-2 items-start">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>{tc("hoursValue")}</p>
                  <p>{tc("hoursValue2")}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">{t("legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={localePath("/privacy-policy")} className="text-teal-100 hover:text-white text-sm transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href={localePath("/terms-of-use")} className="text-teal-100 hover:text-white text-sm transition-colors">
                  {t("termsOfUse")}
                </Link>
              </li>
              <li>
                <Link href={localePath("/sample-logos")} className="text-teal-100 hover:text-white text-sm transition-colors">
                  Sample Logos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-teal-600 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-200">
          <span>{t("rights", { year: new Date().getFullYear() })}</span>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="flex gap-4">
              <Link href={localePath("/privacy-policy")} className="hover:text-white transition-colors">{t("privacyPolicy")}</Link>
              <Link href={localePath("/terms-of-use")} className="hover:text-white transition-colors">{t("termsOfUse")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
