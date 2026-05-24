"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">

          {/* Info cards */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-stone-100 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-[#f0fdfa] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#0f766e]" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 mb-1">{t("address")}</p>
                <p className="text-stone-500 text-sm">{t("addressValue")}</p>
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
                <a href="mailto:info@karwareyehospital.com" className="text-stone-500 text-sm hover:text-[#0f766e]">info@karwareyehospital.com</a>
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
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 h-48 sm:h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.123!2d74.1292!3d14.8013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe9b4f1f77b1e5%3A0x1234567890abcdef!2sKarwar%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Karwar Eye Hospital Location"
              />
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-6">{t("formTitle")}</h2>
            {sent ? (
              <div className="bg-[#f0fdfa] border border-teal-200 rounded-2xl p-10 text-center">
                <CheckCircle className="w-14 h-14 text-[#0f766e] mx-auto mb-3" />
                <p className="text-stone-700 font-medium">Message sent! We'll get back to you soon.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} className="mt-3 text-sm text-[#0f766e] hover:underline">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm space-y-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("formName")} *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("formEmail")}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("formMessage")} *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0f766e] hover:bg-[#0d6b63] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {t("formSend")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
