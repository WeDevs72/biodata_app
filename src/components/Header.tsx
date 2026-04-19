import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-rose-700 shadow-md notranslate">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-white">
            EverAfter
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href="/create"
              className="px-5 py-2 text-sm font-semibold text-rose-700 bg-white rounded-md hover:bg-rose-50 transition-colors shadow-sm"
            >
              Create Biodata
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
