"use client";

import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import Link from "next/link";

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
  const t = useTranslations("doctorCard");
  const lp = (href: string) => `/${locale}${href}`;

  return (
    <div
      className={`reveal-scale ${delayClass} flex flex-col bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
    >
      {/* Photo + info */}
      <div>
        <div className="mx-3 mt-3 rounded-md bg-[#ccfbf1] overflow-hidden h-56 flex items-end justify-center">
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
          <p className="text-stone-400 text-xs text-center leading-relaxed break-words hyphens-auto">{doc.qual}</p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-xs text-stone-500">
              <span className="font-bold text-stone-700">{doc.exp}+</span> {t("yrsExp")}
            </span>
            <span className="w-px h-3.5 bg-stone-200" />
            <div className="flex items-center gap-1 text-xs text-[#0f766e] font-medium">
              <Calendar className="w-3 h-3 shrink-0" />
              <span>{doc.consults}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action row */}
      <div className="px-5 pb-5 mt-auto">
        <Link
          href={lp("/appointments")}
          className="w-full flex items-center justify-center gap-1.5 bg-[#0f766e] hover:bg-[#0d6b63] text-white text-sm font-semibold py-3 rounded-md transition-colors"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          {t("book")}
        </Link>
      </div>
    </div>
  );
}
