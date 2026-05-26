import Image from "next/image";

const logos = [
  {
    file: "/logos/logo-wave.svg",
    name: "Coastal Wave Eye",
    desc: "Eye iris with rolling ocean wave — Karwar coastal identity.",
  },
  {
    file: "/logos/logo-lighthouse.svg",
    name: "Lighthouse Eye",
    desc: "Karwar lighthouse with light rays and starry night sea.",
  },
  {
    file: "/logos/logo-lotus.svg",
    name: "Lotus Eye",
    desc: "8-petal lotus mandala — Indian heritage & healing.",
  },
  {
    file: "/logos/logo-sunrise.svg",
    name: "Sunrise Eye",
    desc: "Coastal sunrise with fishing boat — hope & new vision.",
  },
];

export default function SampleLogosPage() {
  return (
    <main className="min-h-screen bg-primary-light">
      {/* Header */}
      <section className="bg-primary text-white py-12 text-center">
        <p className="text-teal-200 text-xs tracking-widest uppercase mb-2">Internal Design Reference</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Sample Logos</h1>
        <p className="mt-3 text-teal-100 text-sm max-w-md mx-auto">
          Five creative SVG logo concepts for Karwar Eye Hospital. Choose one to use as the primary mark.
        </p>
      </section>

      {/* Logo Grid (4 icon logos) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {logos.map((logo) => (
            <div
              key={logo.file}
              className="bg-white rounded-2xl shadow-sm border border-teal-100 p-8 flex flex-col items-center gap-5 hover:shadow-md transition-shadow"
            >
              <div className="w-full flex items-center justify-center bg-primary-light rounded-xl p-6">
                <Image
                  src={logo.file}
                  alt={logo.name}
                  width={320}
                  height={185}
                  className="w-full max-w-70 h-auto"
                  unoptimized
                />
              </div>
              <div className="text-center">
                <h2 className="text-primary font-semibold text-base">{logo.name}</h2>
                <p className="text-stone-500 text-sm mt-1">{logo.desc}</p>
              </div>
              <a
                href={logo.file}
                download
                className="text-xs text-primary border border-primary hover:bg-primary hover:text-white transition-colors px-4 py-1.5 rounded-full"
              >
                Download SVG
              </a>
            </div>
          ))}
        </div>

        {/* Horizontal logo (full width) */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-teal-100 p-8 flex flex-col items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-full flex items-center justify-center bg-primary-light rounded-xl p-6">
            <Image
              src="/logos/logo-horizontal.svg"
              alt="Horizontal Logo"
              width={460}
              height={100}
              className="w-full max-w-105 h-auto"
              unoptimized
            />
          </div>
          <div className="text-center">
            <h2 className="text-primary font-semibold text-base">Horizontal Layout</h2>
            <p className="text-stone-500 text-sm mt-1">Icon + text side by side — ready for Navbar / header use.</p>
          </div>
          <a
            href="/logos/logo-horizontal.svg"
            download
            className="text-xs text-primary border border-primary hover:bg-primary hover:text-white transition-colors px-4 py-1.5 rounded-full"
          >
            Download SVG
          </a>
        </div>

        {/* Note -->*/}
        <p className="mt-10 text-center text-stone-400 text-xs">
          All logos use brand colour <code className="bg-teal-50 px-1 py-0.5 rounded text-primary">#0f766e</code>.
          Files are in <code className="bg-teal-50 px-1 py-0.5 rounded text-primary">public/logos/</code>.
        </p>
      </section>
    </main>
  );
}
