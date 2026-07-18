"use client";

import { useEffect, useState } from "react";
import type { CityLocation, WeatherData } from "@/lib/types";
import { getWeatherInfo, getWindDirection } from "@/lib/weather-codes";

export function CityWeatherDisplay({ city }: { city: CityLocation }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/weather?lat=${city.latitude}&lng=${city.longitude}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setWeather(data as WeatherData);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [city.latitude, city.longitude]);

  if (loading) {
    return <p className="text-sm text-slate-400">Chargement...</p>;
  }

  if (error || !weather) {
    return <p className="text-sm text-red-400">Données indisponibles</p>;
  }

  return <CompareWeatherDetails weather={weather} />;
}

function CompareWeatherDetails({ weather }: { weather: WeatherData }) {
  const info = getWeatherInfo(weather.current.weatherCode);
  const today = weather.daily[0];
  const todayInfo = today ? getWeatherInfo(today.weatherCode) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-5xl">{info.icon}</span>
        <div>
          <p className="text-4xl font-bold text-white">
            {Math.round(weather.current.temperature)}°
          </p>
          <p className="text-slate-300">{info.label}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <CompareStat
          label="Ressenti"
          value={`${Math.round(weather.current.apparentTemperature)}°`}
        />
        <CompareStat label="Humidité" value={`${weather.current.humidity}%`} />
        <CompareStat
          label="Vent"
          value={`${Math.round(weather.current.windSpeed)} km/h ${getWindDirection(weather.current.windDirection)}`}
        />
        <CompareStat label="UV" value={weather.current.uvIndex.toFixed(1)} />
        {today && (
          <>
            <CompareStat label="Max" value={`${Math.round(today.tempMax)}°`} />
            <CompareStat label="Min" value={`${Math.round(today.tempMin)}°`} />
          </>
        )}
      </dl>
      {todayInfo && today && (
        <p className="text-xs text-slate-500">
          Aujourd&apos;hui : {todayInfo.icon} {todayInfo.label} · Pluie{" "}
          {today.precipitationProbability}%
        </p>
      )}
    </div>
  );
}

function CompareStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2">
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="font-medium text-white">{value}</dd>
    </div>
  );
}

export function TemperatureDiff({
  cityA,
  cityB,
}: {
  cityA: CityLocation;
  cityB: CityLocation;
}) {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(`/api/weather?lat=${cityA.latitude}&lng=${cityA.longitude}`).then(
        (r) => r.json()
      ),
      fetch(`/api/weather?lat=${cityB.latitude}&lng=${cityB.longitude}`).then(
        (r) => r.json()
      ),
    ]).then(([wa, wb]) => {
      if (cancelled) return;
      const tempA = (wa as WeatherData).current.temperature;
      const tempB = (wb as WeatherData).current.temperature;
      setDiff(Math.round(tempA - tempB));
    });

    return () => {
      cancelled = true;
    };
  }, [cityA, cityB]);

  if (diff === null) return null;

  const warmer = diff > 0 ? cityA.name : diff < 0 ? cityB.name : null;

  return (
    <p className="text-center text-slate-300">
      {diff === 0 ? (
        <>Les deux villes ont la même température actuelle.</>
      ) : (
        <>
          <span className="font-semibold text-sky-300">{warmer}</span> est plus
          chaude de{" "}
          <span className="font-bold text-white">{Math.abs(diff)}°</span> par
          rapport à l&apos;autre ville.
        </>
      )}
    </p>
  );
}
