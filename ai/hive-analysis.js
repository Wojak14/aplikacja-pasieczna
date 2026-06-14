
/**
 * 🐝 HIVE ANALYSIS AI
 * ai/hive-analysis.js
 * FINAL BOSS PASIEKA
 */

/* =========================
   🐝 ANALIZA RODZINY
========================= */

export function analyzeHive(hive) {

  let score = 50;
  let alerts = [];

  const bees = Number(hive?.bees || 0);
  const brood = Number(hive?.brood || 0);
  const honey = Number(hive?.honey || 0);

  // 👑 Matka

  if (hive?.queen === true) {
    score += 20;
  } else {
    score -= 40;
    alerts.push("👑 Brak matki");
  }

  // 🐣 Czerw

  if (brood > 5) {
    score += 15;
  } else {
    alerts.push("🐣 Mało czerwiu");
  }

  // 🐝 Siła rodziny

  if (bees > 8) {
    score += 15;
  } else {
    alerts.push("🐝 Słaba rodzina");
  }

  // 🍯 Zapasy

  if (honey > 10) {
    score += 10;
  } else {
    alerts.push("🍯 Niskie zapasy");
  }

  score = Math.max(0, Math.min(score, 100));

  let status = "🔴 Krytyczny";

  if (score >= 80) {
    status = "🟢 Bardzo silna rodzina";
  }
  else if (score >= 60) {
    status = "🟡 Stabilna rodzina";
  }
  else if (score >= 40) {
    status = "🟠 Wymaga uwagi";
  }

  return {
    score,
    status,
    alerts
  };
}

/* =========================
   🏆 RANKING ULI
========================= */

export function generateHiveRanking(hives = []) {

  return [...hives]
    .map(hive => ({
      ...hive,
      analysis: analyzeHive(hive)
    }))
    .sort(
      (a, b) =>
        b.analysis.score -
        a.analysis.score
    );
}

/* =========================
   🚨 ALERTY PASIECZNE
========================= */

export function generateHiveAlerts(hives = []) {

  const alerts = [];

  hives.forEach((hive) => {

    const result = analyzeHive(hive);

    if (result.score < 40) {
      alerts.push({
        hive: hive.name,
        text: `⚠️ Ul ${hive.name} wymaga pilnej kontroli`
      });
    }

  });

  return alerts;
}

/* =========================
   🍯 POTENCJAŁ MIODOWY
========================= */

export function estimateHoneyPotential(hive) {

  let potential = 0;

  potential += Number(hive?.bees || 0) * 2;
  potential += Number(hive?.brood || 0) * 1.5;
  potential += Number(hive?.honey || 0);

  return Math.round(potential);
}
```
