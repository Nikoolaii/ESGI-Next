import { NextResponse } from "next/server";
import { searchCities } from "@/lib/api/geocoding";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const results = await searchCities(query);
    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
