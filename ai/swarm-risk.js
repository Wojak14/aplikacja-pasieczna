/**

* 🐝 SWARM RISK AI
* ai/swarm-risk.js
* FINAL BOSS PASIEKA
  */

/* =========================
🐝 OBLICZ RYZYKO ROJENIA
========================= */

export function calculateSwarmRisk(notes = "", weather = null) {

const text = notes.toLowerCase();

let risk = 10;

/* =========================
📒 NOTATKI
========================= */

if (text.includes("matecznik")) risk += 35;

if (text.includes("rój")) risk += 30;

if (text.includes("rojka")) risk += 30;

if (text.includes("ciasno")) risk += 20;

if (text.includes("brak miejsca")) risk += 20;

if (text.includes("dużo pszczół")) risk += 15;

if (text.includes("silna rodzina")) risk += 15;

if (text.includes("nadstawka")) risk -= 10;

if (text.includes("wymiana matki")) risk -= 15;

/* =========================
🌦 POGODA
========================= */

if (weather) {

```
if (weather.temp >= 18) risk += 10;

if (weather.temp >= 22) risk += 10;

if (weather.temp >= 25) risk += 10;

if (weather.wind > 25) risk -= 10;

if (weather.rain > 50) risk -= 15;
```

}

return Math.max(0, Math.min(risk, 100));
}

/* =========================
🐝 STATUS RYZYKA
========================= */

export function getSwarmStatus(risk) {

if (risk >= 80) {
return {
color: "red",
text: "🚨 BARDZO WYSOKIE RYZYKO ROJKI"
};
}

if (risk >= 60) {
return {
color: "orange",
text: "⚠️ WYSOKIE RYZYKO ROJKI"
};
}

if (risk >= 40) {
return {
color: "yellow",
text: "🟡 ŚREDNIE RYZYKO"
};
}

return {
color: "green",
text: "🟢 NISKIE RYZYKO"
};
}

/* =========================
🧠 REKOMENDACJA AI
========================= */

export function getSwarmRecommendation(risk) {

if (risk >= 80) {
return "🚨 Natychmiast sprawdź mateczniki i wykonaj odkład.";
}

if (risk >= 60) {
return "🐝 Zaplanuj przegląd w ciągu 1–2 dni.";
}

if (risk >= 40) {
return "📋 Monitoruj rozwój rodziny.";
}

return "✅ Brak oznak nastroju rojowego.";
}
