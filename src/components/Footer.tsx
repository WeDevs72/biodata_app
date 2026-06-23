import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 py-12 notranslate text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand & Tagline */}
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col items-start justify-center mb-4">
              <span className="font-extrabold text-2xl leading-none tracking-tight">
                BiodataEarth
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Build your identity, your way
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Create beautiful, professional biodatas in minutes. Fast,and completely private.
            </p>

          </div>

          {/* Links Group 1 */}
          <div className="md:col-span-1 md:ml-auto">
            <h4 className="text-white font-bold mb-4 tracking-wide">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/create" className="text-slate-400 hover:text-white transition-colors text-sm">Matrimonial</Link></li>
              <li><Link href="/create/job" className="text-slate-400 hover:text-white transition-colors text-sm">Job Resumes</Link></li>
              <li><Link href="/create/business" className="text-slate-400 hover:text-white transition-colors text-sm">Business Profiles</Link></li>
            </ul>
          </div>

          {/* Links Group 2 */}
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-4 tracking-wide">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            © 2026 BioDataEarth. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
