export interface WeatherInfo {
  label: string;
  icon: string;
}

const WEATHER_CODES: Record<number, WeatherInfo> = {
  0: { label: "Ciel dégagé", icon: "☀️" },
  1: { label: "Principalement dégagé", icon: "🌤️" },
  2: { label: "Partiellement nuageux", icon: "⛅" },
  3: { label: "Couvert", icon: "☁️" },
  45: { label: "Brouillard", icon: "🌫️" },
  48: { label: "Brouillard givrant", icon: "🌫️" },
  51: { label: "Bruine légère", icon: "🌦️" },
  53: { label: "Bruine modérée", icon: "🌦️" },
  55: { label: "Bruine dense", icon: "🌧️" },
  61: { label: "Pluie légère", icon: "🌧️" },
  63: { label: "Pluie modérée", icon: "🌧️" },
  65: { label: "Pluie forte", icon: "🌧️" },
  71: { label: "Neige légère", icon: "🌨️" },
  73: { label: "Neige modérée", icon: "🌨️" },
  75: { label: "Neige forte", icon: "❄️" },
  77: { label: "Grains de neige", icon: "🌨️" },
  80: { label: "Averses légères", icon: "🌦️" },
  81: { label: "Averses modérées", icon: "🌧️" },
  82: { label: "Averses violentes", icon: "⛈️" },
  85: { label: "Averses de neige légères", icon: "🌨️" },
  86: { label: "Averses de neige fortes", icon: "❄️" },
  95: { label: "Orage", icon: "⛈️" },
  96: { label: "Orage avec grêle légère", icon: "⛈️" },
  99: { label: "Orage avec grêle forte", icon: "⛈️" },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER_CODES[code] ?? { label: "Conditions inconnues", icon: "🌡️" };
}

export function getWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function getAqiLabel(aqi: number): { label: string; color: string } {
  if (aqi <= 20) return { label: "Bon", color: "text-emerald-400" };
  if (aqi <= 40) return { label: "Correct", color: "text-lime-400" };
  if (aqi <= 60) return { label: "Modéré", color: "text-yellow-400" };
  if (aqi <= 80) return { label: "Mauvais", color: "text-orange-400" };
  if (aqi <= 100) return { label: "Très mauvais", color: "text-red-400" };
  return { label: "Extrêmement mauvais", color: "text-purple-400" };
}
