import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Briefcase, CheckCircle2, Download, Star, ArrowRight, Shield, Zap, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Job Resume Maker India — Free Online Resume Builder | BioDataEarth",
  description:
    "Create a professional job resume or biodata online for free. 5+ ATS-friendly templates, instant PDF download. Perfect for freshers and experienced professionals in India.",
  keywords: [
    "job resume maker india",
    "job biodata maker",
    "resume builder india free",
    "professional resume maker",
    "biodata for job",
    "job resume format india",
    "free resume builder",
    "fresher resume maker",
  ],
  alternates: {
    canonical: "https://biodataearth.com/job-resume-maker",
  },
  openGraph: {
    title: "Job Resume Maker India — Free Online Resume Builder | BioDataEarth",
    description:
      "Create a professional job resume or biodata online for free. 5+ templates, instant PDF download.",
    url: "https://biodataearth.com/job-resume-maker",
  },
};

const templates = [
  { name: "Traditional Bio-Data", slug: "traditional-biodata", color: "from-gray-800 to-black", emoji: "📜" },
  { name: "Software Developer", slug: "software-developer", color: "from-indigo-600 to-slate-900", emoji: "💻" },
  { name: "ATS Minimal", slug: "ats-minimal", color: "from-slate-800 to-black", emoji: "🎯" },
  { name: "Executive Premium", slug: "executive-premium", color: "from-slate-700 to-slate-900", emoji: "💼" },
  { name: "Elegant Saffron", slug: "elegant-saffron", color: "from-amber-500 to-orange-600", emoji: "✨" },
  { name: "Classic Professional", slug: "classic-professional", color: "from-blue-700 to-indigo-700", emoji: "🎓" },
  { name: "Modern Blue", slug: "modern", color: "from-indigo-500 to-violet-600", emoji: "🚀" },
  { name: "Professional Clean", slug: "professional", color: "from-teal-500 to-emerald-600", emoji: "⭐" },
];

const steps = [
  { step: "1", title: "Pick a Resume Template", desc: "Choose from 5 professional resume templates." },
  { step: "2", title: "Enter Your Details", desc: "Add your experience, skills, education, and contact info." },
  { step: "3", title: "Upload Your Photo", desc: "Add a professional photo to your resume (optional)." },
  { step: "4", title: "Download PDF Resume", desc: "Preview and download your resume as a PDF instantly." },
];

const features = [
  { icon: <Zap className="w-6 h-6 text-indigo-500" />, title: "Ready in 5 Minutes", desc: "Fast and easy form. Your resume is ready before you know it." },
  { icon: <Shield className="w-6 h-6 text-indigo-500" />, title: "Private & Secure", desc: "Your career data is never shared. Complete privacy guaranteed." },
  { icon: <Download className="w-6 h-6 text-indigo-500" />, title: "PDF Download", desc: "Download a high-quality, print-ready PDF resume instantly." },
  { icon: <Star className="w-6 h-6 text-indigo-500" />, title: "5+ Templates", desc: "Professionally designed templates for every industry." },
  { icon: <FileText className="w-6 h-6 text-indigo-500" />, title: "Freshers & Experienced", desc: "Templates designed for both fresh graduates and senior professionals." },
  { icon: <CheckCircle2 className="w-6 h-6 text-indigo-500" />, title: "100% Free", desc: "Build and download your job resume at absolutely no cost." },
];

export default function JobResumeMakerPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-20">

        {/* Hero */}
        <section className="relative px-4 py-20 md:py-28 bg-gradient-to-br from-indigo-50 via-violet-50 to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-300/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
              <Briefcase className="w-4 h-4" /> Free Job Resume Maker
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Job Resume Maker India —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">
                Free & Professional
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Build a professional job resume or biodata online in minutes. Perfect for freshers
              and experienced professionals. Choose from 5+ templates and download your resume as
              PDF — completely free, no account needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create/job"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 transition-all duration-200"
              >
                <Briefcase className="w-5 h-5" />
                Create Job Resume Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">✓ No signup &nbsp;·&nbsp; ✓ Instant PDF &nbsp;·&nbsp; ✓ 5+ Templates</p>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                5 Professional Resume Templates
              </h2>
              <p className="text-slate-500 text-lg">
                Designed for Indian job market — works for IT, banking, government, and more.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {templates.map((tmpl) => (
                <Link
                  key={tmpl.slug}
                  href={`/create/job?template=${tmpl.slug}`}
                  className="group relative rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className={`h-28 bg-gradient-to-br ${tmpl.color} flex items-center justify-center text-4xl`}>
                    {tmpl.emoji}
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{tmpl.name}</p>
                    <p className="text-xs text-indigo-500 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Use →</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/create/job" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                Create My Resume Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                How to Make a Job Resume Online
              </h2>
              <p className="text-slate-500 text-lg">4 easy steps to your professional resume</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-md shadow-indigo-200">
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
                Why Use BioDataEarth Resume Builder?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
              What is a Job Biodata / Resume?
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                In India, a <strong>job biodata</strong> or <strong>job resume</strong> is a document that presents your professional qualifications, work experience, and skills to a potential employer. While the terms &quot;biodata&quot; and &quot;resume&quot; are often used interchangeably in India, a biodata typically also includes personal information like date of birth, nationality, and languages known.
              </p>
              <p>
                A well-formatted resume greatly increases your chances of getting shortlisted for an interview. BioDataEarth&apos;s resume builder helps you create a clean, professional, and visually appealing resume in minutes.
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">What Should a Job Resume Include?</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li><strong>Contact Information:</strong> Name, phone, email, location, LinkedIn.</li>
                <li><strong>Professional Summary:</strong> A 2-3 sentence overview of your career.</li>
                <li><strong>Work Experience:</strong> Company names, roles, duration, and key achievements.</li>
                <li><strong>Education:</strong> Degree, institution, and graduation year.</li>
                <li><strong>Skills:</strong> Technical and soft skills relevant to the job.</li>
                <li><strong>Languages:</strong> Languages you can speak or write.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-violet-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Build Your Job Resume Now — It&apos;s Free
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of job seekers who created their resume on BioDataEarth.
            </p>
            <Link
              href="/create/job"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-indigo-600 font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl"
            >
              <Briefcase className="w-5 h-5" />
              Create Resume Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
