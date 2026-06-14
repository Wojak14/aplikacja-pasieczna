// weather-utils.js

// Czy można otwierać ule
export function canOpenHive(weather) {
  if (!weather) return false;

  return (
    weather.temperature >= 15 &&
    weather.windSpeed <= 5 &&
    weather.precipitation === 0
  );
}

// Ocena warunków lotnych pszczół
export function getFlightCondition(weather) {
  if (!weather) return "Brak danych";

  const { temperature, windSpeed, precipitation } = weather;

  if (precipitation > 0) return "🌧️ Deszcz - brak lotów";

  if (temperature < 10)
    return "🥶 Za zimno na loty";

  if (windSpeed > 8)
    return "💨 Zbyt silny wiatr";

  if (temperature >= 18 && windSpeed <= 5)
    return "🐝 Idealne warunki lotne";

  return "⚠️ Warunki umiarkowane";
}

// Ryzyko rójki wg pogody
export function calculateWeatherSwarmRisk(weather) {
  if (!weather) return 0;

  let risk = 0;

  if (weather.temperature >= 20) risk += 25;
  if (weather.temperature >= 25) risk += 25;

  if (weather.windSpeed <= 4) risk += 20;

  if (weather.precipitation === 0) risk += 30;

  return Math.min(risk, 100);
}

// Krótki raport pogodowy dla AI
export function generateWeatherReport(weather) {
  if (!weather) {
    return "Brak danych pogodowych.";
  }

  const flight = getFlightCondition(weather);
  const swarmRisk = calculateWeatherSwarmRisk(weather);

  return `
🌡️ Temperatura: ${weather.temperature}°C
💨 Wiatr: ${weather.windSpeed} m/s
🌧️ Opady: ${weather.precipitation} mm
${flight}
🐝 Ryzyko rójki: ${swarmRisk}%
`.trim();
}