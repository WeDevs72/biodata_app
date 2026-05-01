"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Layers, ChevronLeft, ChevronRight, Users, Briefcase, Building2, FileText } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Matrimonial templates
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { RoyalTemplate } from "@/components/templates/RoyalTemplate";

// Job / Resume templates
import { JobProfessionalTemplate } from "@/components/templates/job/JobProfessionalTemplate";
import { JobModernTemplate } from "@/components/templates/job/JobModernTemplate";

// Business templates
import { BusinessClassicTemplate } from "@/components/templates/business/BusinessClassicTemplate";
import { BusinessModernTemplate } from "@/components/templates/business/BusinessModernTemplate";

// ── Demo data for template previews ─────────────────────────────────────────

const matrimonialData = {
  fullName: "Priya Sharma",
  dob: "22 March 1995",
  height: "5 Feet 4 Inches",
  religion: "Hindu",
  caste: "Brahmin",
  location: "Jaipur, Rajasthan",
  education: "MBA (Finance)",
  occupation: "Financial Analyst",
  income: "15 LPA",
  fatherName: "Mr. Rakesh Sharma",
  motherName: "Mrs. Rekha Sharma",
  siblings: "None",
  preferredAge: "27-31 Years",
  preferredLocation: "Jaipur, Delhi, NCR",
  preferredEducation: "Well-established",
  photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
};

const jobData = {
  fullName: "Rahul Verma",
  jobTitle: "Senior Software Engineer",
  phone: "+91 98765 43210",
  email: "rahul@example.com",
  location: "Bangalore, India",
  linkedIn: "linkedin.com/in/rahul",
  professionalSummary:
    "7+ years building scalable web applications. Passionate about clean code and great user experiences.",
  skills: "React, Node.js, TypeScript, Python, AWS",
  languages: "English, Hindi",
  experience: [
    { id: "1", company: "Google India", role: "Senior SWE", duration: "2021 – Present", description: "Led frontend infrastructure for Google Pay." },
    { id: "2", company: "Infosys", role: "Software Engineer", duration: "2017 – 2021", description: "Built microservices for BFSI clients." },
  ],
  education: [
    { id: "1", degree: "B.Tech Computer Science", institute: "IIT Bombay", year: "2017" },
  ],
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
};

const businessData = {
  ownerName: "Vikram Patel",
  businessName: "Patel Enterprises",
  tagline: "Building Trust, One Deal at a Time",
  phone: "+91 98765 43210",
  email: "info@patelenterprises.com",
  website: "patelenterprises.com",
  location: "Ahmedabad, Gujarat",
  industry: "Steel & Manufacturing",
  established: "2005",
  employees: "200+",
  annualTurnover: "50 Crore",
  offerings: [
    { id: "1", name: "Steel Fabrication", description: "Custom structural steel solutions" },
    { id: "2", name: "Industrial Supplies", description: "Raw material sourcing & distribution" },
    { id: "3", name: "Consulting", description: "Project management & advisory" },
  ],
  achievements: [
    { id: "1", text: "Best MSME Award 2022 by CII Gujarat" },
    { id: "2", text: "ISO 9001:2015 Certified Manufacturing Unit" },
  ],
  photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=600&fit=crop",
};

// ── Template tabs config ────────────────────────────────────────────────────

const TAB_CATEGORIES = [
  {
    id: "matrimonial",
    label: "Matrimonial",
    icon: <Users className="w-4 h-4" />,
    accent: "from-red-500 to-pink-500",
    createHref: "/create",
    templates: [
      { name: "Traditional Rich", Component: ClassicTemplate, data: matrimonialData },
      { name: "Modern Floral", Component: ModernTemplate, data: matrimonialData },
      { name: "Minimal Gold", Component: MinimalTemplate, data: matrimonialData },
      { name: "Elegant Emerald", Component: ElegantTemplate, data: matrimonialData },
      { name: "Royal Purple", Component: RoyalTemplate, data: matrimonialData },
    ],
  },
  {
    id: "job",
    label: "Job / Resume",
    icon: <Briefcase className="w-4 h-4" />,
    accent: "from-indigo-500 to-violet-600",
    createHref: "/create/job",
    templates: [
      { name: "Professional", Component: JobProfessionalTemplate, data: jobData },
      { name: "Modern", Component: JobModernTemplate, data: jobData },
    ],
  },
  {
    id: "business",
    label: "Business Profile",
    icon: <Building2 className="w-4 h-4" />,
    accent: "from-amber-500 to-orange-500",
    createHref: "/create/business",
    templates: [
      { name: "Classic Gold", Component: BusinessClassicTemplate, data: businessData },
      { name: "Modern Teal", Component: BusinessModernTemplate, data: businessData },
    ],
  },
];

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("matrimonial");

  const activeCat = TAB_CATEGORIES.find((c) => c.id === activeTab)!;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const amt = window.innerWidth < 768 ? clientWidth : clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: direction === "left" ? -amt : amt, behavior: "smooth" });
    }
  };

  const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };
  const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  const features = [
    { icon: <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-4" />, title: "Fast & Easy", description: "Fill a simple form and generate a stunning biodata instantly. No design skills required." },
    { icon: <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />, title: "Secure & Private", description: "Your data remains local and secure. We respect your privacy out of the box." },
    { icon: <Layers className="w-8 h-8 text-emerald-500 mb-4" />, title: "Multiple Categories", description: "Matrimonial, Job/Resume, or Business Profile — we have a template for every need." },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col notranslate">

        {/* ── Hero Section ────────────────────────────────────────────────── */}
        <section className="relative px-4 pt-28 pb-36 md:pt-40 md:pb-52 text-center flex flex-col items-center justify-center overflow-hidden">
          {/* Gradient background — replaces the marriage photo */}
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          {/* Decorative glow blobs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-600/25 blur-3xl -z-10 pointer-events-none" />
          <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl -z-10 pointer-events-none" />

          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-4xl space-y-8">
            {/* Category pill row */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-3 justify-center">
              {[
                { label: "Matrimonial", href: "/create", cls: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
                { label: "Job / Resume", href: "/create/job", cls: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
                { label: "Business Profile", href: "/create/business", cls: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
              ].map((cat) => (
                <Link key={cat.label} href={cat.href} className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${cat.cls} hover:brightness-125 transition-all`}>
                  <FileText className="w-3.5 h-3.5" />
                  {cat.label}
                </Link>
              ))}
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
              Create Any Biodata in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-violet-400 to-amber-400">
                Minutes
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Beautiful templates for every purpose — Marriage, Job Resume, or Business Profile. Fast, free, and completely private.
            </motion.p>

            {/* Stats row */}
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-10 pt-2">
              {[{ value: "3+", label: "Categories" }, { value: "9+", label: "Templates" }, { value: "100%", label: "Free & Private" }].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 justify-center pt-2">
              <Link href="/create" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:opacity-90">
                💍 Matrimonial Biodata
              </Link>
              <Link href="/create/job" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:opacity-90">
                💼 Job Resume
              </Link>
              <Link href="/create/business" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:opacity-90">
                🏢 Business Profile
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Category Picker ──────────────────────────────────────────────── */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">What are you creating today?</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 text-lg">Choose your biodata category to get started with the right template.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Matrimonial */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0, duration: 0.5 }}
                className="group relative rounded-2xl border-2 border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-800 p-8 flex flex-col items-center text-center overflow-hidden hover:border-rose-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-5 shadow-lg mx-auto"><Users className="w-8 h-8 text-white" /></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Matrimonial</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Create a beautiful marriage biodata with personal, family, and partner preference sections.</p>
                  <Link href="/create" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">Create Matrimonial →</Link>
                </div>
              </motion.div>
              {/* Job / Resume */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
                className="group relative rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-800 p-8 flex flex-col items-center text-center overflow-hidden hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5 shadow-lg mx-auto"><Briefcase className="w-8 h-8 text-white" /></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Job / Resume</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Build a professional resume with experience, skills, and education for job platforms.</p>
                  <Link href="/create/job" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">Create Resume →</Link>
                </div>
              </motion.div>
              {/* Business Profile */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
                className="group relative rounded-2xl border-2 border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800 p-8 flex flex-col items-center text-center overflow-hidden hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-5 shadow-lg mx-auto"><Building2 className="w-8 h-8 text-white" /></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Business Profile</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Showcase your business with services, achievements, and contact details in a polished profile.</p>
                  <Link href="/create/business" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">Create Business Profile →</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Tabbed Templates Section ─────────────────────────────────────── */}
        <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Stunning Templates</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Browse templates across all categories.</p>
            </div>

            {/* Tab switcher */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-full p-1 gap-1">
                {TAB_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeTab === cat.id
                        ? `bg-gradient-to-r ${cat.accent} text-white shadow-md`
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Template carousel per tab */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                <div className="relative px-2 md:px-0">
                  <button onClick={() => scroll("left")} className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-20 p-3 bg-gradient-to-r ${activeCat.accent} text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95`}>
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-8 pt-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {activeCat.templates.map((tmpl, idx) => {
                      const Comp = tmpl.Component as React.ComponentType<{ data: typeof tmpl.data }>;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08, duration: 0.4 }}
                          className="mr-8 relative shrink-0 w-[340px] snap-center group rounded-xl h-[480px] overflow-hidden flex flex-col transition-transform hover:-translate-y-2 cursor-pointer"
                        >
                          <div className="w-full h-full relative pointer-events-none">
                            <div className="absolute top-2 left-1/2 -translate-x-1/2" style={{ transform: "scale(0.42)", transformOrigin: "top center" }}>
                              <div className="w-[794px] h-[1122px] shadow-2xl rounded-md overflow-hidden bg-white">
                                <Comp data={tmpl.data as any} />
                              </div>
                            </div>
                          </div>
                          {/* Template name badge */}
                          <div className="absolute bottom-0 left-0 right-0 py-3 px-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{tmpl.name}</p>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 dark:bg-black/60 backdrop-blur-sm z-20">
                            <Link href={activeCat.createHref} className={`px-6 py-3 bg-gradient-to-r ${activeCat.accent} text-white rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg`}>
                              Use Template
                            </Link>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <button onClick={() => scroll("right")} className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 z-20 p-3 bg-gradient-to-r ${activeCat.accent} text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95`}>
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />
          </div>
        </section>

        {/* ── Features Section ─────────────────────────────────────────────── */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {features.map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }} className="flex flex-col items-center">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl mb-2">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
