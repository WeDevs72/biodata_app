"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Shield, Sparkles, Target, Users } from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    animate: { transition: { staggerChildren: 0.15 } }
  };
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Built with Care",
      description: "We understand that your biodata is your identity. Whether finding a partner or pitching your business, we design with your milestones in mind."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-500" />,
      title: "Privacy First",
      description: "Your trust is our priority. We treat your personal details with absolute confidentiality, keeping data local and processed securely."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "Premium Aesthetics",
      description: "No more boring black-and-white forms. Our templates are curated by professional designers to ensure you stand out immediately."
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-b from-orange-50/40 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-28 pb-20 px-4 md:px-6 notranslate">
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange-400/10 blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-80 left-0 w-80 h-80 rounded-full bg-rose-400/10 blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          {/* Hero Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-full inline-block mb-4">
              Our Journey
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">BioDataEarth</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              We empower millions to present their best selves to the world through beautifully-curated, instant, and secure biodata profiles.
            </p>
          </motion.div>

          {/* Core Story / Mission */}
          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center mb-24"
          >
            <motion.div variants={fadeIn} className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Our Mission & Vision
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Traditionally, creating a biodata meant wrestling with rigid text editors or relying on outdated templates. **BioDataEarth** was founded to redefine this process. We believe that everyone deserves a high-quality, professional, and visually stunning profile, without needing high-end design skills or expensive software.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our platform provides a clean, stress-free editor for three vital life journeys: finding a soulmate through **Matrimonial** profiles, landing your dream job with **Professional Resumes**, and showcasing business capability with structured **Business Profiles**.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Simplicity Over Complexity
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                We design with accessibility in mind. No complex logins or lengthy onboarding cycles. Just pick a template, fill out your information with real-time previewing, and download your perfectly structured PDF instantly.
              </p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs font-semibold text-slate-500">
                <div>✨ Beautiful Typography</div>
                <div>•</div>
                <div>🛡️ Instant Deletion</div>
                <div>•</div>
                <div>⚡ Zero Lag</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Core Values */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 tracking-tight">
              Values That Define Us
            </h2>
            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {values.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeIn}
                  className="p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
