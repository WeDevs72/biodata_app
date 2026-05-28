import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Business Profile Biodata",
  description:
    "Create a polished business profile with services, achievements, and contact details. Perfect for SMEs, freelancers, and entrepreneurs. Download as PDF instantly.",
  alternates: {
    canonical: "https://biodataearth.com/create/business",
  },
  openGraph: {
    title: "Create Business Profile Biodata — BioDataEarth",
    description:
      "Create a polished business profile with services, achievements, and contact details. Instant PDF download.",
    url: "https://biodataearth.com/create/business",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Business Profile Biodata — BioDataEarth",
    description:
      "Create a professional business profile biodata instantly. Choose from 5+ templates and download as PDF.",
  },
};

export default function BusinessCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
