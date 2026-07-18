"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { buildCityPath } from "@/lib/slug";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { FavoriteButton } from "@/components/FavoriteButton";

export function FavoritesList() {
  const { favorites, loaded, removeFavorite } = useFavorites();

  if (!loaded) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-white">Mes favoris</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Mes favoris
            {favorites.length > 0 && (
              <span className="ml-2 rounded-full bg-amber-400/20 px-2 py-0.5 text-xs font-normal text-amber-300">
                {favorites.length}
              </span>
            )}
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <p className="text-sm text-slate-400">
            Aucun favori pour le moment. Ajoutez des villes depuis la recherche
            ou une page de détail avec l&apos;étoile ☆.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {favorites.map((city) => (
              <li
                key={`${city.latitude}-${city.longitude}`}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition hover:border-sky-400/20"
              >
                <Link
                  href={buildCityPath(city)}
                  className="min-w-0 flex-1 group"
                >
                  <p className="truncate font-medium text-white group-hover:text-sky-300 transition-colors">
                    {city.name}
                  </p>
                  <p className="truncate text-sm text-slate-400">
                    {[city.admin1, city.country].filter(Boolean).join(", ")}
                  </p>
                </Link>
                <div className="ml-3 flex items-center gap-2">
                  <FavoriteButton city={city} size="sm" />
                  <button
                    type="button"
                    onClick={() => removeFavorite(city)}
                    aria-label={`Supprimer ${city.name} des favoris`}
                    className="rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
