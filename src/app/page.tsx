"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Layers, ChevronLeft, ChevronRight, Users, Briefcase, Building2, FileText, MousePointerClick, FileEdit, Download, Plus, Minus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Matrimonial templates
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { RoyalTemplate } from "@/components/templates/RoyalTemplate";
import { CrimsonGoldTemplate } from "@/components/templates/CrimsonGoldTemplate";
import { SikhFloralTemplate } from "@/components/templates/SikhFloralTemplate";
import { MaroonGoldTemplate } from "@/components/templates/MaroonGoldTemplate";

// Job / Resume templates
import { JobProfessionalTemplate } from "@/components/templates/job/JobProfessionalTemplate";
import { JobModernTemplate } from "@/components/templates/job/JobModernTemplate";
import { JobClassicProfessionalTemplate } from "@/components/templates/job/JobClassicProfessionalTemplate";
import { JobElegantSaffronTemplate } from "@/components/templates/job/JobElegantSaffronTemplate";
import { JobExecutivePremiumTemplate } from "@/components/templates/job/JobExecutivePremiumTemplate";

// Business templates
import { BusinessClassicTemplate } from "@/components/templates/business/BusinessClassicTemplate";
import { BusinessModernTemplate } from "@/components/templates/business/BusinessModernTemplate";
import { BusinessMinimalElegantTemplate } from "@/components/templates/business/BusinessMinimalElegantTemplate";
import { BusinessStartupBoldTemplate } from "@/components/templates/business/BusinessStartupBoldTemplate";
import { BusinessRoyalIndianTemplate } from "@/components/templates/business/BusinessRoyalIndianTemplate";

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
      { name: "Maroon Gold", slug: "maroon-gold", Component: MaroonGoldTemplate, data: matrimonialData },
      { name: "Sikh Floral Accent", slug: "sikh-floral", Component: SikhFloralTemplate, data: matrimonialData },
      { name: "Crimson Gold", slug: "crimson-gold", Component: CrimsonGoldTemplate, data: matrimonialData },
      { name: "Traditional Rich", slug: "classic", Component: ClassicTemplate, data: matrimonialData },
      { name: "Modern Floral", slug: "modern", Component: ModernTemplate, data: matrimonialData },
      { name: "Minimal Gold", slug: "minimal", Component: MinimalTemplate, data: matrimonialData },
      { name: "Elegant Emerald", slug: "elegant", Component: ElegantTemplate, data: matrimonialData },
      { name: "Royal Purple", slug: "royal", Component: RoyalTemplate, data: matrimonialData },
    ],
  },
  {
    id: "job",
    label: "Job / Resume",
    icon: <Briefcase className="w-4 h-4" />,
    accent: "from-indigo-500 to-violet-600",
    createHref: "/create/job",
    templates: [
      { name: "Executive Premium", slug: "executive-premium", Component: JobExecutivePremiumTemplate, data: jobData },
      { name: "Elegant Saffron", slug: "elegant-saffron", Component: JobElegantSaffronTemplate, data: jobData },
      { name: "Classic Professional", slug: "classic-professional", Component: JobClassicProfessionalTemplate, data: jobData },
      { name: "Professional", slug: "professional", Component: JobProfessionalTemplate, data: jobData },
      { name: "Modern", slug: "modern", Component: JobModernTemplate, data: jobData },
    ],
  },
  {
    id: "business",
    label: "Business Profile",
    icon: <Building2 className="w-4 h-4" />,
    accent: "from-amber-500 to-orange-500",
    createHref: "/create/business",
    templates: [
      { name: "Royal Indian Business", slug: "royal-indian", Component: BusinessRoyalIndianTemplate, data: businessData },
      { name: "Startup Bold", slug: "startup-bold", Component: BusinessStartupBoldTemplate, data: businessData },
      { name: "Minimal Elegant", slug: "minimal-elegant", Component: BusinessMinimalElegantTemplate, data: businessData },
      { name: "Classic Gold", slug: "classic", Component: BusinessClassicTemplate, data: businessData },
      { name: "Modern Teal", slug: "modern", Component: BusinessModernTemplate, data: businessData },
    ],
  },
];

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTabState] = useState("matrimonial");

  // Restore the last-viewed template tab when user navigates back
  useEffect(() => {
    const saved = sessionStorage.getItem("homeTemplateTab");
    if (saved && TAB_CATEGORIES.some((c) => c.id === saved)) {
      setActiveTabState(saved);
    }
  }, []);

  const setActiveTab = (tabId: string) => {
    setActiveTabState(tabId);
    sessionStorage.setItem("homeTemplateTab", tabId);
  };

  const handleScrollToTemplates = (categoryId: string) => {
    setActiveTab(categoryId);
    const element = document.getElementById("templates");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is BioDataEarth?",
      a: "BioDataEarth is a free online biodata maker that helps you create professional biodatas for matrimonial, job/resume, and business purposes. You can fill in your details, choose from beautiful templates, and download your biodata as a PDF instantly — no account needed.",
    },
    {
      q: "How do I make a matrimonial biodata online?",
      a: "Simply click on 'Matrimonial' on the homepage, choose a template you like, fill in your personal, family, and partner preference details, add a photo, and download your biodata as a PDF — all in under 5 minutes!",
    },
    {
      q: "Is BioDataEarth completely free to use?",
      a: "Yes! Creating and downloading biodatas on BioDataEarth is completely free. We offer premium templates with a one-time payment for those who want exclusive designs.",
    },
    {
      q: "Can I download my biodata as a PDF?",
      a: "Absolutely. Once you fill in your details and choose a template, you can preview your biodata in real-time and download it as a high-quality PDF with a single click.",
    },
    {
      q: "What types of biodatas can I create?",
      a: "BioDataEarth supports three categories: (1) Matrimonial biodata for marriage purposes, (2) Job / Resume biodata for job applications, and (3) Business Profile biodata for showcasing your business.",
    },
    {
      q: "Is my personal data safe on BioDataEarth?",
      a: "Yes. Your data is processed securely. We do not sell or share your personal information. You can request deletion of your data anytime by emailing us at biodataearth@gmail.com.",
    },
    {
      q: "Can I use BioDataEarth in Hindi?",
      a: "Yes! You can type your details in Hindi while filling the form and the biodata PDF will be generated with your Hindi content. We are also working on a full Hindi interface.",
    },
    {
      q: "How is a biodata different from a resume?",
      a: "A resume focuses on your professional skills, experience, and education for job applications. A biodata is more personal — commonly used in India for matrimonial purposes, it includes personal details, family background, horoscope info, and partner preferences.",
    },
  ];

  const features = [
    { icon: <CheckCircle2 className="w-8 h-8 text-rose-500 mb-4" />, title: "Fast & Easy", description: "Fill a simple form and generate a stunning biodata instantly. No design skills required." },
    { icon: <ShieldCheck className="w-8 h-8 text-rose-500 mb-4" />, title: "Secure & Private", description: "Your data remains local and secure. We respect your privacy out of the box." },
    { icon: <Layers className="w-8 h-8 text-rose-500 mb-4" />, title: "Multiple Categories", description: "Matrimonial, Job/Resume, or Business Profile — we have a template for every need." },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col notranslate">

        {/* ── Hero Section ────────────────────────────────────────────────── */}
        <section className="relative px-4 min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100/50 to-white dark:from-orange-950/30 dark:via-slate-900 dark:to-slate-950 py-20">
          {/* Decorative glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-400/20 blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-rose-400/20 blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
            {/* Left side text content */}
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-8 text-center lg:text-left">
              <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Create Your Biodata in <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Minutes</span>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Matrimonial, Job Resume, or Business Profile — beautiful templates, instant PDF download.
              </motion.p>

              {/* Mobile CTA buttons — visible only below lg, where floating templates are hidden */}
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:hidden pt-2">
                <button onClick={() => handleScrollToTemplates('matrimonial')} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-md hover:bg-rose-600 transition-colors">
                  <Users className="w-4 h-4" /> Matrimonial
                </button>
                <button onClick={() => handleScrollToTemplates('job')} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-indigo-500 text-white font-semibold shadow-md hover:bg-indigo-600 transition-colors">
                  <Briefcase className="w-4 h-4" /> Job Resume
                </button>
                <button onClick={() => handleScrollToTemplates('business')} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 transition-colors">
                  <Building2 className="w-4 h-4" /> Business
                </button>
              </motion.div>
            </motion.div>

            {/* Right side floating scattered buttons */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative mx-auto hidden lg:flex items-center justify-center w-full max-w-[600px] h-[700px]">

              {/* Central glowing blur */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-rose-400 rounded-full opacity-20 blur-[80px]" />

              {/* Matrimonial Floating Template */}
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} className="absolute z-30 top-[5%] left-[5%]">
                <button onClick={() => handleScrollToTemplates('matrimonial')} className="block relative w-[220px] h-[310px] rounded-1xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(225,29,72,0.4)] border border-rose-200 dark:border-rose-800 bg-white transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-300 group text-left cursor-pointer">
                  <div className="w-[794px] h-[1122px] origin-top-left absolute top-0 left-0 pointer-events-none transition-transform duration-500" style={{ transform: 'scale(0.277)' }}>
                    <RoyalTemplate data={matrimonialData} />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-rose-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-rose-600 font-bold px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-1">Matrimonial <ChevronRight className="w-4 h-4" /></span>
                  </div>
                </button>
              </motion.div>

              {/* Job Resume Floating Template */}
              <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }} className="absolute z-20 top-[35%] right-[5%] ">
                <button onClick={() => handleScrollToTemplates('job')} className="block relative w-[220px] h-[295px] rounded-1xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(79,70,229,0.4)] border border-indigo-200 dark:border-indigo-800 bg-white transform rotate-3 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-300 group text-left cursor-pointer">
                  <div className="w-[794px] h-[1142px] origin-top-left absolute top-0 left-0 pointer-events-none transition-transform duration-500" style={{ transform: 'scale(0.277)' }}>
                    <JobProfessionalTemplate data={jobData as any} />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-indigo-600 font-bold px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-1">Resume <ChevronRight className="w-4 h-4" /></span>
                  </div>
                </button>
              </motion.div>

              {/* Business Profile Floating Template */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2.5 }} className="absolute z-10 top-[65%] left-[10%]">
                <button onClick={() => handleScrollToTemplates('business')} className="block relative w-[220px] h-[295px] rounded-1xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(245,158,11,0.4)] border border-amber-200 dark:border-amber-800 bg-white transform -rotate-3 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-300 group text-left cursor-pointer">
                  <div className="w-[794px] h-[1122px] origin-top-left absolute top-0 left-0 pointer-events-none transition-transform duration-500" style={{ transform: 'scale(0.277)' }}>
                    <BusinessModernTemplate data={businessData as any} />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-amber-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-amber-600 font-bold px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-1">Business <ChevronRight className="w-4 h-4" /></span>
                  </div>
                </button>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ── How It Works Section ─────────────────────────────────────────── */}
        <section className="py-20 bg-white dark:bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">How It Works</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 text-lg">Create your professional biodata in 3 simple steps.</p>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Dashed connector line for desktop */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-indigo-200 dark:border-indigo-800 -z-10" />

              <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-6 relative z-10">
                {/* Step 1 */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="flex flex-col items-center flex-1 text-center group">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center border-4 border-indigo-100 dark:border-indigo-900 group-hover:scale-105 transition-transform duration-300">
                      <MousePointerClick className="w-10 h-10 text-indigo-500" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white dark:border-slate-900">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Choose Your Category</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs leading-relaxed">Select between Matrimonial, Job/Resume, or Business Profile to get started.</p>
                </motion.div>

                {/* Step 2 */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-col items-center flex-1 text-center group">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center border-4 border-indigo-100 dark:border-indigo-900 group-hover:scale-105 transition-transform duration-300">
                      <FileEdit className="w-10 h-10 text-indigo-500" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white dark:border-slate-900">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Fill Your Details</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs leading-relaxed">Simply fill out our easy-to-use form with your information and photo.</p>
                </motion.div>

                {/* Step 3 */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-col items-center flex-1 text-center group">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center border-4 border-indigo-100 dark:border-indigo-900 group-hover:scale-105 transition-transform duration-300">
                      <Download className="w-10 h-10 text-indigo-500" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white dark:border-slate-900">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Download Biodata</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs leading-relaxed">Preview your details in real-time and download your stunning PDF instantly.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Category Picker ──────────────────────────────────────────────── */}
        <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">What are you creating today?</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Choose your biodata category to get started with the right professional template.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

              {/* Matrimonial */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0, duration: 0.5 }}
                className="group relative rounded-[2rem] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col items-center text-center overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(225,29,72,0.2)] hover:-translate-y-2 hover:border-rose-200 dark:hover:border-rose-800 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-transparent dark:from-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center w-full h-full">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg shadow-rose-500/30 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
                    <Users className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Matrimonial</h3>

                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">
                    Create a beautiful marriage biodata with dedicated sections for personal details, family background, and partner preferences.
                  </p>

                  <button onClick={() => handleScrollToTemplates('matrimonial')} className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all duration-300 cursor-pointer">
                    Browse Templates →
                  </button>
                </div>
              </motion.div>

              {/* Job / Resume */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
                className="group relative rounded-[2rem] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col items-center text-center overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.2)] hover:-translate-y-2 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center w-full h-full">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Job / Resume</h3>

                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">
                    Build a professional resume highlighting your work experience, skills, and education. Perfectly formatted for job platforms.
                  </p>

                  <button onClick={() => handleScrollToTemplates('job')} className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 cursor-pointer">
                    Browse Templates →
                  </button>
                </div>
              </motion.div>

              {/* Business Profile */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
                className="group relative rounded-[2rem] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col items-center text-center overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] hover:-translate-y-2 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center w-full h-full">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Business Profile</h3>

                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">
                    Showcase your business with a polished profile containing services, achievements, and easy-to-share contact details.
                  </p>

                  <button onClick={() => handleScrollToTemplates('business')} className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 cursor-pointer">
                    Browse Templates →
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Tabbed Templates Section ─────────────────────────────────────── */}
        <section id="templates" className="py-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Stunning Templates</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Browse templates across all categories.</p>
            </div>

            {/* Tab switcher */}
            <div className="flex justify-center mb-10 px-2">
              <div className="flex flex-wrap justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-1.5 gap-1.5 w-full sm:w-auto sm:rounded-full">
                {TAB_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl sm:rounded-full text-sm font-semibold transition-all duration-200 flex-1 sm:flex-none justify-center min-w-0 ${activeTab === cat.id
                      ? `bg-gradient-to-r ${cat.accent} text-white shadow-md`
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                  >
                    {cat.icon}
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Template carousel per tab */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                <div className="relative">
                  <button onClick={() => scroll("left")} className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 bg-gradient-to-r ${activeCat.accent} text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95`}>
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-10 sm:px-12" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {activeCat.templates.map((tmpl, idx) => {
                      const Comp = tmpl.Component as React.ComponentType<{ data: typeof tmpl.data }>;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08, duration: 0.4 }}
                          className="relative shrink-0 w-[260px] sm:w-[320px] md:w-[340px] snap-center group rounded-xl h-[380px] sm:h-[440px] md:h-[480px] overflow-hidden flex flex-col transition-transform hover:-translate-y-2 cursor-pointer"
                        >
                          <div className="w-full h-full relative pointer-events-none">
                            <div className="absolute top-2 left-1/2 -translate-x-1/2" style={{ transform: "scale(0.32)", transformOrigin: "top center" }}>
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
                            <Link href={`${activeCat.createHref}?template=${tmpl.slug}`} className={`px-6 py-3 bg-gradient-to-r ${activeCat.accent} text-white rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg`}>
                              Use Template
                            </Link>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <button onClick={() => scroll("right")} className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 bg-gradient-to-r ${activeCat.accent} text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95`}>
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
                  <div className="p-4 bg-rose-100 dark:bg-rose-950/50 rounded-2xl mb-2">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ───────────────────────────────────────────────────── */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-sm font-semibold mb-4">
                Got Questions?
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Everything you need to know about BioDataEarth.
              </p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    openFaq === idx
                      ? "border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 shadow-md"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-200 dark:hover:border-rose-800"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={openFaq === idx}
                  >
                    <span className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                      {faq.q}
                    </span>
                    <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      openFaq === idx
                        ? "bg-rose-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}>
                      {openFaq === idx ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
