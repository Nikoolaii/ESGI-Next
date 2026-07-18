import type { CityLocation } from "./types";

export function buildCityPath(city: CityLocation): string {
  const coords = `${city.latitude.toFixed(4)}_${city.longitude.toFixed(4)}`;
  const params = new URLSearchParams({ nom: city.name });
  if (city.country) params.set("pays", city.country);
  if (city.admin1) params.set("region", city.admin1);
  return `/ville/${coords}?${params.toString()}`;
}

export function parseCityCoords(slug: string): { lat: number; lng: number } | null {
  const parts = slug.split("_");
  if (parts.length !== 2) return null;
  const lat = Number(parts[0]);
  const lng = Number(parts[1]);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  return { lat, lng };
}

export function cityLocationKey(city: CityLocation): string {
  return `${city.latitude.toFixed(4)}_${city.longitude.toFixed(4)}`;
}
