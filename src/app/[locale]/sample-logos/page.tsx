"use client";

import Image from "next/image";
import { useState } from "react";

type Logo = {
  file: string;
  name: string;
  desc: string;
  tags: string[];
};

const logos: Logo[] = [
  {
    file: "/logos/logo-wave.svg",
    name: "Coastal Wave Eye",
    desc: "Eye iris with rolling ocean wave — Karwar coastal identity. Primary brand mark.",
    tags: ["Primary", "Coastal"],
  },
  {
    file: "/logos/logo-lighthouse.svg",
    name: "Lighthouse Eye",
    desc: "Karwar lighthouse with light rays and starry night sea.",
    tags: ["Coastal", "Detailed"],
  },
  {
    file: "/logos/logo-lotus.svg",
    name: "Lotus Eye",
    desc: "8-petal lotus mandala — Indian heritage & healing.",
    tags: ["Heritage", "Symmetric"],
  },
  {
    file: "/logos/logo-sunrise.svg",
    name: "Sunrise Eye",
    desc: "Coastal sunrise with fishing boat — hope & new vision.",
    tags: ["Coastal", "Warm"],
  },
];

export default function SampleLogosPage() {
  const [bg, setBg] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState<string | null>(null);

  const copyPath = async (file: string) => {
    try {
      await navigator.clipboard.writeText(file);
      setCopied(file);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const previewBg = bg === "light" ? "bg-primary-light" : "bg-stone-900";

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-primary text-white py-14 text-center px-4">
        <p className="text-teal-200 text-xs tracking-widest uppercase mb-2">
          Internal Design Reference
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Sample Logos
        </h1>
        <p className="mt-3 text-teal-100 text-sm max-w-lg mx-auto">
          Pick a mark for Karwar Eye Hospital. Preview on light or dark
          backgrounds, copy the asset path, or download the SVG.
        </p>
      </section>

      {/* Toolbar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-sm">
          <div className="text-sm text-stone-600">
            <span className="font-semibold text-primary">{logos.length}</span>{" "}
            logo concepts
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 mr-1">Preview on</span>
            <button
              type="button"
              onClick={() => setBg("light")}
              className={`px-3 py-1.5 rounded-full border transition-colors ${
                bg === "light"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-stone-600 border-stone-300 hover:border-primary"
              }`}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setBg("dark")}
              className={`px-3 py-1.5 rounded-full border transition-colors ${
                bg === "dark"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-stone-600 border-stone-300 hover:border-primary"
              }`}
            >
              Dark
            </button>
          </div>
        </div>
      </section>

      {/* Logo Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {logos.map((logo) => (
            <article
              key={logo.file}
              className="group bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col hover:shadow-md hover:border-primary/40 transition-all"
            >
              <div
                className={`relative w-full flex items-center justify-center ${previewBg} p-6 transition-colors`}
              >
                <Image
                  src={logo.file}
                  alt={logo.name}
                  width={320}
                  height={185}
                  className="w-full max-w-64 h-auto"
                  unoptimized
                />
                <span className="absolute top-2 right-2 text-[10px] font-mono bg-white/90 text-stone-600 px-1.5 py-0.5 rounded">
                  {logo.file.split("/").pop()}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-primary font-semibold text-base">
                      {logo.name}
                    </h2>
                    <div className="flex gap-1">
                      {logo.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] bg-teal-50 text-primary px-1.5 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
                    {logo.desc}
                  </p>
                </div>

                <div className="mt-auto flex gap-2 pt-2">
                  <a
                    href={logo.file}
                    download
                    className="flex-1 text-center text-xs font-medium text-white bg-primary hover:bg-primary/90 transition-colors px-3 py-2 rounded-lg"
                  >
                    Download SVG
                  </a>
                  <button
                    type="button"
                    onClick={() => copyPath(logo.file)}
                    className="text-xs font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-colors px-3 py-2 rounded-lg"
                    title="Copy file path"
                  >
                    {copied === logo.file ? "Copied!" : "Copy path"}
                  </button>
                  <a
                    href={logo.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-stone-600 border border-stone-300 hover:border-primary hover:text-primary transition-colors px-3 py-2 rounded-lg"
                    title="Open SVG in new tab"
                  >
                    Open
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Horizontal logo */}
        <div className="mt-10">
          <div className="flex items-baseline justify-between mb-3 px-1">
            <h3 className="text-primary font-semibold text-sm uppercase tracking-wider">
              Horizontal Layout
            </h3>
            <span className="text-xs text-stone-500">For Navbar / header use</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div
              className={`w-full flex items-center justify-center ${previewBg} p-8 transition-colors`}
            >
              <Image
                src="/logos/logo-horizontal.svg"
                alt="Horizontal Logo"
                width={460}
                height={100}
                className="w-full max-w-md h-auto"
                unoptimized
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <p className="text-stone-500 text-sm">
                Icon + text side by side — ready for header use.
              </p>
              <div className="flex gap-2">
                <a
                  href="/logos/logo-horizontal.svg"
                  download
                  className="text-xs font-medium text-white bg-primary hover:bg-primary/90 transition-colors px-3 py-2 rounded-lg"
                >
                  Download SVG
                </a>
                <button
                  type="button"
                  onClick={() => copyPath("/logos/logo-horizontal.svg")}
                  className="text-xs font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-colors px-3 py-2 rounded-lg"
                >
                  {copied === "/logos/logo-horizontal.svg" ? "Copied!" : "Copy path"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-stone-400 text-xs">
          All logos use brand colour{" "}
          <code className="bg-teal-50 px-1 py-0.5 rounded text-primary">#0f766e</code>.
          Files live in{" "}
          <code className="bg-teal-50 px-1 py-0.5 rounded text-primary">public/logos/</code>.
        </p>
      </section>
    </main>
  );
}
