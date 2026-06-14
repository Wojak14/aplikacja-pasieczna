/**
 * 🐝 BEE OS CORE v4
 * FINAL BOSS PASIEKA
 * STATE STORE + AI PIPELINE
 */

import { getState, setState } from "./state-store.js";

import { loadWeather } from "../modules/weather.js";
import { getCurrentApiary } from "./apiary.js";

import { runSwarmAI } from "../ai/swarm.js";
import { runRojakPredictor } from "../ai/rojakPredictor.js";
import { runQueenBreedingAI } from "../ai/queenBreeding.js";
import { generateHoneyForecast } from "../ai/honey-forecast.js";

/* =========================
   📡 EVENT BUS
========================= */

class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  emit(event, data) {
    (this.events[event] || []).forEach(callback => {
      callback(data);
    });
  }
}

export const eventBus = new EventBus();

/* =========================
   🧮 HELPERS
========================= */

function avg(arr) {
  if (!arr?.length) return 0;

  return (
    arr.reduce((sum, value) => sum + value, 0) /
    arr.length
  );
}

/* =========================
   ⚖️ PRIORITY ENGINE
========================= */

function resolvePriority(ai) {

  const risks = [];

  if (ai.swarm?.length) {
    risks.push({
      type: "swarm",
      value: avg(ai.swarm.map(x => x.risk || 0))
    });
  }

  if (ai.rojak?.length) {
    risks.push({
      type: "rojak",
      value: avg(ai.rojak.map(x => x.score || 0))
    });
  }

  if (ai.queen?.length) {
    risks.push({
      type: "queen",
      value: avg(ai.queen.map(x => x.score || 0))
    });
  }

  return risks.reduce(
    (best, current) =>
      current.value > best.value ? current : best,
    {
      type: "none",
      value: 0
    }
  );
}

/* =========================
   🧠 CONFLICT RESOLVER
========================= */

function resolveConflicts(ai) {

  const priority = resolvePriority(ai);

  let decision = "OK";
  let mode = "NORMAL";

  if (
    priority.type === "swarm" &&
    priority.value >= 70
  ) {
    decision = "🐝 RYZYKO ROJENIA";
    mode = "ALERT";
  }

  if (
    priority.type === "queen" &&
    priority.value >= 70
  ) {
    decision = "👑 PROBLEM Z MATKĄ";
    mode = "CRITICAL";
  }

  if (
    priority.type === "rojak" &&
    priority.value >= 70
  ) {
    decision = "🚨 DZIEŃ ROJOWY";
    mode = "CRITICAL";
  }

  return {
    decision,
    mode,
    priority
  };
}

/* =========================
   🚀 INIT
========================= */

export async function initBeeCore() {

  console.log("🐝 BEE OS v4 START");

  const apiary = getCurrentApiary();

  setState("apiary.current", apiary);

  await refresh();

  startLoop();

  setState("ready", true);

  eventBus.emit(
    "core:ready",
    getState()
  );
}

/* =========================
   🌤 WEATHER + AI
========================= */

async function refresh() {

  const state = getState();

  const weather = await loadWeather({
    lat: state.apiary?.current?.lat || 52.2,
    lon: state.apiary?.current?.lon || 21.0
  });

  if (!weather) return;

  setState("weather", weather);

  const swarm = runSwarmAI(weather);

  const rojak = runRojakPredictor(
    weather,
    swarm
  );

  const queen = runQueenBreedingAI(
    weather,
    swarm
  );

  const honey =
    generateHoneyForecast(weather);

  const ai = {
    swarm,
    rojak,
    queen,
    honey
  };

  const decision =
    resolveConflicts(ai);

  setState("ai.swarm", swarm);
  setState("ai.rojak", rojak);
  setState("ai.queen", queen);
  setState("ai.honey", honey);

  setState("ai.decision", decision);

  eventBus.emit(
    "weather:update",
    weather
  );

  eventBus.emit(
    "ai:update",
    ai
  );

  eventBus.emit(
    "decision:update",
    decision
  );

  eventBus.emit(
    "state:update",
    getState()
  );
}

/* =========================
   🔄 LOOP
========================= */

function startLoop() {

  setInterval(() => {
    refresh();
  }, 900000);
}