import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karwar Eye Hospital",
  description: "World-class eye care in Karwar, Karnataka. Cataract, LASIK, Glaucoma, Retina treatments.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Karwar Eye Hospital",
    description: "World-class eye care in Karwar, Karnataka.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-[#fefdf8] text-[#1c1917] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
