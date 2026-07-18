import type { DailyForecast } from "@/lib/types";
import { getWeatherInfo } from "@/lib/weather-codes";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

interface WeatherForecastProps {
  daily: DailyForecast[];
  timezone: string;
}

function formatDay(dateStr: string, timezone: string, index: number): string {
  if (index === 0) return "Aujourd'hui";
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: timezone,
  });
}

function formatTime(isoStr: string, timezone: string): string {
  const date = new Date(isoStr);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
}

export function WeatherForecast({ daily, timezone }: WeatherForecastProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-white">
          Prévisions sur 7 jours
        </h2>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {daily.map((day, index) => {
            const info = getWeatherInfo(day.weatherCode);
            return (
              <div
                key={day.date}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 sm:grid-cols-[140px_1fr_auto_auto_auto]"
              >
                <p className="font-medium capitalize text-white">
                  {formatDay(day.date, timezone, index)}
                </p>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <span className="text-2xl" aria-hidden>
                    {info.icon}
                  </span>
                  <span className="text-sm text-slate-400 hidden sm:inline">
                    {info.label}
                  </span>
                </div>
                <div className="text-right text-sm text-slate-400 hidden md:block">
                  <span title="Lever du soleil">🌅 {formatTime(day.sunrise, timezone)}</span>
                  <span className="mx-2">·</span>
                  <span title="Coucher du soleil">🌇 {formatTime(day.sunset, timezone)}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-white">
                    {Math.round(day.tempMax)}°
                  </span>
                  <span className="mx-1 text-slate-500">/</span>
                  <span className="text-slate-400">
                    {Math.round(day.tempMin)}°
                  </span>
                </div>
                <div className="text-right text-xs text-sky-400 hidden sm:block">
                  💧 {day.precipitationProbability}%
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
