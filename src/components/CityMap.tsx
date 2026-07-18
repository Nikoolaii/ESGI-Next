interface CityMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

export function CityMap({ latitude, longitude, name }: CityMapProps) {
  const delta = 0.15;
  const bbox = [
    longitude - delta,
    latitude - delta,
    longitude + delta,
    latitude + delta,
  ].join("%2C");

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <iframe
        title={`Carte de ${name}`}
        src={embedUrl}
        className="h-64 w-full border-0 sm:h-80"
        loading="lazy"
      />
      <div className="border-t border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
        📍 {latitude.toFixed(4)}°, {longitude.toFixed(4)}° — OpenStreetMap
      </div>
    </div>
  );
}
