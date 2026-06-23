import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is BioDataEarth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BioDataEarth is a free online biodata maker that helps you create professional biodatas for matrimonial, job/resume, and business purposes. You can fill in your details, choose from beautiful templates, and download your biodata as a PDF instantly — no account needed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make a matrimonial biodata online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply click on Matrimonial on the homepage, choose a template you like, fill in your personal, family, and partner preference details, add a photo, and download your biodata as a PDF — all in under 5 minutes!",
      },
    },
    {
      "@type": "Question",
      name: "Is BioDataEarth completely free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Creating and downloading biodatas on BioDataEarth is completely free. We offer premium templates with a one-time payment for those who want exclusive designs.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download my biodata as a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Once you fill in your details and choose a template, you can preview your biodata in real-time and download it as a high-quality PDF with a single click.",
      },
    },
    {
      "@type": "Question",
      name: "What types of biodatas can I create?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BioDataEarth supports three categories: (1) Matrimonial biodata for marriage purposes, (2) Job / Resume biodata for job applications, and (3) Business Profile biodata for showcasing your business.",
      },
    },
    {
      "@type": "Question",
      name: "Is my personal data safe on BioDataEarth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your data is processed securely. We do not sell or share your personal information. You can request deletion of your data anytime by emailing us at biodataearth@gmail.com.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use BioDataEarth in Hindi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can type your details in Hindi while filling the form and the biodata PDF will be generated with your Hindi content.",
      },
    },
    {
      "@type": "Question",
      name: "How is a biodata different from a resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A resume focuses on your professional skills, experience, and education for job applications. A biodata is more personal — commonly used in India for matrimonial purposes, it includes personal details, family background, horoscope info, and partner preferences.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
