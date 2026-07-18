"use client";

import type { CityLocation } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  city: CityLocation;
  size?: "sm" | "md";
}

export function FavoriteButton({ city, size = "md" }: FavoriteButtonProps) {
  const { loaded, isFavorite, toggleFavorite } = useFavorites();
  const active = loaded && isFavorite(city);

  const sizeClasses = size === "sm" ? "h-8 w-8 text-base" : "h-10 w-10 text-lg";

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(city)}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`inline-flex items-center justify-center rounded-full border transition-all ${sizeClasses} ${
        active
          ? "border-amber-400/50 bg-amber-400/20 text-amber-300 hover:bg-amber-400/30"
          : "border-white/10 bg-white/5 text-slate-400 hover:border-amber-400/30 hover:text-amber-300"
      }`}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
