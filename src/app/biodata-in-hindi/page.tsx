import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Download, Heart, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "बायोडाटा बनाएं ऑनलाइन — शादी, नौकरी और बिजनेस | BioDataEarth",
  description:
    "हिंदी में मुफ्त बायोडाटा बनाएं। शादी के लिए बायोडाटा, नौकरी के लिए रिज्यूमे और बिजनेस प्रोफाइल — सुंदर टेम्पलेट, PDF डाउनलोड, बिना अकाउंट के।",
  keywords: [
    "biodata in hindi",
    "बायोडाटा बनाएं",
    "शादी के लिए बायोडाटा",
    "विवाह बायोडाटा",
    "hindi biodata maker",
    "biodata format hindi",
    "shadi biodata hindi",
    "bायोडाटा PDF",
  ],
  alternates: {
    canonical: "https://biodataearth.com/biodata-in-hindi",
  },
  openGraph: {
    title: "बायोडाटा बनाएं ऑनलाइन — शादी, नौकरी और बिजनेस | BioDataEarth",
    description:
      "हिंदी में मुफ्त बायोडाटा बनाएं। शादी के लिए बायोडाटा — PDF डाउनलोड, बिना अकाउंट के।",
    url: "https://biodataearth.com/biodata-in-hindi",
  },
};

const categories = [
  {
    emoji: "💍",
    title: "शादी के लिए बायोडाटा",
    titleEn: "Matrimonial Biodata",
    desc: "विवाह के लिए एक सुंदर और पेशेवर बायोडाटा बनाएं। परिवार की जानकारी, शिक्षा, और जीवनसाथी की पसंद जोड़ें।",
    href: "/create",
    color: "from-rose-500 to-orange-500",
    bg: "bg-rose-50",
    border: "border-rose-200",
    textColor: "text-rose-700",
  },
  {
    emoji: "💼",
    title: "नौकरी के लिए बायोडाटा",
    titleEn: "Job Resume / Biodata",
    desc: "अपनी शिक्षा, अनुभव और कौशल के साथ एक पेशेवर जॉब रिज्यूमे बनाएं।",
    href: "/create/job",
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    textColor: "text-indigo-700",
  },
  {
    emoji: "🏢",
    title: "बिजनेस प्रोफाइल",
    titleEn: "Business Profile",
    desc: "अपने व्यवसाय की एक आकर्षक प्रोफाइल बनाएं और ग्राहकों के साथ साझा करें।",
    href: "/create/business",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    textColor: "text-amber-700",
  },
];

const steps = [
  { step: "१", title: "टेम्पलेट चुनें", desc: "अपनी पसंद का सुंदर टेम्पलेट चुनें।" },
  { step: "२", title: "जानकारी भरें", desc: "हिंदी या अंग्रेजी में अपनी जानकारी भरें।" },
  { step: "३", title: "फोटो जोड़ें", desc: "अपनी हालिया फोटो अपलोड करें।" },
  { step: "४", title: "PDF डाउनलोड करें", desc: "एक क्लिक में PDF डाउनलोड करें।" },
];

const faqs = [
  {
    q: "क्या BioDataEarth पर हिंदी में बायोडाटा बना सकते हैं?",
    a: "हाँ! आप फॉर्म में हिंदी में जानकारी भर सकते हैं और PDF उसी हिंदी जानकारी के साथ डाउनलोड होगी।",
  },
  {
    q: "क्या यह बिल्कुल मुफ्त है?",
    a: "हाँ, BioDataEarth पर बायोडाटा बनाना और PDF डाउनलोड करना पूरी तरह मुफ्त है। कोई अकाउंट बनाने की जरूरत नहीं।",
  },
  {
    q: "बायोडाटा बनाने में कितना समय लगता है?",
    a: "5 मिनट से भी कम! बस फॉर्म भरें, टेम्पलेट चुनें, और PDF डाउनलोड करें।",
  },
  {
    q: "क्या मेरी जानकारी सुरक्षित रहेगी?",
    a: "बिल्कुल। हम आपकी व्यक्तिगत जानकारी किसी के साथ साझा नहीं करते।",
  },
];

export default function BiodataInHindiPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-20">

        {/* Hero */}
        <section className="relative px-4 py-20 md:py-28 bg-gradient-to-br from-orange-50 via-rose-50 to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-300/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" /> मुफ्त बायोडाटा मेकर
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              बायोडाटा बनाएं{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                ऑनलाइन मुफ्त
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed mb-4">
              शादी के लिए बायोडाटा, नौकरी का रिज्यूमे, या बिजनेस प्रोफाइल — सुंदर टेम्पलेट चुनें, जानकारी भरें, और PDF डाउनलोड करें।
            </p>
            <p className="text-base text-slate-500 mb-10">
              Create biodata in Hindi — free, instant, no account needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-lg shadow-lg shadow-rose-200 hover:scale-105 transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                बायोडाटा बनाएं — मुफ्त
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">✓ कोई अकाउंट नहीं &nbsp;·&nbsp; ✓ तुरंत PDF &nbsp;·&nbsp; ✓ हिंदी सपोर्ट</p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                किस काम के लिए बायोडाटा बनाना है?
              </h2>
              <p className="text-slate-500 text-lg">अपनी जरूरत के अनुसार category चुनें।</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={cat.href}
                  className={`group rounded-2xl border-2 ${cat.border} ${cat.bg} p-6 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="text-5xl mb-4">{cat.emoji}</div>
                  <h3 className={`text-xl font-extrabold ${cat.textColor} mb-1`}>{cat.title}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-3">{cat.titleEn}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{cat.desc}</p>
                  <span className={`inline-flex items-center gap-1 text-sm font-bold ${cat.textColor} group-hover:gap-2 transition-all`}>
                    शुरू करें <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                बायोडाटा कैसे बनाएं?
              </h2>
              <p className="text-slate-500 text-lg">सिर्फ 4 आसान steps — 5 मिनट में तैयार</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white font-extrabold text-2xl flex items-center justify-center mb-4 shadow-md shadow-rose-200">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ in Hindi */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                अक्सर पूछे जाने वाले सवाल
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                  <h3 className="font-bold text-slate-900 mb-2">प्र: {faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">उ: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO content */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
              बायोडाटा क्या होता है?
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                <strong>बायोडाटा</strong> एक ऐसा दस्तावेज़ है जिसमें किसी व्यक्ति की व्यक्तिगत, शैक्षणिक और पारिवारिक जानकारी होती है। भारत में बायोडाटा मुख्यतः <strong>शादी के लिए</strong> बनाया जाता है, लेकिन इसे नौकरी और बिजनेस के लिए भी तैयार किया जाता है।
              </p>
              <p>
                शादी के बायोडाटा में आमतौर पर नाम, जन्म तिथि, कुंडली जानकारी, शिक्षा, नौकरी, परिवार का विवरण, और जीवनसाथी की पसंद शामिल होती है।
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
                बायोडाटा में क्या-क्या लिखें?
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li><strong>व्यक्तिगत जानकारी:</strong> पूरा नाम, जन्म तिथि, ऊंचाई, रंग, धर्म, जाति।</li>
                <li><strong>शिक्षा और नौकरी:</strong> सबसे उच्च शिक्षा, कॉलेज, नौकरी और आमदनी।</li>
                <li><strong>परिवार का विवरण:</strong> पिता का नाम और पेशा, माँ का नाम, भाई-बहन।</li>
                <li><strong>कुंडली जानकारी:</strong> राशि, नक्षत्र, मांगलिक स्थिति।</li>
                <li><strong>जीवनसाथी की पसंद:</strong> उम्र, शिक्षा, स्थान संबंधी अपेक्षाएं।</li>
                <li><strong>संपर्क जानकारी:</strong> फोन नंबर या ईमेल।</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-rose-500 to-orange-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              अभी बायोडाटा बनाएं — बिल्कुल मुफ्त!
            </h2>
            <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
              सुंदर टेम्पलेट, तुरंत PDF। कोई अकाउंट नहीं।
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-rose-600 font-bold text-lg hover:bg-rose-50 transition-colors shadow-xl"
            >
              <Download className="w-5 h-5" />
              बायोडाटा बनाएं
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
