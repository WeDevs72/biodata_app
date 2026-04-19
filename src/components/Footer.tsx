export function Footer() {
  return (
    <footer className="w-full bg-rose-700 py-8 notranslate">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-white/90 text-center md:text-left">
          © {new Date().getFullYear()} EverAfter Biodata Maker. Beautiful templates, fast and free.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
