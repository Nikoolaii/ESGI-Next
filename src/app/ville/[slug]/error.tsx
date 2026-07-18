"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function CityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <span className="text-5xl" aria-hidden>
          🌩️
        </span>
        <h1 className="mt-4 text-2xl font-bold text-white">
          Météo indisponible
        </h1>
        <p className="mt-2 max-w-md text-slate-400">
          Impossible de charger les données météo pour cette ville.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-400"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-300 transition hover:bg-white/5"
          >
            Accueil
          </Link>
        </div>
      </main>
    </>
  );
}
