// nectar.js
// Model wydajności nektaru roślin miododajnych

export const NECTAR_DATA = [
  {
    plant: "Rzepak",
    nectarLevel: 5, // 1–5
    honeyYield: "wysoki",
  },
  {
    plant: "Akacja",
    nectarLevel: 5,
    honeyYield: "bardzo wysoki",
  },
  {
    plant: "Lipa",
    nectarLevel: 5,
    honeyYield: "bardzo wysoki",
  },
  {
    plant: "Facelia",
    nectarLevel: 4,
    honeyYield: "wysoki",
  },
  {
    plant: "Gryka",
    nectarLevel: 4,
    honeyYield: "wysoki",
  },
  {
    plant: "Wrzos",
    nectarLevel: 3,
    honeyYield: "średni",
  }
];

// Pobiera dane o nektarze dla rośliny
export function getNectarInfo(plantName) {
  return NECTAR_DATA.find(
    (p) => p.plant.toLowerCase() === plantName.toLowerCase()
  );
}

// Liczy „siłę pożytku” (prosty score dla AI pasieki)
export function calculateNectarScore(plantName, temperature = 20, humidity = 60) {
  const data = getNectarInfo(plantName);

  if (!data) return 0;

  let score = data.nectarLevel * 20;

  // wpływ temperatury (optymalnie 18–28°C)
  if (temperature >= 18 && temperature <= 28) {
    score += 20;
  }

  // wpływ wilgotności (optymalnie 50–70%)
  if (humidity >= 50 && humidity <= 70) {
    score += 10;
  }

  return Math.min(score, 100);
}

// Raport dla AI / UI
export function getNectarReport(plantName, temp, humidity) {
  const data = getNectarInfo(plantName);
  if (!data) return "Brak danych o roślinie.";

  const score = calculateNectarScore(plantName, temp, humidity);

  return `🍯 ${data.plant}
Poziom nektaru: ${data.honeyYield}
Ocena warunków: ${score}/100`;
}