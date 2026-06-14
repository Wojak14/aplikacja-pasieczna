/**
 * 🐝 FINAL BOSS
 * ui.js
 */

export function initUI() {

  console.log("🎨 UI INIT");

  // Ukryj panel dnia przy starcie
  const dayPanel = document.getElementById("day-panel");

  if (dayPanel) {
    dayPanel.classList.add("hidden");
  }

  // Quick panel
  const quickButtons = document.querySelectorAll(
    "#quick-panel button[data-text]"
  );

  quickButtons.forEach(btn => {

    btn.addEventListener("click", () => {

      const text = btn.dataset.text;

      const notes =
        document.getElementById("day-notes") ||
        document.getElementById("notes");

      if (!notes) return;

      notes.value += ` ${text}`;
      notes.focus();
    });

  });

  // Wyszukiwarka notatek
  const searchInput =
    document.getElementById("search-notes");

  const searchResults =
    document.getElementById("search-results");

  if (searchInput && searchResults) {

    searchInput.addEventListener("input", () => {

      const query =
        searchInput.value.toLowerCase().trim();

      searchResults.innerHTML = "";

      if (!query) return;

      Object.keys(localStorage).forEach(key => {

        const value =
          localStorage.getItem(key) || "";

        if (value.toLowerCase().includes(query)) {

          const div =
            document.createElement("div");

          div.innerHTML = `
            <b>${key}</b><br>
            ${value.substring(0,100)}
          `;

          searchResults.appendChild(div);
        }

      });

    });

  }

  console.log("✅ UI READY");
}
```