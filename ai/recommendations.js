
/**
 * 🧠 AI RECOMMENDATIONS
 * ai/recommendations.js
 * FINAL BOSS PASIEKA
 */

export function generateRecommendations(data = {}) {

  const recommendations = [];

  const swarmRisk = data.swarmRisk || 0;
  const honeyScore = data.honeyScore || 0;
  const hiveScore = data.hiveScore || 0;

  /* =========================
     🐝 ROJKA
  ========================= */

  if (swarmRisk >= 80) {
    recommendations.push(
      "🚨 Natychmiast sprawdź mateczniki rojowe."
    );

    recommendations.push(
      "🐝 Rozważ wykonanie odkładu."
    );
  }
  else if (swarmRisk >= 60) {

    recommendations.push(
      "⚠️ Zaplanuj przegląd rodziny w ciągu 48h."
    );
  }

  /* =========================
     🍯 MIÓD
  ========================= */

  if (honeyScore >= 80) {

    recommendations.push(
      "🍯 Warunki pożytkowe są bardzo dobre."
    );

    recommendations.push(
      "📦 Przygotuj nadstawki."
    );
  }
  else if (honeyScore < 40) {

    recommendations.push(
      "🌧 Słabe warunki pożytkowe."
    );
  }

  /* =========================
     🐝 SIŁA RODZINY
  ========================= */

  if (hiveScore < 40) {

    recommendations.push(
      "⚠️ Rodzina wymaga pilnej kontroli."
    );
  }
  else if (hiveScore >= 80) {

    recommendations.push(
      "🟢 Rodzina bardzo silna."
    );
  }

  /* =========================
     📭 BRAK ALERTÓW
  ========================= */

  if (!recommendations.length) {

    recommendations.push(
      "✅ Brak pilnych zaleceń."
    );
  }

  return recommendations;
}

/* =========================
   🧠 DECYZJA DNIA
========================= */

export function getDailyDecision(data = {}) {

  const swarmRisk = data.swarmRisk || 0;
  const weatherRisk = data.weatherRisk || 0;

  if (swarmRisk >= 80) {
    return "🚨 KONTROLA ROJKOWA";
  }

  if (weatherRisk >= 80) {
    return "⛔ NIE OTWIERAJ ULI";
  }

  if (swarmRisk >= 60) {
    return "⚠️ WYKONAJ PRZEGLĄD";
  }

  return "✅ STANDARDOWE PRACE";
}
```
