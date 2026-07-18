"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";

export default function Error({
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
          ⚠️
        </span>
        <h1 className="mt-4 text-2xl font-bold text-white">
          Une erreur est survenue
        </h1>
        <p className="mt-2 max-w-md text-slate-400">
          Impossible de charger cette page. Veuillez réessayer.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-400"
        >
          Réessayer
        </button>
      </main>
    </>
  );
}
