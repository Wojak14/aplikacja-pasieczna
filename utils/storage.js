// storage.js

// Zapis danych
export function saveData(key, data) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(data)
    );

    return true;
  } catch (error) {
    console.error(
      "Błąd zapisu do localStorage:",
      error
    );

    return false;
  }
}

// Odczyt danych
export function loadData(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return defaultValue;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Błąd odczytu z localStorage:",
      error
    );

    return defaultValue;
  }
}

// Usuwanie danych
export function removeData(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(
      "Błąd usuwania danych:",
      error
    );

    return false;
  }
}

// Czy klucz istnieje
export function hasData(key) {
  return localStorage.getItem(key) !== null;
}

// Czyszczenie całej pamięci aplikacji
export function clearAllData() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(
      "Błąd czyszczenia localStorage:",
      error
    );

    return false;
  }
}

// Notatki kalendarza
export function saveNote(date, text) {
  const notes =
    loadData("calendarNotes", {});

  notes[date] = text;

  return saveData(
    "calendarNotes",
    notes
  );
}

export function getNote(date) {
  const notes =
    loadData("calendarNotes", {});

  return notes[date] || "";
}