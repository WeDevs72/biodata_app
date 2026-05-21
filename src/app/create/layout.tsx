import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Matrimonial Biodata",
  description:
    "Create a beautiful matrimonial biodata with personal details, family background, and partner preferences. Choose from 5+ stunning templates and download as PDF instantly — free.",
  alternates: {
    canonical: "https://biodataearth.com/create",
  },
  openGraph: {
    title: "Create Matrimonial Biodata — BioDataEarth",
    description:
      "Create a beautiful matrimonial biodata with personal details, family background, and partner preferences. Instant PDF download.",
    url: "https://biodataearth.com/create",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Matrimonial Biodata — BioDataEarth",
    description:
      "Create a beautiful matrimonial biodata instantly. Choose from 5+ templates and download as PDF free.",
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
