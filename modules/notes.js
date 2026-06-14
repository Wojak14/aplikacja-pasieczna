
/**
 * 📝 notes.js
 * SMART CALENDAR PRO
 */

/* =========================
   💾 SAVE NOTE
========================= */

export async function saveNote(dateKey, text) {

  if (!dateKey) return false;

  try {

    localStorage.setItem(
      `note_${dateKey}`,
      text || ""
    );

    console.log("💾 NOTE SAVED:", dateKey);

    return true;

  } catch (e) {

    console.error("❌ SAVE NOTE ERROR", e);

    return false;
  }
}

/* =========================
   📖 LOAD NOTE
========================= */

export async function loadNote(dateKey) {

  if (!dateKey) return "";

  try {

    return (
      localStorage.getItem(`note_${dateKey}`) || ""
    );

  } catch (e) {

    console.error("❌ LOAD NOTE ERROR", e);

    return "";
  }
}

/* =========================
   🗑 DELETE NOTE
========================= */

export async function deleteNote(dateKey) {

  try {

    localStorage.removeItem(`note_${dateKey}`);

    console.log("🗑 NOTE REMOVED:", dateKey);

    return true;

  } catch (e) {

    console.error("❌ DELETE NOTE ERROR", e);

    return false;
  }
}

/* =========================
   🔍 SEARCH NOTES
========================= */

export function searchNotes(query) {

  const results = [];

  if (!query) return results;

  const q = query.toLowerCase();

  Object.keys(localStorage).forEach(key => {

    if (!key.startsWith("note_")) return;

    const text =
      localStorage.getItem(key) || "";

    if (text.toLowerCase().includes(q)) {

      results.push({
        date: key.replace("note_", ""),
        text
      });
    }

  });

  return results;
}

/* =========================
   📊 GET ALL NOTES
========================= */

export function getAllNotes() {

  const notes = [];

  Object.keys(localStorage).forEach(key => {

    if (!key.startsWith("note_")) return;

    notes.push({
      date: key.replace("note_", ""),
      text: localStorage.getItem(key)
    });

  });

  return notes;
}
```
