import type { AirQualityData } from "@/lib/types";
import { getAqiLabel } from "@/lib/weather-codes";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

interface AirQualityCardProps {
  data: AirQualityData;
}

export function AirQualityCard({ data }: AirQualityCardProps) {
  const aqiInfo = getAqiLabel(data.europeanAqi);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Qualité de l&apos;air
          </h2>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
            Fonctionnalité originale
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="text-center sm:min-w-[120px]">
            <p className={`text-4xl font-bold ${aqiInfo.color}`}>
              {Math.round(data.europeanAqi)}
            </p>
            <p className={`mt-1 text-sm font-medium ${aqiInfo.color}`}>
              {aqiInfo.label}
            </p>
            <p className="text-xs text-slate-500 mt-1">Indice européen AQI</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
            <Pollutant label="PM2.5" value={data.pm25} unit="µg/m³" />
            <Pollutant label="PM10" value={data.pm10} unit="µg/m³" />
            <Pollutant label="O₃" value={data.ozone} unit="µg/m³" />
            <Pollutant label="NO₂" value={data.nitrogenDioxide} unit="µg/m³" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Pollutant({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">
        {value?.toFixed(1) ?? "—"}
        <span className="ml-1 text-xs font-normal text-slate-500">{unit}</span>
      </p>
    </div>
  );
}
