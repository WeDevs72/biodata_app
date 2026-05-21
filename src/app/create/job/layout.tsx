import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Job Resume / Biodata",
  description:
    "Build a professional job resume or biodata with work experience, skills, and education. Choose from 5+ ATS-friendly templates and download as PDF instantly — free.",
  alternates: {
    canonical: "https://biodataearth.com/create/job",
  },
  openGraph: {
    title: "Create Job Resume / Biodata — BioDataEarth",
    description:
      "Build a professional job resume with work experience, skills, and education. Instant PDF download — free.",
    url: "https://biodataearth.com/create/job",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Job Resume / Biodata — BioDataEarth",
    description:
      "Build a professional job resume instantly. Choose from 5+ ATS-friendly templates and download as PDF free.",
  },
};

export default function JobCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
