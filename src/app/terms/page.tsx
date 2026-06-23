"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, FileText, Ban, AlertTriangle, ShieldAlert, Gavel, HelpCircle } from "lucide-react";

export default function TermsPage() {
  const sections = [
    { id: "accept", title: "1. Acceptance of Terms" },
    { id: "service", title: "2. Description of Service" },
    { id: "payments", title: "3. Fees, Payments & Refunds" },
    { id: "ip", title: "4. Intellectual Property" },
    { id: "conduct", title: "5. User Conduct & Restrictions" },
    { id: "disclaimers", title: "6. Disclaimers & Limitation of Liability" },
    { id: "governing", title: "7. Governing Law & Jurisdiction" },
    { id: "contact", title: "8. Contact Us" },
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
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-full inline-block mb-4">
              Service Terms
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Service</span>
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
            </aside>

            {/* Document Content */}
            <article className="lg:col-span-8 p-6 md:p-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">

              {/* Acceptance of Terms */}
              <section id="accept" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Gavel className="w-6 h-6 text-rose-500 shrink-0" />
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing, browsing, or using the <strong>BioDataEarth</strong> website (located at <a href="https://biodataearth.com" className="text-rose-500 underline hover:opacity-80">https://biodataearth.com</a>), you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                </p>
                <p>
                  If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                </p>
              </section>

              {/* Description of Service */}
              <section id="service" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <FileText className="w-6 h-6 text-rose-500 shrink-0" />
                  2. Description of Service
                </h2>
                <p>
                  BioDataEarth provides a premium online utility allowing users to design and download tailored, professional biodata profiles across three distinct categories:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Matrimonial:</strong> Customized profiles structured for matchmaking and family introductions.</li>
                  <li><strong>Job Resume:</strong> Clean formats designed to present work achievements, education, and credentials to hiring managers.</li>
                  <li><strong>Business Profile:</strong> Corporate templates built to highlight industry credentials, financial parameters, and brand accomplishments.</li>
                </ul>
                <p>
                  The service includes premium templates. We reserve the right to modify, suspend, or discontinue any aspect of these services at any time without notice.
                </p>
              </section>

              {/* Fees, Payments & Refunds */}
              <section id="payments" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0" />
                  3. Fees, Payments & Refunds
                </h2>
                <p>
                  Access to certain premium layout templates requires a one-time fee. These transactions are routed and cleared via our secure payment merchant partner, <strong>Razorpay</strong>.
                </p>
                <p>
                  All stated template prices are displayed in Indian Rupees (INR) and are inclusive of relevant digital taxes.
                </p>
                <p>
                  <strong>No-Refund Policy:</strong> Because our templates are digital products delivered instantly through on-the-fly PDF compilation, all payments are final and non-refundable. We advise you to preview your completed form details inside our real-time rendering window before executing any checkout action.
                </p>
              </section>

              {/* Intellectual Property */}
              <section id="ip" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Scale className="w-6 h-6 text-rose-500 shrink-0" />
                  4. Intellectual Property
                </h2>
                <p>
                  <strong>Our Material:</strong> BioDataEarth holds full proprietary ownership over all site code, layout designs, CSS stylesheets, graphic borders, template files, visual themes, and software features. You are granted a limited license to download and compile files using the editor exclusively for personal, non-commercial use.
                </p>
                <p>
                  <strong>Your Material:</strong> You retain ownership of all biographical data, text descriptions, credentials, and image files that you input into the forms. By using our platform, you warrant that you own or have obtained all necessary permissions to publish the photos or personal profiles you upload.
                </p>
              </section>

              {/* User Conduct & Restrictions */}
              <section id="conduct" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Ban className="w-6 h-6 text-rose-500 shrink-0" />
                  5. User Conduct & Restrictions
                </h2>
                <p>
                  When using our biodata editor, you agree **not** to engage in the following prohibited behaviors:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Inputting false, fraudulent, deceptive, or misleading details (e.g., identity impersonation).</li>
                  <li>Uploading profile photos that contain obscene, defamatory, violent, or copyrighted content belonging to another individual without explicit permission.</li>
                  <li>Using automated software scripts, scrapers, crawlers, or extraction tools to gather template resources or user interfaces from our domain.</li>
                  <li>Attempting to bypass payment gates, reverse engineer compiled files, or introduce malicious malware or virus codes.</li>
                </ul>
              </section>

              {/* Disclaimers & Limitation of Liability */}
              <section id="disclaimers" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
                  6. Disclaimers & Limitation of Liability
                </h2>
                <p>
                  <strong>No Guarantee of Outcome:</strong> BioDataEarth is purely a utility for document generation. We do not inspect or verify the truthfulness of user inputs, and we offer **no guarantees** that your generated biodata will lead to successful marriages, marriage proposals, job placements, interviews, or commercial contracts.
                </p>
                <p>
                  <strong>As-Is Basis:</strong> The materials and templates on this website are provided "as is" and "as available". BioDataEarth makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties of merchantability or fitness for a particular purpose.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> In no event shall BioDataEarth or its development team be liable for any damages (including, without limitation, damages for loss of data, missed opportunities, or business interruption) arising out of the use or inability to use the generated PDF profiles.
                </p>
              </section>

              {/* Governing Law & Jurisdiction */}
              <section id="governing" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <Gavel className="w-6 h-6 text-rose-500 shrink-0" />
                  7. Governing Law & Jurisdiction
                </h2>
                <p>
                  Any legal claims or disputes relating to BioDataEarth's services or these Terms of Service shall be governed by and construed in accordance with the laws of <strong>India</strong>.
                </p>
                <p>
                  You agree that any legal actions or proceedings arising out of this agreement shall be brought exclusively in the courts located within <strong>Ahmedabad, Gujarat, India</strong>.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                  <HelpCircle className="w-6 h-6 text-rose-500 shrink-0" />
                  8. Contact Us
                </h2>
                <p>
                  If you have any questions regarding these Terms of Service, please reach out to us at:
                </p>
                <p className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  <a href="mailto:biodataearth@gmail.com" className="text-base font-bold text-rose-500 hover:underline">
                    biodataearth@gmaill.com
                  </a>
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
