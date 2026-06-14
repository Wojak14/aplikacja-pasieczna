// apiary-defaults.js

export const APIARY_DEFAULTS = {
  apiaryName: "Moja Pasieka",

  hiveCount: 10,

  optimalConditions: {
    temperatureMin: 18,
    temperatureMax: 28,
    humidityMin: 50,
    humidityMax: 70,
    windMax: 5,
  },

  swarmRisk: {
    low: 30,
    medium: 60,
    high: 80,
  }
};

export function isOptimalWeather(temp, humidity, wind) {
  const c = APIARY_DEFAULTS.optimalConditions;

  return (
    temp >= c.temperatureMin &&
    temp <= c.temperatureMax &&
    humidity >= c.humidityMin &&
    humidity <= c.humidityMax &&
    wind <= c.windMax
  );
}

export function calculateSwarmRisk(baseRisk) {
  if (baseRisk >= APIARY_DEFAULTS.swarmRisk.high) return "HIGH";
  if (baseRisk >= APIARY_DEFAULTS.swarmRisk.medium) return "MEDIUM";
  if (baseRisk >= APIARY_DEFAULTS.swarmRisk.low) return "LOW";
  return "VERY LOW";
}