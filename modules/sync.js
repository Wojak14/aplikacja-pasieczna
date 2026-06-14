
/**
 * 🔄 sync.js
 * SMART CALENDAR PRO
 */

import {
  saveNote,
  loadNote
} from "./notes.js";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { db } from "../firebase.js";

/* =========================
   ☁️ SAVE TO CLOUD
========================= */

export async function syncNoteToCloud(dateKey, text) {

  try {

    await setDoc(
      doc(db, "notes", dateKey),
      {
        text,
        updatedAt: Date.now()
      }
    );

    console.log("☁️ CLOUD SAVE:", dateKey);

  } catch (e) {

    console.error("SYNC SAVE ERROR", e);
  }
}

/* =========================
   ☁️ LOAD FROM CLOUD
========================= */

export async function loadNoteFromCloud(dateKey) {

  try {

    const snap =
      await getDoc(doc(db, "notes", dateKey));

    if (!snap.exists()) return "";

    return snap.data().text || "";

  } catch (e) {

    console.error("SYNC LOAD ERROR", e);

    return "";
  }
}

/* =========================
   🔄 FULL SYNC
========================= */

export async function syncAllNotes() {

  try {

    const snapshot =
      await getDocs(collection(db, "notes"));

    snapshot.forEach(docSnap => {

      const dateKey = docSnap.id;

      const data = docSnap.data();

      localStorage.setItem(
        `note_${dateKey}`,
        data.text || ""
      );

    });

    console.log("✅ FULL SYNC DONE");

  } catch (e) {

    console.error("FULL SYNC ERROR", e);
  }
}

/* =========================
   🚀 INIT SYNC
========================= */

export async function initSync() {

  console.log("🔄 SYNC INIT");

  await syncAllNotes();
}
```
