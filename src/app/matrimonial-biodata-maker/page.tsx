import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Users, CheckCircle2, Download, Star, ArrowRight, Heart, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Matrimonial Biodata Maker — Free Online | BioDataEarth",
  description:
    "Create a beautiful matrimonial biodata online in minutes. Choose from 7+ stunning templates, add your photo, and download as PDF for free. No signup required.",
  keywords: [
    "matrimonial biodata maker",
    "marriage biodata maker",
    "shaadi biodata maker",
    "biodata for marriage",
    "online matrimonial biodata",
    "free biodata maker",
    "biodata PDF download",
  ],
  alternates: {
    canonical: "https://biodataearth.com/matrimonial-biodata-maker",
  },
  openGraph: {
    title: "Matrimonial Biodata Maker — Free Online | BioDataEarth",
    description:
      "Create a beautiful matrimonial biodata online in minutes. Choose from 7+ stunning templates and download as PDF for free.",
    url: "https://biodataearth.com/matrimonial-biodata-maker",
  },
};

const templates = [
  { name: "Maroon Gold", slug: "maroon-gold", color: "from-red-900 to-yellow-600", emoji: "🏵️" },
  { name: "Royal Purple", slug: "royal", color: "from-purple-500 to-indigo-600", emoji: "👑" },
  { name: "Crimson Gold", slug: "crimson-gold", color: "from-red-600 to-yellow-500", emoji: "✨" },
  { name: "Traditional Rich", slug: "classic", color: "from-orange-500 to-rose-500", emoji: "🌺" },
  { name: "Modern Floral", slug: "modern", color: "from-pink-500 to-rose-400", emoji: "🌸" },
  { name: "Minimal Gold", slug: "minimal", color: "from-amber-500 to-yellow-400", emoji: "⭐" },
  { name: "Elegant Emerald", slug: "elegant", color: "from-emerald-600 to-teal-500", emoji: "💎" },
  { name: "Sikh Floral Accent", slug: "sikh-floral", color: "from-orange-600 to-amber-500", emoji: "🙏" },
];

const steps = [
  { step: "1", title: "Choose a Template", desc: "Pick from 8 beautiful matrimonial biodata templates." },
  { step: "2", title: "Fill Your Details", desc: "Add your personal info, family background, and partner preferences." },
  { step: "3", title: "Add Your Photo", desc: "Upload a photo to personalize your biodata." },
  { step: "4", title: "Download as PDF", desc: "Preview and download your matrimonial biodata instantly." },
];

const features = [
  { icon: <Zap className="w-6 h-6 text-rose-500" />, title: "Ready in 5 Minutes", desc: "Fill the form and your biodata is ready. No design skills needed." },
  { icon: <Shield className="w-6 h-6 text-rose-500" />, title: "100% Private", desc: "Your personal data is never shared or sold. Complete privacy guaranteed." },
  { icon: <Download className="w-6 h-6 text-rose-500" />, title: "Instant PDF Download", desc: "Download your biodata as a high-quality PDF with a single click." },
  { icon: <Star className="w-6 h-6 text-rose-500" />, title: "Premium Templates", desc: "7+ professionally designed templates for every culture and preference." },
  { icon: <Heart className="w-6 h-6 text-rose-500" />, title: "Made for India", desc: "Designed specifically for Indian matrimonial requirements and traditions." },
  { icon: <CheckCircle2 className="w-6 h-6 text-rose-500" />, title: "Completely Free", desc: "Create and download your matrimonial biodata at absolutely no cost." },
];

export default function MatrimonialBiodataMakerPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-20">

        {/* Hero */}
        <section className="relative px-4 py-20 md:py-28 bg-gradient-to-br from-rose-50 via-orange-50 to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-300/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" /> Free Matrimonial Biodata Maker
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Matrimonial Biodata Maker —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                Free & Instant
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Create a beautiful matrimonial biodata online in under 5 minutes. Choose from
              7+ stunning templates, add your photo and family details, then download your
              biodata as a PDF — completely free, no account needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-lg shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-105 transition-all duration-200"
              >
                <Users className="w-5 h-5" />
                Create Matrimonial Biodata Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">✓ No signup &nbsp;·&nbsp; ✓ Instant PDF &nbsp;·&nbsp; ✓ 7+ Templates</p>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                7 Matrimonial Biodata Templates
              </h2>
              <p className="text-slate-500 text-lg">
                Choose a design that matches your style and tradition.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {templates.map((tmpl) => (
                <Link
                  key={tmpl.slug}
                  href={`/create?template=${tmpl.slug}`}
                  className="group relative rounded-2xl border border-slate-200 overflow-hidden hover:border-rose-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className={`h-32 bg-gradient-to-br ${tmpl.color} flex items-center justify-center text-4xl`}>
                    {tmpl.emoji}
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-rose-600 transition-colors">{tmpl.name}</p>
                    <p className="text-xs text-rose-500 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Use Template →</p>
                  </div>
                </Link>
              ))}
              <Link
                href="/create"
                className="group relative rounded-2xl border-2 border-dashed border-rose-200 overflow-hidden hover:border-rose-400 hover:-translate-y-1 transition-all duration-300 bg-rose-50/50 flex flex-col items-center justify-center p-4 text-center"
              >
                <span className="text-3xl mb-2">+</span>
                <p className="text-sm font-semibold text-rose-500">Browse All</p>
              </Link>
            </div>
            <div className="text-center mt-8">
              <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors">
                Start Creating Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                How to Make a Matrimonial Biodata
              </h2>
              <p className="text-slate-500 text-lg">4 simple steps — done in under 5 minutes</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-md shadow-rose-200">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Why Choose BioDataEarth?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-100 hover:border-rose-200 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content / SEO Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
              What is a Matrimonial Biodata?
            </h2>
            <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
              <p>
                A <strong>matrimonial biodata</strong> is a formal document used in India and South Asia to introduce a person for marriage purposes. Unlike a resume, a matrimonial biodata includes personal information, family background, horoscope details, physical attributes, and partner preferences.
              </p>
              <p>
                Matrimonial biodatas are commonly shared through family networks, marriage bureaus, and matrimonial websites like Shaadi.com, Jeevansathi, and BharatMatrimony. A well-formatted biodata creates a strong first impression and significantly improves your chances of finding the right match.
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">What Should a Matrimonial Biodata Include?</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li><strong>Personal Details:</strong> Full name, date of birth, height, complexion, religion, caste, and mother tongue.</li>
                <li><strong>Education & Career:</strong> Highest qualification, college/university, current job title, company, and income.</li>
                <li><strong>Family Background:</strong> Father&apos;s name and occupation, mother&apos;s name, siblings, and family values.</li>
                <li><strong>Horoscope / Kundali:</strong> Rashi, Nakshatra, Manglik status (optional).</li>
                <li><strong>Partner Preferences:</strong> Preferred age range, education, location, and other expectations.</li>
                <li><strong>Contact Information:</strong> Phone number or email for the family to reach out.</li>
              </ul>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Why Use BioDataEarth for Your Matrimonial Biodata?</h3>
              <p>
                BioDataEarth offers a simple, fast, and completely free online matrimonial biodata maker. You don&apos;t need any design skills or software. Just fill in your details, pick a template, and download your PDF biodata in minutes. Our templates are designed specifically for Indian matrimonial traditions and look great when shared digitally or printed.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-rose-500 to-orange-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Create Your Matrimonial Biodata Now
            </h2>
            <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
              Free, beautiful, and ready in minutes. No account needed.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-rose-600 font-bold text-lg hover:bg-rose-50 transition-colors shadow-xl"
            >
              <Heart className="w-5 h-5" />
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
