"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Clock, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-b from-orange-50/40 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-28 pb-20 px-4 md:px-6 notranslate">

        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-orange-400/5 blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-rose-400/5 blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-full inline-block mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Support</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
              Have questions, issues, or suggestions? Send us a message and we will respond as fast as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left pane: Contact details */}
            <div className="lg:col-span-5 space-y-6">

              {/* Card 1: Official Channels */}
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-rose-500" />
                  Support Channels
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  For template customization issues, payment inquiries, or profile deletion requests, email us directly. We are happy to help you.
                </p>

                <div className="space-y-4 pt-2">
                  {/* Email block */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Support Email</p>
                      <a href="mailto:biodataearth@gmail.com" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-rose-500 transition-colors">
                        biodataearth@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Hours block */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Response Time</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Typically within 12 - 24 hours (Monday to Saturday)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Security Note */}
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Security & Integrity</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    We will never ask you for passwords or payment credentials via email. All premium transactions must happen directly within the verified browser frame.
                  </p>
                </div>
              </div>

            </div>

            {/* Right pane: Glassmorphic form */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden">

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Send a Message
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Fill in the fields below and our automated dispatch will deliver your query to the technical team.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Name field */}
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                            Your Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all text-slate-900 dark:text-white"
                          />
                        </div>

                        {/* Email field */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Enter email address"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Subject field */}
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          placeholder="What is your message about?"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all text-slate-900 dark:text-white"
                        />
                      </div>

                      {/* Message field */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                          Your Message <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Type your message here..."
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all text-slate-900 dark:text-white resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-500/20 disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-12 flex flex-col items-center justify-center space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-2 shadow-inner border border-emerald-100 dark:border-emerald-900">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                          Thank you for reaching out! We have received your query and our team will get back to you at your provided email shortly.
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
