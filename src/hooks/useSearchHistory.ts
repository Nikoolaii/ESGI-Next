"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { CityLocation, SearchHistoryEntry } from "@/lib/types";
import { cityLocationKey } from "@/lib/slug";
import { createLocalStorageStore } from "@/lib/local-storage-store";

const MAX_HISTORY = 8;

const historyStore = createLocalStorageStore<SearchHistoryEntry>(
  "meteo-historique",
  "meteo-historique-updated"
);

export function useSearchHistory() {
  const history = useSyncExternalStore(
    historyStore.subscribe,
    historyStore.getSnapshot,
    historyStore.getServerSnapshot
  );

  const addToHistory = useCallback((city: CityLocation) => {
    const key = cityLocationKey(city);
    const current = historyStore.getSnapshot();
    const filtered = current.filter((h) => cityLocationKey(h) !== key);
    const next: SearchHistoryEntry[] = [
      { ...city, searchedAt: Date.now() },
      ...filtered,
    ].slice(0, MAX_HISTORY);
    historyStore.write(next);
  }, []);

  const clearHistory = useCallback(() => {
    historyStore.remove();
  }, []);

  return { history, loaded: true, addToHistory, clearHistory };
}
