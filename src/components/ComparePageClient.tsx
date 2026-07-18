"use client";

import { useCallback, useState } from "react";
import type { CityLocation } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { SearchBar } from "@/components/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import {
  CityWeatherDisplay,
  TemperatureDiff,
} from "@/components/CompareWeather";

interface ComparePanelProps {
  label: string;
  city: CityLocation | null;
  onSelectFromFavorites: (city: CityLocation) => void;
  onClear: () => void;
}

function ComparePanel({
  label,
  city,
  onSelectFromFavorites,
  onClear,
}: ComparePanelProps) {
  const { favorites } = useFavorites();

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-white">{label}</h3>
            {city && (
              <p className="text-sm text-slate-400">
                {city.name}
                {city.country ? `, ${city.country}` : ""}
              </p>
            )}
          </div>
          {city && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-slate-500 hover:text-red-400 transition"
            >
              Effacer
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!city ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              Sélectionnez une ville ci-dessous ou choisissez un favori :
            </p>
            {favorites.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {favorites.map((fav) => (
                  <button
                    key={`${fav.latitude}-${fav.longitude}`}
                    type="button"
                    onClick={() => onSelectFromFavorites(fav)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 hover:border-sky-400/30 hover:text-sky-300 transition"
                  >
                    {fav.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <CityWeatherDisplay
            key={`${city.latitude}-${city.longitude}`}
            city={city}
          />
        )}
      </CardContent>
    </Card>
  );
}

export function ComparePageClient() {
  const [cityA, setCityA] = useState<CityLocation | null>(null);
  const [cityB, setCityB] = useState<CityLocation | null>(null);

  const handleSearchSelect = useCallback(
    (city: CityLocation) => {
      if (!cityA) setCityA(city);
      else if (!cityB) setCityB(city);
      else setCityA(city);
    },
    [cityA, cityB]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Comparer deux villes</h1>
        <p className="mt-2 text-slate-400">
          Fonctionnalité originale — comparez côte à côte les conditions
          météorologiques de deux destinations.
        </p>
      </div>

      <div className="max-w-xl">
        <p className="mb-2 text-sm text-slate-400">
          Rechercher une ville à comparer :
        </p>
        <SearchBar
          onSelect={(city) =>
            handleSearchSelect({
              name: city.name,
              latitude: city.latitude,
              longitude: city.longitude,
              country: city.country,
              admin1: city.admin1,
            })
          }
          placeholder="Ajouter une ville à comparer..."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ComparePanel
          label="Ville A"
          city={cityA}
          onSelectFromFavorites={setCityA}
          onClear={() => setCityA(null)}
        />
        <ComparePanel
          label="Ville B"
          city={cityB}
          onSelectFromFavorites={setCityB}
          onClear={() => setCityB(null)}
        />
      </div>

      {cityA && cityB && (
        <Card>
          <CardContent className="py-5">
            <TemperatureDiff cityA={cityA} cityB={cityB} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
