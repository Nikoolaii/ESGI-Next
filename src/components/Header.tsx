import Link from "next/link";

interface HeaderProps {
  active?: "home" | "compare";
}

export function Header({ active = "home" }: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            🌤️
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight text-white group-hover:text-sky-300 transition-colors">
              MétéoScope
            </p>
            <p className="text-xs text-slate-400 hidden sm:block">
              Prévisions & favoris
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active === "home"
                ? "bg-sky-500/20 text-sky-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Accueil
          </Link>
          <Link
            href="/comparer"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active === "compare"
                ? "bg-sky-500/20 text-sky-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Comparer
          </Link>
        </nav>
      </div>
    </header>
  );
}
