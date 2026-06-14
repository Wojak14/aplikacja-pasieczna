/**
 * 🐝 FINAL BOSS ENTRY POINT v2 (CLEAN ARCH)
 */

import { initBeeCore } from "./core/bee-core.js";

import { initDashboard } from "./dashboard.js";
import { initQuickPanel } from "./quickPanel.js";

import { generateMonth } from "./calendar-generator.js";
import { beeCalendarData } from "../data/bee-data.js";

import { initGPS } from "../modules/gps.js";

/* =========================
   🚀 BOOT SYSTEM
========================= */

document.addEventListener("DOMContentLoaded", async () => {

  console.log("🚀 MAIN START - BEE OS v2");

  try {

    /* =========================
       UI LAYER
    ========================= */

    initDashboard();
    initQuickPanel();

    /* =========================
       MODULE LAYER
    ========================= */

    initGPS();

    /* =========================
       🧠 CORE SYSTEM (JEDYNE ŹRÓDŁO LOGIKI)
    ========================= */

    await initBeeCore();

    /* =========================
       📅 CALENDAR INIT
    ========================= */

    const calendar = document.getElementById("calendar");
    if (!calendar) return;

    calendar.innerHTML = "";

    for (let m = 1; m <= 12; m++) {
      const id = `month-${String(m).padStart(2, "0")}`;
      calendar.innerHTML += `<div id="${id}"></div>`;
    }

    for (let m = 1; m <= 12; m++) {
      generateMonth(
        2026,
        m,
        `month-${String(m).padStart(2, "0")}`,
        beeCalendarData
      );
    }

    /* =========================
       📍 AUTO SCROLL
    ========================= */

    requestAnimationFrame(() => {
      const currentMonth = new Date().getMonth() + 1;

      document
        .getElementById(`month-${String(currentMonth).padStart(2, "0")}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    console.log("✅ BEE OS READY");

  } catch (err) {
    console.error("❌ BOOT ERROR:", err);
  }
});