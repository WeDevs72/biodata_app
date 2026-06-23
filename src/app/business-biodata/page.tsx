import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Building2, ArrowRight, CheckCircle2, Download, Star, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Profile Maker — Free Online | BioDataEarth",
  description:
    "Create a professional business biodata or company profile online for free. Showcase your services, achievements, and contact details. Instant PDF download.",
  keywords: [
    "business profile maker",
    "business biodata maker",
    "company profile maker",
    "business biodata",
    "business profile creator",
    "professional business profile",
    "business profile PDF",
  ],
  alternates: {
    canonical: "https://biodataearth.com/business-biodata",
  },
  openGraph: {
    title: "Business Profile Maker — Free Online | BioDataEarth",
    description:
      "Create a professional business biodata or company profile online for free. Instant PDF download.",
    url: "https://biodataearth.com/business-biodata",
  },
};

const templates = [
  { name: "Royal Indian Business", slug: "royal-indian", color: "from-yellow-600 to-red-700", emoji: "🏛️" },
  { name: "Startup Bold", slug: "startup-bold", color: "from-violet-600 to-indigo-700", emoji: "🚀" },
  { name: "Minimal Elegant", slug: "minimal-elegant", color: "from-slate-600 to-slate-800", emoji: "✨" },
  { name: "Classic Gold", slug: "classic", color: "from-amber-500 to-yellow-600", emoji: "⭐" },
  { name: "Modern Teal", slug: "modern", color: "from-teal-500 to-emerald-600", emoji: "💼" },
];

const useCases = [
  { icon: "🏭", title: "Manufacturers & Exporters", desc: "Showcase your factory, products, and export capabilities professionally." },
  { icon: "🏪", title: "Shop & Retail Business", desc: "Create a business biodata for your shop to share with new customers and suppliers." },
  { icon: "💻", title: "Freelancers & Agencies", desc: "Present your services, portfolio, and client testimonials in a polished format." },
  { icon: "🏗️", title: "Contractors & Builders", desc: "Share your project experience, certifications, and contact details with clients." },
  { icon: "⚕️", title: "Doctors & Clinics", desc: "A professional clinic profile to share with patients and medical networks." },
  { icon: "🎓", title: "Educational Institutes", desc: "Create an institution profile showcasing courses, faculty, and achievements." },
];

export default function BusinessBiodataPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-20">

        {/* Hero */}
        <section className="relative px-4 py-20 md:py-28 bg-gradient-to-br from-amber-50 via-yellow-50 to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-6">
              <Building2 className="w-4 h-4" /> Free Business Profile Maker
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Business Profile Maker —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Free & Professional
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Create a stunning business biodata or company profile online in minutes. Add your
              services, achievements, and contact details. Download as a PDF to share with
              clients, partners, and investors — completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create/business"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-lg shadow-amber-200 hover:scale-105 transition-all duration-200"
              >
                <Building2 className="w-5 h-5" />
                Create Business Profile Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">✓ No signup &nbsp;·&nbsp; ✓ Instant PDF &nbsp;·&nbsp; ✓ 5+ Templates</p>
          </div>
        </section>

        {/* Templates */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                5 Business Profile Templates
              </h2>
              <p className="text-slate-500 text-lg">
                From traditional Indian businesses to modern startups.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {templates.map((tmpl) => (
                <Link
                  key={tmpl.slug}
                  href={`/create/business?template=${tmpl.slug}`}
                  className="group relative rounded-2xl border border-slate-200 overflow-hidden hover:border-amber-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className={`h-28 bg-gradient-to-br ${tmpl.color} flex items-center justify-center text-4xl`}>
                    {tmpl.emoji}
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">{tmpl.name}</p>
                    <p className="text-xs text-amber-500 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Use →</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/create/business" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors">
                Create Business Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Who Uses a Business Biodata?
              </h2>
              <p className="text-slate-500 text-lg">Perfect for every type of Indian business.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300">
                  <div className="text-4xl mb-4">{uc.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{uc.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
              What is a Business Biodata?
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                A <strong>business biodata</strong> or <strong>company profile</strong> is a one or two-page document that introduces your business to potential clients, partners, or investors. It is widely used in India by small and medium businesses, traders, manufacturers, and service providers.
              </p>
              <p>
                A well-designed business profile creates credibility and trust. It is commonly shared during B2B meetings, trade fairs, and tenders. BioDataEarth makes it easy to create a professional business biodata in minutes, with no design skills needed.
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">What Should a Business Profile Include?</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li><strong>Business Name & Logo:</strong> Your company name, tagline, and logo.</li>
                <li><strong>Owner Details:</strong> Name and designation of the business owner.</li>
                <li><strong>Products / Services:</strong> List of what you offer.</li>
                <li><strong>About the Business:</strong> Year established, industry, number of employees.</li>
                <li><strong>Achievements & Certifications:</strong> Awards, ISO certifications, key clients.</li>
                <li><strong>Contact Information:</strong> Phone, email, website, and address.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Create Your Business Profile Now — Free
            </h2>
            <p className="text-amber-100 text-lg mb-8 max-w-xl mx-auto">
              Professional, impressive, and ready to share in minutes.
            </p>
            <Link
              href="/create/business"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-amber-600 font-bold text-lg hover:bg-amber-50 transition-colors shadow-xl"
            >
              <Building2 className="w-5 h-5" />
              Start For Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
