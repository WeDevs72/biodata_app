"use client";

import { Languages } from "lucide-react";
import { useState, useEffect } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी (Hindi)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "bn", label: "বাংলা (Bangla)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
];

/** Read the language Google Translate set in its cookie (googtrans=/en/hi) */
function getGoogleTranslateLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
  return match ? match[1] : "en";
}

export function LanguageSelector() {
  const [selected, setSelected] = useState("en");

  // On mount, restore the language from Google's cookie and initialize the widget
  useEffect(() => {
    const lang = getGoogleTranslateLang();
    setSelected(lang);

    // Define the callback for the external script
    (window as any).googleTranslateElementInit = () => {
      // Check if the container exists to prevent errors
      if (!document.getElementById("google_translate_element")) return;
      
      // Clear previous instances if any (fixes re-render appending issues)
      const container = document.getElementById("google_translate_element");
      if (container) container.innerHTML = '';

      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,mr,gu,ta,te,bn,kn,pa",
        },
        "google_translate_element"
      );
      
      // Delay applying the selected language to give the widget time to render
      setTimeout(() => {
        const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (combo && combo.value !== lang) {
            combo.value = lang;
            combo.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 500);
    };

    // If script already loaded (client-side navigation), re-init immediately
    if ((window as any).google && (window as any).google.translate) {
      setTimeout(() => {
        if (typeof (window as any).googleTranslateElementInit === "function") {
          (window as any).googleTranslateElementInit();
        }
      }, 100);
    } else {
      // Load script if not already present
      if (!document.querySelector('script[src*="translate.google.com/translate_a/element.js"]')) {
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelected(lang);

    // Trigger Google Translate via the hidden combo
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      const w = window as any;
      if (typeof w.doGTranslate === "function") {
        w.doGTranslate(`en|${lang}`);
      }
    }
  };

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl px-5 py-3 flex flex-col sm:flex-row items-center gap-3 shadow-sm mb-4 notranslate">
      <div className="flex items-center gap-2 text-rose-800 font-semibold whitespace-nowrap shrink-0">
        <Languages className="w-5 h-5" />
        <label htmlFor="lang-selector">Select Language:</label>
      </div>
      <select
        id="lang-selector"
        value={selected}
        onChange={handleChange}
        className="flex-1 w-full px-4 py-2.5 border border-rose-400 rounded-lg bg-white text-rose-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm transition"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>

      {/* Hidden Google Translate container – needed for the engine to load */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
