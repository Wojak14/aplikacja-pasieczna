/**
 * 🐝 STATE STORE v1
 * FINAL BOSS PASIEKA
 *
 * Single Source Of Truth
 */

const state = {

  /* =========================
     SYSTEM
  ========================= */

  ready: false,

  /* =========================
     APIARY
  ========================= */

  apiary: {
    current: null,
    hives: []
  },

  /* =========================
     WEATHER
  ========================= */

  weather: {
    today: null,
    forecast: []
  },

  /* =========================
     AI
  ========================= */

  ai: {

    decision: null,

    swarm: [],

    rojak: [],

    queen: [],

    honey: [],

    planner: []
  },

  /* =========================
     NOTES
  ========================= */

  notes: {},

  /* =========================
     UI
  ========================= */

  ui: {

    selectedDate: null,

    selectedHive: null,

    activePanel: null
  }
};

/* =========================
   GET STATE
========================= */

export function getState() {
  return state;
}

/* =========================
   SET STATE
========================= */

export function setState(path, value) {

  const keys = path.split(".");

  let target = state;

  while (keys.length > 1) {
    target = target[keys.shift()];
  }

  target[keys[0]] = value;

  return state;
}

/* =========================
   GET VALUE
========================= */

export function getValue(path) {

  const keys = path.split(".");

  let current = state;

  for (const key of keys) {

    if (current == null) {
      return undefined;
    }

    current = current[key];
  }

  return current;
}

/* =========================
   MERGE OBJECT
========================= */

export function mergeState(path, object) {

  const current = getValue(path);

  if (
    typeof current !== "object" ||
    current === null
  ) {
    return;
  }

  Object.assign(current, object);

  return current;
}

/* =========================
   RESET AI
========================= */

export function resetAI() {

  state.ai = {
    decision: null,
    swarm: [],
    rojak: [],
    queen: [],
    honey: [],
    planner: []
  };
}

/* =========================
   RESET WEATHER
========================= */

export function resetWeather() {

  state.weather = {
    today: null,
    forecast: []
  };
}

/* =========================
   RESET UI
========================= */

export function resetUI() {

  state.ui = {
    selectedDate: null,
    selectedHive: null,
    activePanel: null
  };
}

/* =========================
   DEBUG
========================= */

export function dumpState() {

  console.log(
    "🐝 CURRENT STATE",
    structuredClone(state)
  );

  return state;
}