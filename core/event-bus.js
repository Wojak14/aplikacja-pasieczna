/**
 * 🐝 EVENT BUS v1
 * FINAL BOSS COMMUNICATION LAYER
 *
 * Zastępuje:
 * - window.__globalState
 * - cross-import dependencies
 * - callback hell
 */

class EventBus {

  constructor() {
    this.events = {};
  }

  // =========================
  // 📡 SUBSCRIBE
  // =========================

  on(event, callback) {

    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    // unsubscribe function
    return () => this.off(event, callback);
  }

  // =========================
  // ❌ UNSUBSCRIBE
  // =========================

  off(event, callback) {

    if (!this.events[event]) return;

    this.events[event] = this.events[event]
      .filter(cb => cb !== callback);
  }

  // =========================
  // 🚀 EMIT EVENT
  // =========================

  emit(event, data) {

    if (!this.events[event]) return;

    this.events[event].forEach(callback => {
      try {
        callback(data);
      } catch (err) {
        console.error(`❌ EventBus error in "${event}":`, err);
      }
    });
  }

  // =========================
  // 🔁 CLEAR ALL
  // =========================

  clear() {
    this.events = {};
  }

}

// =========================
// 🌍 SINGLETON (GLOBAL BUS)
// =========================

export const eventBus = new EventBus();