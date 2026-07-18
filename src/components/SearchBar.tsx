"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GeocodingResult } from "@/lib/types";
import { buildCityPath } from "@/lib/slug";
import { useSearchHistory } from "@/hooks/useSearchHistory";

interface SearchBarProps {
  onSelect?: (city: GeocodingResult) => void;
  placeholder?: string;
}

export function SearchBar({
  onSelect,
  placeholder = "Rechercher une ville...",
}: SearchBarProps) {
  const router = useRouter();
  const { addToHistory } = useSearchHistory();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectCity = useCallback(
    (city: GeocodingResult) => {
      const location = {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        country: city.country,
        admin1: city.admin1,
      };
      addToHistory(location);
      setQuery("");
      setResults([]);
      setOpen(false);
      if (onSelect) {
        onSelect(city);
      } else {
        router.push(buildCityPath(location));
      }
    },
    [addToHistory, onSelect, router]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      debounceRef.current = setTimeout(() => {
        setResults([]);
        setLoading(false);
      }, 0);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/geocoding?q=${encodeURIComponent(query.trim())}`
        );
        const data = (await response.json()) as GeocodingResult[];
        setResults(Array.isArray(data) ? data : []);
        setOpen(true);
        setActiveIndex(-1);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!open || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      selectCity(results[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Rechercher une ville"
          aria-autocomplete="list"
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none ring-sky-400/50 transition focus:border-sky-400/50 focus:ring-2"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            ...
          </span>
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
        >
          {results.map((city, index) => (
            <li key={city.id} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                onClick={() => selectCity(city)}
                className={`flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-sky-500/10 ${
                  index === activeIndex ? "bg-sky-500/15" : ""
                }`}
              >
                <div>
                  <p className="font-medium text-white">{city.name}</p>
                  <p className="text-sm text-slate-400">
                    {[city.admin1, city.country].filter(Boolean).join(", ")}
                  </p>
                </div>
                <span className="text-xs text-slate-500">
                  {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && !loading && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-400 shadow-2xl">
          Aucune ville trouvée pour « {query} »
        </div>
      )}
    </div>
  );
}
