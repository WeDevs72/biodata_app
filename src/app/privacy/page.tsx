"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Eye, Database, CreditCard, UserCheck, Trash2, Users } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "collect", title: "2. Information We Collect" },
    { id: "use", title: "3. How We Use Information" },
    { id: "storage", title: "4. Data Storage & Security" },
    { id: "payments", title: "5. Payment Processing" },
    { id: "sharing", title: "6. Third-Party Disclosures" },
    { id: "rights", title: "7. User Rights & Data Deletion" },
    { id: "changes", title: "8. Policy Changes" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 pt-28 pb-20 px-4 md:px-6 notranslate">
        <div className="max-w-6xl mx-auto">
          {/* Header section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full inline-block mb-4">
              Legal Policy
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Policy</span>
            </h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">
              Last Updated: May 28, 2026
            </p>
          </div>

          {/* Core layout with sidebar on desktop */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-28 p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Table of Contents</h3>
              <ul className="space-y-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => scrollTo(sec.id)}
                      className="w-full text-left py-2 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                    >
                      {sec.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Shield className="w-5 h-5 text-rose-500" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">BioDataEarth Secure Shield</span>
              </div>
            </aside>

            {/* Document Content */}
            <article className="lg:col-span-8 p-6 md:p-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">

              {/* Introduction */}
              <section id="intro" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Eye className="w-6 h-6 text-rose-500 shrink-0" />
                  1. Introduction
                </h2>
                <p>
                  Welcome to <strong>BioDataEarth</strong> (accessible at <a href="https://biodataearth.com" className="text-rose-500 underline hover:opacity-80">https://biodataearth.com</a>). Your privacy is of paramount importance to us. This Privacy Policy details how we collect, process, secure, store, and utilize the data you provide while using our matrimonial, job resume, and business profile makers.
                </p>
                <p>
                  By creating a biodata on our platform, you acknowledge that you accept the practices outlined in this Privacy Policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="collect" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Database className="w-6 h-6 text-rose-500 shrink-0" />
                  2. Information We Collect
                </h2>
                <p>
                  To provide our premium biodata and profile generation services, we collect information directly supplied by you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Matrimonial Data:</strong> Full name, date of birth, physical height, religion, caste, current city, academic background, occupation, income level, parents' names and occupation, details about siblings, profile photo URL, and specific partner preferences.
                  </li>
                  <li>
                    <strong>Job Resume Data:</strong> Full name, contact details (phone, email), location, LinkedIn profile links, professional summary, skillset, languages, structured work history, and academic history.
                  </li>
                  <li>
                    <strong>Business Profile Data:</strong> Owner/representative name, brand/business name, tagline, email, website link, physical business location, sector/industry, establishment year, employee count, annual turnover details, specific offerings, and company achievements.
                  </li>
                  <li>
                    <strong>Media uploads:</strong> Profile pictures or logos that you upload to embed directly in your biodata templates.
                  </li>
                  <li>
                    <strong>Technical Usage Data:</strong> Standard IP addresses, browser specifications, and user flow telemetry to manage site safety, perform server diagnosis, and optimize features.
                  </li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section id="use" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <UserCheck className="w-6 h-6 text-rose-500 shrink-0" />
                  3. How We Use Information
                </h2>
                <p>
                  The data we collect is used exclusively for the following operational workflows:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>To compile, format, preview, and generate your printable PDF biodata.</li>
                  <li>To verify payments for premium templates via Razorpay.</li>
                  <li>To offer support, troubleshoot template issues, and respond to your direct queries.</li>
                  <li>To diagnose technical performance and secure our site against spam, automated abuse, or fraudulent activity.</li>
                </ol>
                <p>
                  We absolutely **do not** sell, rent, trade, or share your highly personal biodata information with corporate advertisers or third-party marketing companies.
                </p>
              </section>

              {/* Data Storage & Security */}
              <section id="storage" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Shield className="w-6 h-6 text-rose-500 shrink-0" />
                  4. Data Storage & Security
                </h2>
                <p>
                  Your information is stored using enterprise-grade cloud databases provided by <strong>Supabase</strong>.
                </p>
                <p>
                  All active operations use HTTPS SSL/TLS encryption protocols, meaning your inputs are completely shielded from interception as they move between your browser and our servers.
                </p>
                <p>
                  While we implement robust electronic and operational safeguards to protect against unauthorized access, please understand that no internet transmission is 100% immune to malicious breach. We advise against saving sensitive credentials or official ID card copies inside the form fields.
                </p>
              </section>

              {/* Payment Processing */}
              <section id="payments" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <CreditCard className="w-6 h-6 text-rose-500 shrink-0" />
                  5. Payment Processing
                </h2>
                <p>
                  For premium templates that require payment, all transactions are secured and processed by our third-party payment gateway, <strong>Razorpay</strong>.
                </p>
                <p>
                  BioDataEarth **does not see, store, or process** credit card numbers, CVVs, net-banking pins, or UPI transaction credentials. All transaction processing conforms strictly to the Payment Card Industry Data Security Standard (PCI-DSS).
                </p>
              </section>

              {/* Third-Party Disclosures */}
              <section id="sharing" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Users className="w-6 h-6 text-rose-500 shrink-0" />
                  6. Third-Party Disclosures
                </h2>
                <p>
                  We disclose your data only to trusted service partners integral to running the application:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Supabase:</strong> For cloud hosting and database storage.</li>
                  <li><strong>Razorpay:</strong> For executing safe financial transactions.</li>
                  <li><strong>Legal Compliance:</strong> If forced by active law enforcement subpoenas or to protect the safety, rights, and property of BioDataEarth and its users.</li>
                </ul>
              </section>

              {/* User Rights & Data Deletion */}
              <section id="rights" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Trash2 className="w-6 h-6 text-rose-500 shrink-0" />
                  7. User Rights & Data Deletion
                </h2>
                <p>
                  Since we value your privacy, you maintain full control over the biodatas you create:
                </p>
                <p>
                  If you have generated a biodata and wish to have all related personal records, photos, and entries **permanently deleted** from our Supabase servers, simply email us at:
                </p>
                <p className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  <a href="mailto:biodataearth@gmail.com" className="text-base font-bold text-rose-500 hover:underline">
                    biodataearth@gmail.com
                  </a>
                  <br />
                  <span className="text-xs text-slate-400 mt-1 block">Specify your Full Name, category, and creation date in the message.</span>
                </p>
                <p>
                  Upon receiving a verified request, we will purge all matching records from our primary production databases within 48 hours.
                </p>
              </section>

              {/* Policy Changes */}
              <section id="changes" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Shield className="w-6 h-6 text-rose-500 shrink-0" />
                  8. Policy Changes
                </h2>
                <p>
                  We reserves the right to modify this Privacy Policy at any time. When updates occur, the "Last Updated" date at the top of this page will be amended. We encourage users to inspect this document occasionally to stay aware of how we protect personal details.
                </p>
              </section>

            </article>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
