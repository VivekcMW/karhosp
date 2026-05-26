"use client";

import { useEffect, useState } from "react";
import { Award, Calendar, Clock, GraduationCap, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export type Doctor = {
  name: string;
  spec: string;
  qual: string;
  exp: number;
  consults: string;
  photo: string;
};

export default function DoctorCard({
  doc,
  locale,
  delayClass,
}: {
  doc: Doctor;
  locale: string;
  delayClass: string;
}) {
  const [open, setOpen] = useState(false);
  const lp = (href: string) => `/${locale}${href}`;

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    globalThis.addEventListener("keydown", handleKey);
    return () => globalThis.removeEventListener("keydown", handleKey);
  }, [open]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ─── Card ─── */}
      <div
        className={`reveal-scale ${delayClass} flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
      >
        {/* Clickable photo + info → opens modal */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-t-3xl"
          aria-label={`View profile of ${doc.name}`}
        >
          <div className="mx-3 mt-3 rounded-2xl bg-[#ccfbf1] overflow-hidden h-56 flex items-end justify-center">
            <img
              src={doc.photo}
              alt={doc.name}
              className="img-zoom w-full h-[94%] object-cover object-top"
            />
          </div>
          <div className="px-5 pt-4 pb-3 flex flex-col gap-1">
            <h3 className="font-bold text-stone-800 text-lg leading-tight text-center">
              {doc.name}
            </h3>
            <p className="text-[#0f766e] font-semibold text-sm text-center">{doc.spec}</p>
            <p className="text-stone-400 text-xs text-center leading-snug">{doc.qual}</p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-xs text-stone-500">
                <span className="font-bold text-stone-700">{doc.exp}+</span> yrs exp
              </span>
              <span className="w-px h-3.5 bg-stone-200" />
              <div className="flex items-center gap-1 text-xs text-[#0f766e] font-medium">
                <Calendar className="w-3 h-3 shrink-0" />
                <span>{doc.consults}</span>
              </div>
            </div>
          </div>
        </button>

        {/* Action row */}
        <div className="px-5 pb-5 mt-auto flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center justify-center bg-[#f0fdfa] hover:bg-teal-100 text-[#0f766e] text-xs font-semibold py-2.5 rounded-xl transition-colors"
          >
            View Profile
          </button>
          <Link
            href={lp("/appointments")}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#0f766e] hover:bg-[#0d6b63] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            Book
          </Link>
        </div>
      </div>

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={`Profile of ${doc.name}`}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden pointer-events-auto">
                {/* Photo header */}
                <div className="relative h-52 overflow-hidden bg-[#ccfbf1]">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-12">
                    <p className="font-bold text-lg text-white leading-tight">{doc.name}</p>
                    <p className="text-sm text-white/80 mt-0.5">{doc.spec}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-sm"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-stone-600" />
                  </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 px-4 pt-4">
                  <div className="bg-[#f0fdfa] rounded-xl py-3 text-center">
                    <Award className="w-4 h-4 text-[#0f766e] mx-auto mb-1" />
                    <p className="text-sm font-bold text-stone-800">{doc.exp}+</p>
                    <p className="text-[10px] text-stone-500">Yrs Exp</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl py-3 px-1 text-center">
                    <GraduationCap className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                    <p className="text-[11px] font-bold text-stone-800 leading-tight">
                      {doc.qual.split(",")[0].trim()}
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">Degree</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl py-3 px-1 text-center">
                    <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <p className="text-[11px] font-bold text-stone-800 leading-tight">
                      {doc.consults}
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">Available</p>
                  </div>
                </div>

                {/* Full qualification */}
                <p className="text-[11px] text-stone-400 text-center px-4 pt-2 pb-1">
                  {doc.qual}
                </p>

                {/* CTA */}
                <div className="px-4 pb-5 pt-2">
                  <Link
                    href={lp("/appointments")}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-[#0f766e] hover:bg-[#0d6b63] text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
