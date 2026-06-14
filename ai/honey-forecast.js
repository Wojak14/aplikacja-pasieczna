
/**
 * 🍯 HONEY FORECAST AI
 * ai/honey-forecast.js
 * FINAL BOSS PASIEKA
 */

export function generateHoneyForecast(weather) {

  const forecast = weather?.forecast || [];

  if (!forecast.length) {
    return [];
  }

  return forecast.map((day) => {

    let score = 0;

    const temp = day.tempMax ?? 0;
    const rain = day.rain ?? 0;
    const wind = day.wind ?? 0;

    // 🌡 Temperatura

    if (temp >= 18) score += 20;
    if (temp >= 22) score += 20;
    if (temp >= 26) score += 10;

    // 💨 Wiatr

    if (wind < 15) score += 20;
    if (wind < 8) score += 10;

    // 🌧 Opady

    if (rain < 20) score += 20;
    if (rain > 50) score -= 30;

    score = Math.max(0, Math.min(100, score));

    let forecastText = "🔴 Słaby pożytek";

    if (score >= 80) {
      forecastText = "🍯 Bardzo dobry pożytek";
    }
    else if (score >= 60) {
      forecastText = "🟢 Dobry pożytek";
    }
    else if (score >= 40) {
      forecastText = "🟡 Średni pożytek";
    }

    return {
      date: day.name || "",
      score,
      forecast: forecastText
    };
  });
}

/* =========================
   🍯 PODSUMOWANIE
========================= */

export function getBestHoneyDay(forecast) {

  if (!forecast?.length) return null;

  return forecast.reduce((best, current) => {
    return current.score > best.score
      ? current
      : best;
  });
}
```
