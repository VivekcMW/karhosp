"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Eye, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "doctors", href: "/doctors" },
    { key: "contact", href: "/contact" },
  ] as const;

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "kn" : "en";
    // Remove current locale prefix and replace
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
  };

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
        <span className="hidden sm:block shrink-0">Mon – Sat: 9 AM – 6 PM</span>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={localePath("/")} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-[#0f766e] flex items-center justify-center group-hover:bg-[#0d6b63] transition-colors">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-[#0f766e] text-sm tracking-tight">Karwar Eye</p>
            <p className="text-[10px] text-stone-500 tracking-widest uppercase">Hospital</p>
          </div>
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
          <button
            onClick={switchLocale}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold border border-[#0f766e] text-[#0f766e] px-3 py-1.5 rounded-full hover:bg-[#f0fdfa] transition-colors"
          >
            {t("switchLang")}
          </button>

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
              <button
                onClick={() => { switchLocale(); setMenuOpen(false); }}
                className="flex-1 text-center text-sm font-semibold border border-[#0f766e] text-[#0f766e] py-2.5 rounded-xl hover:bg-[#f0fdfa] transition-colors"
              >
                {t("switchLang")}
              </button>
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
