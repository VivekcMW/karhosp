"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import HospitalStatus from "@/components/HospitalStatus";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "doctors", href: "/doctors" },
    { key: "empanelments", href: "/empanelments" },
    { key: "gallery", href: "/gallery" },
    { key: "contact", href: "/contact" },
  ] as const;

  // Build the URL for the opposite locale. Uses a full <a> navigation
  // (not router.push) because App Router caches the [locale] layout segment
  // and a soft navigation between locales doesn't re-render messages.
  const otherLocale = locale === "en" ? "kn" : "en";
  const switchLocaleHref = (() => {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    return segments.join("/") || `/${otherLocale}`;
  })();

  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-stone-100">
      {/* Top bar */}
      <div className="bg-[#0f766e] text-white text-xs py-1.5 px-4 flex justify-between items-center min-w-0">
        <span className="flex items-center gap-1.5 min-w-0">
          <Phone className="w-3 h-3 shrink-0" />
          <a href="tel:+919019725332" className="truncate hover:text-white transition-colors">+91 90197 25332</a>
          <a href="mailto:info@karwareyehospital.com" className="hidden xs:inline hover:text-white transition-colors">&nbsp;|&nbsp; info@karwareyehospital.com</a>
        </span>
        <HospitalStatus variant="topbar" />
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo — Coastal Wave Eye brand mark */}
        <Link href={localePath("/")} className="flex items-center gap-2 group" aria-label="Karwar Eye Hospital — Home">
          <Image
            src="/logos/logo-wave-icon.svg"
            alt="Karwar Eye Hospital"
            width={220}
            height={140}
            priority
            unoptimized
            className="h-12 w-auto group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ key, href }) => {
            const isActive = pathname === localePath(href) || (href !== "/" && pathname.startsWith(localePath(href)));
            return (
              <li key={key}>
                <Link
                  href={localePath(href)}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#0f766e] border-b-2 border-[#0f766e] pb-0.5"
                      : "text-stone-600 hover:text-[#0f766e]"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <a
            href={switchLocaleHref}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold border border-[#0f766e] text-[#0f766e] px-3 py-1.5 rounded-full hover:bg-[#f0fdfa] transition-colors"
          >
            {t("switchLang")}
          </a>

          {/* Theme toggle */}
          <ThemeToggle className="hidden sm:flex" />

          {/* Book CTA */}
          <Link
            href={localePath("/appointments")}
            className="hidden md:inline-flex bg-[#0f766e] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0d6b63] transition-colors"
          >
            {t("appointments")}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 pb-5 pt-2 space-y-0.5">
          {navLinks.map(({ key, href }) => {
            const isActive = pathname === localePath(href) || (href !== "/" && pathname.startsWith(localePath(href)));
            return (
              <Link
                key={key}
                href={localePath(href)}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center py-3 text-sm font-medium border-b border-stone-100 transition-colors ${
                  isActive ? "text-[#0f766e]" : "text-stone-700 hover:text-[#0f766e]"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
          <div className="pt-3 flex flex-col gap-3">
            <div className="flex gap-3">
              <a
                href={switchLocaleHref}
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm font-semibold border border-[#0f766e] text-[#0f766e] py-2.5 rounded-xl hover:bg-[#f0fdfa] transition-colors"
              >
                {t("switchLang")}
              </a>
              <ThemeToggle className="!w-auto px-3 rounded-xl border-[#0f766e] text-[#0f766e]" />
            </div>
            <Link
              href={localePath("/appointments")}
              onClick={() => setMenuOpen(false)}
              className="w-full text-center bg-[#0f766e] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#0d6b63] transition-colors"
            >
              {t("appointments")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
