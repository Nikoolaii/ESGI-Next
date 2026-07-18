import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <span className="text-5xl" aria-hidden>
          🌫️
        </span>
        <h1 className="mt-4 text-2xl font-bold text-white">Page introuvable</h1>
        <p className="mt-2 max-w-md text-slate-400">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-400"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
    </>
  );
}
