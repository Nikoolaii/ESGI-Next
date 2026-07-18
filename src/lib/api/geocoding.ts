import type { GeocodingResult } from "../types";

interface GeocodingApiResponse {
  results?: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    country_code?: string;
    admin1?: string;
    timezone?: string;
  }>;
}

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (!query.trim() || query.trim().length < 2) return [];

  const params = new URLSearchParams({
    name: query.trim(),
    count: "8",
    language: "fr",
    format: "json",
  });

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("Impossible de rechercher des villes");
  }

  const data = (await response.json()) as GeocodingApiResponse;
  return (data.results ?? []).map((result) => ({
    id: result.id,
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    country_code: result.country_code,
    admin1: result.admin1,
    timezone: result.timezone,
  }));
}
