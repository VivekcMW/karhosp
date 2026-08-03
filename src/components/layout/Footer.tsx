import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
          {/* Brand — Coastal Wave Eye logo (light variant for teal background) */}
          <div>
            <Image
              src="/logos/logo-wave-light.svg"
              alt="Karwar Eye Hospital"
              width={240}
              height={140}
              unoptimized
              className="h-20 w-auto mb-4"
            />
            <p className="text-[10px] text-teal-200 tracking-widest uppercase mb-2">Karwar, Karnataka</p>
            <p className="text-teal-100 text-sm leading-relaxed">{t("tagline")}</p>

            {/* Socials */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/karwareyehospital"
                target="_blank"
                rel="noreferrer"
                aria-label={t("instagramAria")}
                className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/Karwar-Eye-Hospital/61590300401636/"
                target="_blank"
                rel="noreferrer"
                aria-label={t("facebookAria")}
                className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {(["home", "about", "services", "doctors", "empanelments", "gallery", "appointments", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link href={localePath(key === "home" ? "/" : `/${key}`)} className="text-teal-100 hover:text-white text-sm transition-colors block py-1">
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
                <a href="mailto:karwareyeclinic52@gmail.com" className="hover:text-white transition-colors break-all">karwareyeclinic52@gmail.com</a>
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
