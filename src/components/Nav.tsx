import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full bg-black backdrop-blur-sm z-50 px-6 py-4 border-b border-amber-500/10">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="text-2xl font-semibold tracking-tight">
      <Link href="/" className="text-2xl font-semibold tracking-tight">
        <span className="text-amber-500">రాజ</span>
        <span className="text-slate-200">ర్షి.</span>
        </Link>
      </div>
      <div className="flex gap-8">
        <a href="/blog" className="hover:text-amber-500 transition-colors">
          పద్యం | Blog
        </a>
        <a
          href="https://x.com/TheRajarsi"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-500 transition-colors"
        >
           X
        </a>
      </div>
    </div>
  </nav>
  );
}