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
  metadataBase: new URL('https://karwareyehospital.in'),
  title: {
    default: "Karwar Eye Hospital | Best Eye Care in Karwar, Karnataka",
    template: "%s | Karwar Eye Hospital"
  },
  description: "World-class eye care in Karwar, Karnataka. Expert ophthalmologists specializing in Cataract Surgery, LASIK, Glaucoma Treatment, Retina Care, and Pediatric Ophthalmology. Advanced technology, compassionate care.",
  keywords: ["eye hospital karwar", "ophthalmologist karwar", "cataract surgery karwar", "lasik karwar", "eye clinic karwar", "retina specialist karwar", "glaucoma treatment", "eye care karnataka"],
  authors: [{ name: "Karwar Eye Hospital" }],
  creator: "Karwar Eye Hospital",
  publisher: "Karwar Eye Hospital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Karwar Eye Hospital | Best Eye Care in Karwar, Karnataka",
    description: "World-class eye care in Karwar. Expert ophthalmologists, advanced technology, compassionate care. Specializing in Cataract, LASIK, Glaucoma & Retina treatments.",
    type: "website",
    locale: "en_IN",
    alternateLocale: ["kn_IN"],
    siteName: "Karwar Eye Hospital",
    url: "https://karwareyehospital.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karwar Eye Hospital | Best Eye Care in Karwar, Karnataka",
    description: "World-class eye care in Karwar. Expert ophthalmologists specializing in Cataract, LASIK, Glaucoma & Retina treatments.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification code when available
    // google: 'your-verification-code',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": "https://karwareyehospital.in",
    "name": "Karwar Eye Hospital",
    "alternateName": "Karwar Eye Clinic",
    "url": "https://karwareyehospital.in",
    "logo": "https://karwareyehospital.in/logos/logo-wave-light.svg",
    "image": "https://karwareyehospital.in/logos/logo-wave-light.svg",
    "description": "World-class eye care hospital in Karwar, Karnataka specializing in Cataract Surgery, LASIK, Glaucoma Treatment, and Retina Care.",
    "telephone": "+919019725332",
    "email": "karwareyeclinic52@gmail.com",
    "medicalSpecialty": [
      "Ophthalmology",
      "Cataract Surgery",
      "LASIK Surgery",
      "Glaucoma Treatment",
      "Retina Care",
      "Pediatric Ophthalmology"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gurumath road, Kajubag",
      "addressLocality": "Karwar",
      "addressRegion": "Karnataka",
      "postalCode": "581301",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "14.8013",
      "longitude": "74.1292"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/karwareyehospital",
      "https://www.facebook.com/people/Karwar-Eye-Hospital/61590300401636/"
    ],
    "priceRange": "₹₹",
    "areaServed": {
      "@type": "City",
      "name": "Karwar",
      "containedIn": {
        "@type": "State",
        "name": "Karnataka"
      }
    }
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${poppins.variable} scroll-smooth overflow-x-hidden`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-[#fefdf8] text-[#1c1917] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
