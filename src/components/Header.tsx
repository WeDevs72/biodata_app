"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 notranslate ${scrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex flex-col items-start justify-center">
          <span className={`font-extrabold text-2xl tracking-tight leading-none text-slate-900 dark:text-white`}>
            BiodataEarth
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${scrolled ? "text-slate-500" : "text-slate-600 dark:text-slate-400"}`}>
            Build your identity, your way
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href="/create"
              className="px-5 py-2.5 text-sm font-bold rounded-full transition-all shadow-sm bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Create Biodata
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
