import { NextResponse } from "next/server";
import { fetchWeather } from "@/lib/api/weather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return NextResponse.json(
      { error: "Coordonnées invalides" },
      { status: 400 }
    );
  }

  try {
    const weather = await fetchWeather(lat, lng);
    return NextResponse.json(weather);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la récupération météo" },
      { status: 500 }
    );
  }
}
