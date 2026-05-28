import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://biodataearth.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BioDataEarth — Matrimonial, Job Resume & Business Biodata Maker",
    template: "%s | BioDataEarth",
  },
  description:
    "Create beautiful biodatas online. Choose from matrimonial, job resume, or business profile templates. Instant PDF download. No signup needed.",
  keywords: [
    "biodata maker",
    "matrimonial biodata",
    "Biodata maker India",
    "Resume builder India",
    "business profile creator",
    "biodata PDF download",
    "marriage biodata format",
    "job biodata",
    "biodata online",
    "shadi biodata",
    "विवाह बायोडाटा",
  ],
  authors: [{ name: "BioDataEarth", url: BASE_URL }],
  creator: "BioDataEarth",
  publisher: "BioDataEarth",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/app_icon.png",
    apple: "/app_icon.png",
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "BioDataEarth —  Matrimonial, Job Resume & Business Biodata Maker",
    description:
      "Create beautiful biodatas online. Choose from matrimonial, job resume, or business profile templates. Instant PDF download. No signup needed.",
    url: BASE_URL,
    siteName: "BioDataEarth",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BioDataEarth — Biodata Maker for Matrimonial, Job & Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BioDataEarth —  Matrimonial, Job Resume & Business Biodata Maker",
    description:
      "Create beautiful biodatas online. Instant PDF download. No signup needed.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: "_Vl-fFyqchbjzM0358q_gdWOSPUVBjxLbq1bcEvim9o",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://biodataearth.com/#website",
      name: "BioDataEarth",
      url: "https://biodataearth.com",
      description:
        "Biodata maker for matrimonial, job resume, and business profiles.",
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://biodataearth.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://biodataearth.com/#organization",
      name: "BioDataEarth",
      url: "https://biodataearth.com",
      logo: {
        "@type": "ImageObject",
        url: "https://biodataearth.com/app_icon.png",
        width: 512,
        height: 512,
      },
      description:
        "BioDataEarth is a online biodata maker for matrimonial, job resume, and business profiles. Create and download beautiful biodatas as PDF instantly.",
    },
    {
      "@type": "SoftwareApplication",
      name: "BioDataEarth Biodata Maker",
      url: "https://biodataearth.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
        {children}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </body>
    </html>
  );
}
