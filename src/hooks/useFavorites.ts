"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { CityLocation, FavoriteCity } from "@/lib/types";
import { cityLocationKey } from "@/lib/slug";
import { createLocalStorageStore } from "@/lib/local-storage-store";

const favoritesStore = createLocalStorageStore<FavoriteCity>(
  "meteo-favoris",
  "meteo-favoris-updated"
);

export function useFavorites() {
  const favorites = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot
  );

  const persist = useCallback((next: FavoriteCity[]) => {
    favoritesStore.write(next);
  }, []);

  const isFavorite = useCallback(
    (city: CityLocation) =>
      favorites.some((f) => cityLocationKey(f) === cityLocationKey(city)),
    [favorites]
  );

  const addFavorite = useCallback(
    (city: CityLocation) => {
      if (isFavorite(city)) return;
      persist([...favorites, { ...city, addedAt: Date.now() }]);
    },
    [favorites, isFavorite, persist]
  );

  const removeFavorite = useCallback(
    (city: CityLocation) => {
      persist(
        favorites.filter((f) => cityLocationKey(f) !== cityLocationKey(city))
      );
    },
    [favorites, persist]
  );

  const toggleFavorite = useCallback(
    (city: CityLocation) => {
      if (isFavorite(city)) removeFavorite(city);
      else addFavorite(city);
    },
    [addFavorite, isFavorite, removeFavorite]
  );

  return {
    favorites,
    loaded: true,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
