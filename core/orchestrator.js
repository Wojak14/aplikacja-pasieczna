/**
 * 🐝 FINAL BOSS ORCHESTRATOR v3
 * STATE-DRIVEN ARCHITECTURE
 */

import { getCurrentApiary, getGPSOnce } from "./apiary.js";
import { loadWeather, getBeeStatus, isBeeDanger } from "./weather.js";
import { CalendarModule } from "./calendar.js";

import { runSwarmAI } from "../ai/swarm.js";
import { runRojakPredictor } from "../ai/rojakPredictor.js";
import { runQueenBreedingAI } from "../ai/queenBreeding.js";

let state = {
  weather: null,
  ai: {
    swarm: [],
    rojak: [],
    queen: []
  },
  ready: false
};

// =========================
// 🚀 INIT APP
// =========================

export async function initApp() {

  console.log("🐝 ORCHESTRATOR v3 START");

  getGPSOnce(async () => {
    await boot();
  });

  setTimeout(() => {
    if (!state.ready) boot();
  }, 2500);

  startLoops();
}

// =========================
// 🚀 BOOT
// =========================

async function boot() {

  if (state.ready) return;
  state.ready = true;

  await refreshWeather();
  initCalendar();

  console.log("✅ SYSTEM READY");
}

// =========================
// 🌤️ WEATHER PIPELINE
// =========================

async function refreshWeather() {

  const apiary = getCurrentApiary();

  state.weather = await loadWeather({
    lat: apiary?.lat || 52.24,
    lon: apiary?.lon || 23.10
  });

  const weather = state.weather;

  if (!weather) return;

  // =========================
  // 🧠 AI LAYER (STATE UPDATE)
  // =========================

  state.ai.swarm = runSwarmAI(weather);
  state.ai.rojak = runRojakPredictor(weather, state.ai.swarm);
  state.ai.queen = runQueenBreedingAI(weather, state.ai.swarm);

  // =========================
  // 📡 PUSH TO UI LAYER
  // =========================

  renderWeather();
  renderBeeStatus();

  CalendarModule?.updateMarkers?.(weather);
}

// =========================
// 📅 CALENDAR
// =========================

function initCalendar() {

  const apiary = getCurrentApiary();

  CalendarModule.init({
    currentApiary: apiary,
    onOpenNote: (data) => {

      const textarea = document.getElementById("notes");
      if (!textarea) return;

      textarea.value = CalendarModule.getNote(data.key, apiary) || "";
    }
  });
}

// =========================
// 🌤 UI
// =========================

function renderWeather() {

  const box = document.getElementById("weather");
  if (!box || !state.weather?.today) return;

  const t = state.weather.today;

  box.innerHTML = `
    <h3>🌤 Pogoda</h3>
    🌡 ${t.temp}°C<br>
    💨 ${t.wind} km/h<br>
    🌧 ${t.rain}%<br>
    Min: ${t.min}°C<br>
    Max: ${t.max}°C
  `;
}

// =========================
// 🐝 STATUS
// =========================

function renderBeeStatus() {

  const box = document.getElementById("assistant");
  if (!box || !state.weather?.today) return;

  const status = getBeeStatus(state.weather.today);
  const danger = isBeeDanger(state.weather.today);

  let html = `
    <h3>🐝 Asystent</h3>
    ${status}
  `;

  if (danger) {
    html += `
      <div style="margin-top:10px;padding:10px;border-radius:8px;background:#ffdddd;font-weight:bold;">
        🔴 DZIŚ NIE OTWIERAJ ULA
      </div>
    `;
  }

  box.innerHTML = html;
}

// =========================
// 🔄 LOOP
// =========================

function startLoops() {

  setInterval(() => {
    refreshWeather();
  }, 900000);
}

// =========================
// 📤 STATE ACCESS
// =========================

export function getState() {
  return state;
}