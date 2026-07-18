"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { buildCityPath, cityLocationKey } from "@/lib/slug";
import type { CurrentWeather, FavoriteCity } from "@/lib/types";
import { getWeatherInfo } from "@/lib/weather-codes";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

function FavoriteWeatherCard({ city }: { city: FavoriteCity }) {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/weather?lat=${city.latitude}&lng=${city.longitude}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setWeather((data as { current: CurrentWeather }).current);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [city.latitude, city.longitude]);

  const info = weather ? getWeatherInfo(weather.weatherCode) : null;

  return (
    <li>
      <Link
        href={buildCityPath(city)}
        className="block rounded-xl border border-white/5 bg-white/5 p-4 transition hover:border-sky-400/30 hover:bg-sky-500/5"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-white">{city.name}</p>
            <p className="text-xs text-slate-400">{city.country}</p>
          </div>
          {info && weather && (
            <div className="text-right">
              <span className="text-2xl">{info.icon}</span>
              <p className="text-xl font-bold text-white">
                {Math.round(weather.temperature)}°
              </p>
            </div>
          )}
          {error && <p className="text-xs text-red-400">Indisponible</p>}
          {!weather && !error && (
            <p className="text-xs text-slate-500">...</p>
          )}
        </div>
        {info && <p className="mt-2 text-sm text-slate-400">{info.label}</p>}
      </Link>
    </li>
  );
}

export function FavoritesWeather() {
  const { favorites, loaded } = useFavorites();

  if (!loaded || favorites.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-white">
          Météo de vos favoris
        </h2>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((city) => (
            <FavoriteWeatherCard
              key={cityLocationKey(city)}
              city={city}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
