"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { RoyalTemplate } from "@/components/templates/RoyalTemplate";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = window.innerWidth < 768 ? clientWidth : clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <CheckCircle2 className="w-8 h-8 text-rose-500 mb-4" />,
      title: "Fast & Easy",
      description: "Fill a simple form and generate a stunning biodata instantly. No design skills required.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-rose-500 mb-4" />,
      title: "Secure & Private",
      description: "Your data remains local and secure. We respect your privacy out of the box.",
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-500 mb-4" />,
      title: "Multiple Templates",
      description: "Choose from Classic, Modern, or Minimal styles to suit your unique presentation.",
    },
  ];

  const templates = [
    { name: "Traditional Rich", Component: ClassicTemplate },
    { name: "Modern Floral", Component: ModernTemplate },
    { name: "Minimal Gold", Component: MinimalTemplate },
    { name: "Elegant Emerald", Component: ElegantTemplate },
    { name: "Royal Purple", Component: RoyalTemplate },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col notranslate">
        {/* Hero Section */}
        <section className="relative px-4 pt-28 pb-36 md:pt-40 md:pb-48 text-center flex flex-col items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 -z-20">
            <img
              src="https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 -z-10 bg-black/70"></div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl space-y-8"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg"
            >
              Create Marriage Biodata in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Minutes</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-white/80"
            >
              Beautiful templates. Fast. Free. Build the perfect first impression for your life's next big step.
            </motion.p>

            <motion.div variants={fadeIn} className="pt-4">
              <Link
                href="/create"
                className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-8 text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 hover:opacity-90"
              >
                Create Biodata
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Templates Section */}
        <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Stunning Templates</h2>
              <p className="text-slate-600 dark:text-slate-400">Find the perfect design that matches your style.</p>
            </div>

            <div className="relative group/slider px-2 md:px-0">
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-20 p-3 bg-rose-700 text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-8 pt-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {templates.map((template, idx) => {
                  const TemplateComp = template.Component;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="mr-8 relative shrink-0 w-[340px] snap-center group rounded-xl p-0 h-[480px] overflow-hidden flex flex-col transition-transform hover:-translate-y-2 cursor-pointer"
                    >
                      {/* Miniature template Wrapper */}
                      <div className="w-full h-full relative pointer-events-none">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 origin-top" style={{ transform: 'scale(0.42)' }}>
                          <div className="w-[794px] h-[1122px] shadow-2xl rounded-md overflow-hidden bg-white">
                            <TemplateComp data={{
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
                              photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop"
                            }} />
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 dark:bg-black/60 backdrop-blur-sm z-20">
                        <Link href={`/create?template=${template.name.split(' ')[0].toLowerCase()}`} className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg">
                          Use Template
                        </Link>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 z-20 p-3 bg-rose-700 text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Custom style to hide scrollbar for webkit browsers */}
            <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }}></style>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="p-4 bg-rose-100 dark:bg-rose-950/50 rounded-2xl mb-2">
                    {feature.icon}
                  </div>
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
