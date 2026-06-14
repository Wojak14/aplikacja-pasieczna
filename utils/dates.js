// dates.js

// Zwraca dzisiejszą datę w formacie DD.MM.RRRR
export function getTodayString() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
}

// Zwraca jutrzejszą datę w formacie DD.MM.RRRR
export function getTomorrowString() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const year = tomorrow.getFullYear();

  return `${day}.${month}.${year}`;
}

// Konwersja Date -> DD.MM.RRRR
export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

// Sprawdza czy data jest dzisiaj
export function isToday(dateString) {
  return dateString === getTodayString();
}

// Sprawdza czy data jest jutro
export function isTomorrow(dateString) {
  return dateString === getTomorrowString();
}

// Zamiana DD.MM.RRRR na obiekt Date
export function parseDate(dateString) {
  const [day, month, year] = dateString.split(".");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );
}

// Liczba dni między datami
export function daysUntil(dateString) {
  const target = parseDate(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diff = target - today;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}