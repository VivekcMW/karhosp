"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["all", "facility", "equipment", "team", "camps"] as const;
type Category = (typeof CATEGORIES)[number];

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: Exclude<Category, "all">;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // Facility
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    alt: "Hospital reception area",
    category: "facility",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    alt: "Patient waiting area",
    category: "facility",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80",
    alt: "Surgical theatre",
    category: "facility",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80",
    alt: "Consultation room",
    category: "facility",
  },
  // Equipment
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1588776814546-1ffbb178d730?auto=format&fit=crop&w=800&q=80",
    alt: "Slit lamp examination",
    category: "equipment",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80",
    alt: "Advanced diagnostic equipment",
    category: "equipment",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    alt: "Optical coherence tomography",
    category: "equipment",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
    alt: "Laser treatment device",
    category: "equipment",
  },
  // Team
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    alt: "Dr. Ramesh Naik – Cataract & LASIK Specialist",
    category: "team",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    alt: "Dr. Suma Hegde – Retina & Vitreous Surgeon",
    category: "team",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    alt: "Dr. Anand Kamat – Pediatric Ophthalmology",
    category: "team",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    alt: "Medical support team",
    category: "team",
  },
  // Eye Camps
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    alt: "Community eye camp",
    category: "camps",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    alt: "Free screening camp",
    category: "camps",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    alt: "Rural outreach programme",
    category: "camps",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    alt: "School vision screening",
    category: "camps",
  },
];

/**
 * "All" view — 4-column bento, repeating group of 8:
 *   Row A: [0 · 2×2] [1 · 1×1] [2 · 1×1]
 *   Row B: [0 cont ] [3 · 2×1        ]
 *   Row C: [4] [5] [6] [7]
 */
function getAllBentoClass(index: number): string {
  const pos = index % 8;
  const map: Record<number, string> = {
    0: "col-span-2 row-span-2",
    1: "col-span-1 row-span-1",
    2: "col-span-1 row-span-1",
    3: "col-span-2 row-span-1",
    4: "col-span-1 row-span-1",
    5: "col-span-1 row-span-1",
    6: "col-span-1 row-span-1",
    7: "col-span-1 row-span-1",
  };
  return map[pos] ?? "col-span-1 row-span-1";
}

/**
 * Per-category view — 3-column bento, 4 items:
 *   Row A: [0 · 2×2] [1 · 1×1]
 *   Row B: [0 cont ] [2 · 1×1]
 *   Row C: [3 · 3×1           ]
 */
function getCategoryBentoClass(index: number): string {
  const map: Record<number, string> = {
    0: "col-span-2 row-span-2",
    1: "col-span-1 row-span-1",
    2: "col-span-1 row-span-1",
    3: "col-span-3 row-span-1",
  };
  return map[index] ?? "col-span-1 row-span-1";
}

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const isAll = activeCategory === "all";

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const len = filtered.length;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + len) % len));
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % len));
      if (e.key === "Escape") setLightboxIndex(null);
    };
    globalThis.addEventListener("keydown", handleKey);
    return () => globalThis.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#0d9488] py-12 sm:py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Images className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-teal-200" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("pageTitle")}</h1>
          <p className="text-teal-100 text-base sm:text-lg">{t("pageSubtitle")}</p>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "all"
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((i) => i.category === cat).length;
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#0f766e] text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {t(`cat_${cat}`)}
                  <span
                    className={`text-[11px] font-semibold rounded px-1.5 py-0.5 tabular-nums ${
                      active ? "bg-white/25 text-white" : "bg-stone-200 text-stone-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bento Grid ── */}
      <section className="py-10 sm:py-14 bg-[#fefdf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label when filtered */}
          {!isAll && (
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-stone-800">{t(`cat_${activeCategory}`)}</h2>
              <span className="text-sm text-stone-400">{filtered.length} {t("photos")}</span>
            </div>
          )}

          {/* Desktop bento */}
          <div
            key={activeCategory}
            className={`hidden sm:grid gap-3 auto-rows-[180px] ${
              isAll ? "grid-cols-4" : "grid-cols-3"
            }`}
          >
            {filtered.map((item, idx) => {
              const bentoClass = isAll
                ? getAllBentoClass(idx)
                : getCategoryBentoClass(idx);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightbox(idx)}
                  aria-label={item.alt}
                  className={`${bentoClass} group relative overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Bottom gradient + caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                    <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                      {item.alt}
                    </p>
                  </div>
                  {/* Category pill — visible on "all" hover */}
                  {isAll && (
                    <span className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.category}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile: 2-column grid */}
          <div className="sm:hidden grid grid-cols-2 gap-2.5 auto-rows-[130px]">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(idx)}
                aria-label={item.alt}
                className="group relative overflow-hidden rounded-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={closeLightbox}
            aria-label="Close lightbox"
            tabIndex={-1}
          />

          {/* Close */}
          <button
            type="button"
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            type="button"
            className="absolute left-3 sm:left-5 z-10 text-white/80 hover:text-white p-3 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            onClick={prev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative z-10 max-w-5xl w-full mx-auto px-16 flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={filtered[lightboxIndex].src.replace("w=800", "w=1400")}
              alt={filtered[lightboxIndex].alt}
              className="max-h-[78vh] w-auto mx-auto rounded-md object-contain shadow-2xl"
            />
            <p className="text-white/75 text-sm text-center mt-4 leading-snug px-4">
              {filtered[lightboxIndex].alt}
            </p>
            <p className="text-white/35 text-xs text-center mt-1.5 tabular-nums">
              {lightboxIndex + 1} / {filtered.length}
            </p>
          </div>

          {/* Next */}
          <button
            type="button"
            className="absolute right-3 sm:right-5 z-10 text-white/80 hover:text-white p-3 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            onClick={next}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
