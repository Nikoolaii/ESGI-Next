import type { AirQualityData } from "../types";

interface AirQualityApiResponse {
  current: {
    european_aqi: number;
    pm10: number;
    pm2_5: number;
    ozone: number;
    nitrogen_dioxide: number;
  };
}

export async function fetchAirQuality(
  latitude: number,
  longitude: number
): Promise<AirQualityData | null> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: "european_aqi,pm10,pm2_5,ozone,nitrogen_dioxide",
  });

  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) return null;

  const data = (await response.json()) as AirQualityApiResponse;

  if (data.current.european_aqi == null) return null;

  return {
    europeanAqi: data.current.european_aqi,
    pm10: data.current.pm10,
    pm25: data.current.pm2_5,
    ozone: data.current.ozone,
    nitrogenDioxide: data.current.nitrogen_dioxide,
  };
}
