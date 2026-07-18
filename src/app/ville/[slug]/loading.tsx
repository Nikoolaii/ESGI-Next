import { WeatherSkeleton } from "@/components/LoadingSkeleton";
import { Header } from "@/components/Header";

export default function CityLoading() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="mb-8 h-10 w-48 animate-pulse rounded-lg bg-white/5" />
        <WeatherSkeleton />
      </main>
    </>
  );
}
