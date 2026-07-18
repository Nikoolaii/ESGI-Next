import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";
import { WeatherCurrent } from "@/components/WeatherCurrent";
import { WeatherForecast } from "@/components/WeatherForecast";
import { AirQualityCard } from "@/components/AirQualityCard";
import { CityMap } from "@/components/CityMap";
import { parseCityCoords } from "@/lib/slug";
import { fetchWeather } from "@/lib/api/weather";
import { fetchAirQuality } from "@/lib/api/air-quality";
import type { CityLocation } from "@/lib/types";

interface CityPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ nom?: string; pays?: string; region?: string }>;
}

export default async function CityPage({ params, searchParams }: CityPageProps) {
  const { slug } = await params;
  const { nom, pays, region } = await searchParams;

  const coords = parseCityCoords(slug);
  if (!coords || !nom) {
    notFound();
  }

  const city: CityLocation = {
    name: nom,
    latitude: coords.lat,
    longitude: coords.lng,
    country: pays,
    admin1: region,
  };

  const [weather, airQuality] = await Promise.all([
    fetchWeather(coords.lat, coords.lng),
    fetchAirQuality(coords.lat, coords.lng),
  ]);

  return (
    <>
      <Header active="home" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-sky-300 transition"
            >
              ← Retour à l&apos;accueil
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {city.name}
            </h1>
            <p className="mt-1 text-slate-400">
              {[city.admin1, city.country].filter(Boolean).join(", ")}
            </p>
          </div>
          <FavoriteButton city={city} />
        </div>

        <div className="space-y-8">
          <WeatherCurrent weather={weather.current} />
          <WeatherForecast daily={weather.daily} timezone={weather.timezone} />
          {airQuality && <AirQualityCard data={airQuality} />}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Localisation</h2>
            <CityMap
              latitude={coords.lat}
              longitude={coords.lng}
              name={city.name}
            />
          </section>
        </div>
      </main>
    </>
  );
}
