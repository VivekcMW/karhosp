"use client";

import { useTranslations } from "next-intl";
import { Calendar, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function AppointmentsPage() {
  const t = useTranslations("appointments");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", doctor: "", concern: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const doctors = [
    "Dr. Ramesh Naik – Cataract & LASIK",
    "Dr. Suma Hegde – Retina",
    "Dr. Anand Kamat – Pediatric",
    "Dr. Kavitha Shenoy – Glaucoma",
    "Dr. Vinod Bhat – General",
    "Dr. Pooja Nayak – Cornea",
  ];

  const times = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="text-teal-100 text-base sm:text-lg">{t("pageSubtitle")}</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16 bg-[#fefdf8]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-[#f0fdfa] border border-teal-200 rounded-2xl p-10 text-center">
              <CheckCircle className="w-16 h-16 text-[#0f766e] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-stone-800 mb-2">{t("success")}</h2>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", date: "", time: "", doctor: "", concern: "" }); }}
                className="mt-4 text-sm text-[#0f766e] font-medium hover:underline"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("name")} *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("phone")} *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("date")} *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("time")}</label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent bg-white"
                  >
                    <option value="">Select...</option>
                    {times.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("doctor")}</label>
                <select
                  value={form.doctor}
                  onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent bg-white"
                >
                  <option value="">Any available doctor</option>
                  {doctors.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Concern */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("concern")}</label>
                <textarea
                  rows={3}
                  value={form.concern}
                  onChange={(e) => setForm({ ...form, concern: e.target.value })}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent resize-none"
                />
              </div>

              <p className="text-xs text-stone-400">{t("note")}</p>

              <button
                type="submit"
                className="w-full bg-[#0f766e] hover:bg-[#0d6b63] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {t("submit")}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
