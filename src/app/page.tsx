import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { FavoritesList } from "@/components/FavoritesList";
import { FavoritesWeather } from "@/components/FavoritesWeather";
import { SearchHistory } from "@/components/SearchHistory";

export default function HomePage() {
  return (
    <>
      <Header active="home" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Consultez la météo partout
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Recherchez une ville, consultez les prévisions sur 7 jours et
            gardez vos destinations favorites à portée de main.
          </p>
        </section>

        <section className="mb-12">
          <SearchBar />
        </section>

        <div className="space-y-8">
          <FavoritesWeather />
          <FavoritesList />
          <SearchHistory />
        </div>
      </main>
    </>
  );
}
