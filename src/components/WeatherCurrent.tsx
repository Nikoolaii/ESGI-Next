import type { CurrentWeather } from "@/lib/types";
import { getWeatherInfo, getWindDirection } from "@/lib/weather-codes";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

interface WeatherCurrentProps {
  weather: CurrentWeather;
}

function StatItem({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit?: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">
        {value}
        {unit && (
          <span className="ml-1 text-sm font-normal text-slate-400">{unit}</span>
        )}
      </p>
    </div>
  );
}

export function WeatherCurrent({ weather }: WeatherCurrentProps) {
  const info = getWeatherInfo(weather.weatherCode);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-white">Conditions actuelles</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center text-center sm:min-w-[160px]">
            <span className="text-6xl" aria-hidden>
              {info.icon}
            </span>
            <p className="mt-2 text-5xl font-bold text-white">
              {Math.round(weather.temperature)}°
            </p>
            <p className="mt-1 text-slate-300">{info.label}</p>
            <p className="text-sm text-slate-400">
              Ressenti {Math.round(weather.apparentTemperature)}°
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
            <StatItem label="Humidité" value={weather.humidity} unit="%" />
            <StatItem
              label="Pression"
              value={Math.round(weather.pressure)}
              unit="hPa"
            />
            <StatItem
              label="Vent"
              value={Math.round(weather.windSpeed)}
              unit="km/h"
            />
            <StatItem
              label="Direction"
              value={getWindDirection(weather.windDirection)}
            />
            <StatItem
              label="Indice UV"
              value={weather.uvIndex.toFixed(1)}
            />
            <StatItem
              label="Période"
              value={weather.isDay ? "Jour" : "Nuit"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
