// flowers.js
// Baza roślin miododajnych + okresy kwitnienia

export const FLOWERS = [
  {
    name: "Rzepak",
    startMonth: 4,
    endMonth: 5,
    nectar: "wysoki",
  },
  {
    name: "Akacja",
    startMonth: 5,
    endMonth: 6,
    nectar: "bardzo wysoki",
  },
  {
    name: "Lipa",
    startMonth: 6,
    endMonth: 7,
    nectar: "bardzo wysoki",
  },
  {
    name: "Facelia",
    startMonth: 5,
    endMonth: 8,
    nectar: "wysoki",
  },
  {
    name: "Gryka",
    startMonth: 7,
    endMonth: 8,
    nectar: "wysoki",
  },
  {
    name: "Wrzos",
    startMonth: 8,
    endMonth: 9,
    nectar: "średni",
  }
];

// Sprawdza, co kwitnie w danym miesiącu
export function getBloomingFlowers(month) {
  return FLOWERS.filter(
    (f) => month >= f.startMonth && month <= f.endMonth
  );
}

// Tekstowy raport dla UI (np. assistant / kalendarz)
export function getFlowerReport(month) {
  const blooming = getBloomingFlowers(month);

  if (blooming.length === 0) {
    return "Brak głównych pożytków w tym okresie.";
  }

  return blooming
    .map((f) => `🌸 ${f.name} (${f.nectar})`)
    .join("\n");
}