import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, Download, Star, Shield, Zap, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Marriage Biodata Format — Free Download PDF | BioDataEarth",
  description:
    "Download the best marriage biodata format in PDF. Beautiful ready-made formats for Hindu, Muslim, Sikh, and Christian matrimonial biodatas. Free and instant.",
  keywords: [
    "marriage biodata format",
    "biodata format for marriage",
    "shaadi biodata format",
    "marriage biodata format PDF",
    "Hindu biodata format",
    "biodata format download",
    "matrimonial biodata format",
    "simple biodata format",
  ],
  alternates: {
    canonical: "https://biodataearth.com/marriage-biodata-format",
  },
  openGraph: {
    title: "Marriage Biodata Format — Free Download PDF | BioDataEarth",
    description:
      "Download the best marriage biodata format in PDF. Free and instant with beautiful templates.",
    url: "https://biodataearth.com/marriage-biodata-format",
  },
};

const formats = [
  { name: "Hindu Traditional", slug: "classic", color: "from-orange-500 to-red-500", emoji: "🔱", desc: "Classic format with auspicious design and family details" },
  { name: "Modern Minimal", slug: "minimal", color: "from-amber-400 to-yellow-500", emoji: "⭐", desc: "Clean and modern format preferred by urban families" },
  { name: "Sikh Format", slug: "sikh-floral", color: "from-orange-600 to-amber-500", emoji: "🙏", desc: "Traditional Sikh matrimonial format with floral accents" },
  { name: "Royal Elegant", slug: "royal", color: "from-purple-600 to-indigo-600", emoji: "👑", desc: "Premium royal design for special matrimonial biodata" },
  { name: "Crimson Gold", slug: "crimson-gold", color: "from-red-700 to-yellow-600", emoji: "✨", desc: "Rich Crimson and Gold — perfect for traditional families" },
  { name: "Modern Floral", slug: "modern", color: "from-pink-500 to-rose-400", emoji: "🌸", desc: "Contemporary floral design for modern brides and grooms" },
];

const sections = [
  { title: "Personal Details", items: ["Full Name", "Date of Birth", "Height & Weight", "Complexion", "Blood Group", "Religion & Caste"] },
  { title: "Education & Career", items: ["Highest Qualification", "College/University", "Job Title", "Company Name", "Annual Income"] },
  { title: "Family Details", items: ["Father's Name & Occupation", "Mother's Name", "Siblings Info", "Family Type", "Native Place"] },
  { title: "Partner Preferences", items: ["Preferred Age Range", "Preferred Education", "Preferred Location", "Any Other Expectations"] },
];

export default function MarriageBiodataFormatPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-20">

        {/* Hero */}
        <section className="relative px-4 py-20 md:py-28 bg-gradient-to-br from-amber-50 via-orange-50 to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              <FileText className="w-4 h-4" /> Free Marriage Biodata Format
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Marriage Biodata Format —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                Free PDF Download
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Choose from 6+ professionally designed marriage biodata formats. Fill in your details
              online and download your biodata as a beautiful PDF — completely free, no signup needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-lg shadow-lg shadow-orange-200 hover:scale-105 transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                Download My Biodata Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">✓ No account &nbsp;·&nbsp; ✓ Instant PDF &nbsp;·&nbsp; ✓ 6+ Formats</p>
          </div>
        </section>

        {/* Format Gallery */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                6 Marriage Biodata Formats
              </h2>
              <p className="text-slate-500 text-lg">
                Traditional and modern formats for every community.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {formats.map((fmt) => (
                <Link
                  key={fmt.slug}
                  href={`/create?template=${fmt.slug}`}
                  className="group rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className={`h-32 bg-gradient-to-br ${fmt.color} flex items-center justify-center text-5xl`}>
                    {fmt.emoji}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-1">{fmt.name}</h3>
                    <p className="text-sm text-slate-500">{fmt.desc}</p>
                    <span className="inline-block mt-3 text-xs font-semibold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">Use this format →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What to Include */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                What to Include in a Marriage Biodata
              </h2>
              <p className="text-slate-500 text-lg">A complete marriage biodata covers these four areas.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {sections.map((sec, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center">{i + 1}</span>
                    {sec.title}
                  </h3>
                  <ul className="space-y-2">
                    {sec.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
              How to Write a Marriage Biodata
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                A good <strong>marriage biodata format</strong> is clear, well-organized, and visually appealing. In India, biodatas are shared with prospective families before the first meeting, making it your most important first impression.
              </p>
              <p>
                With BioDataEarth, you don&apos;t need to worry about formatting. Simply fill in your details, choose a biodata format, and we generate a perfectly formatted PDF automatically. All our marriage biodata formats are designed by professionals and look great both digitally and in print.
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Tips for a Perfect Marriage Biodata</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Use a <strong>recent, clear photograph</strong> — it creates the most important first impression.</li>
                <li>Keep the language <strong>simple and honest</strong>. Avoid exaggerating details.</li>
                <li>Include your <strong>correct contact number</strong> or a family member&apos;s number.</li>
                <li>Mention your <strong>partner preferences clearly</strong> but politely.</li>
                <li>Proofread the biodata carefully before sharing.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-orange-500 to-rose-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Create Your Marriage Biodata — Free
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Ready-made formats. Instant PDF. No account required.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-orange-600 font-bold text-lg hover:bg-orange-50 transition-colors shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download Format Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
