/**
 * 🧠 AI ENGINE v1
 * SMART CALENDAR PRO
 * FINAL BOSS MODULE
 */

/* =========================
   🧠 MAIN AI ANALYSIS
========================= */

export function analyzeDay(event, dateKey, weather = null) {

  const month = new Date(dateKey).getMonth() + 1;

  let risk = 10;
  let decision = "OK";

  const text = (event?.text || "").toLowerCase();

  /* =========================
     🐝 EVENT LOGIC
  ========================= */

  if (event?.type === "miodobranie" || text.includes("miód")) {
    risk += 30;
    decision = "🍯 MIODOBRANIE OK";
  }

  if (event?.type === "leczenie" || text.includes("leczenie")) {
    risk += 40;
    decision = "💊 NIE OTWIERAJ ULA";
  }

  if (event?.type === "rojka" || text.includes("rój")) {
    risk += 60;
    decision = "🐝 WYSOKIE RYZYKO ROJENIA";
  }

  /* =========================
     🌦 SEZON
  ========================= */

  if (month >= 7 && month <= 8) {
    risk += 15;
  }

  /* =========================
     🌦 WEATHER LOGIC
  ========================= */

  if (weather) {

    if (weather.temp < 10) {
      risk += 35;
      decision = "🥶 ZA ZIMNO — NIE PRACUJ";
    }

    if (weather.temp >= 10 && weather.temp < 15) {
      risk += 10;
    }

    if (weather.temp > 30) {
      risk += 25;
      decision = "🥵 UPAŁ — KRÓTKA INSPEKCJA";
    }

    if (weather.wind > 25) {
      risk += 30;
      decision = "💨 ZA DUŻY WIATR — NIE PRACUJ";
    }

    if (weather.rain > 50) {
      risk += 20;
      decision = "🌧 DESZCZ — ODPUŚĆ PRACE";
    }
  }

  /* =========================
     ⚠️ FINAL DECISION
  ========================= */

  if (risk >= 80) {
    decision = "🚨 ZAKAZ PRAC W PASIECE";
  }

  if (risk >= 60 && risk < 80) {
    decision = "⚠️ OSTROŻNOŚĆ";
  }

  return {
    risk: Math.min(risk, 100),
    decision
  };
}

/* =========================
   🧠 SIMPLE BEE STATUS
========================= */

export function getBeeStatus(risk) {

  if (risk >= 80) return "🔴 NIEBEZPIECZNE";
  if (risk >= 60) return "🟠 ŚREDNIE RYZYKO";
  if (risk >= 30) return "🟡 OK WARUNKI";
  return "🟢 IDEALNE";
}

/* =========================
   🐝 WORK ADVISOR
========================= */

export function getBeeWorkAdvice(weather) {

  if (!weather) return "❓ BRAK DANYCH";

  if (weather.temp < 12) return "❄️ ZA ZIMNO — NIE OTWIERAJ ULA";

  if (weather.wind > 20) return "💨 SILNY WIATR — TYLKO SZYBKIE PRACE";

  if (weather.rain > 40) return "🌧 DESZCZ — ODPUŚĆ PRACE";

  if (weather.temp >= 18 && weather.temp <= 28) {
    return "🐝 IDEALNY DZIEŃ NA PRZEGLĄD";
  }

  return "⚠️ WARUNKI ŚREDNIE";
}
```
