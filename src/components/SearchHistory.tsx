"use client";

import Link from "next/link";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { buildCityPath } from "@/lib/slug";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export function SearchHistory() {
  const { history, loaded, clearHistory } = useSearchHistory();

  if (!loaded || history.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Historique des recherches
          </h2>
          <button
            type="button"
            onClick={clearHistory}
            className="text-xs text-slate-400 hover:text-red-400 transition"
          >
            Effacer
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-wrap gap-2">
          {history.map((entry) => (
            <li key={`${entry.latitude}-${entry.longitude}-${entry.searchedAt}`}>
              <Link
                href={buildCityPath(entry)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400/30 hover:text-sky-300"
              >
                <span>🕐</span>
                {entry.name}
                {entry.country && (
                  <span className="text-slate-500">({entry.country})</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
