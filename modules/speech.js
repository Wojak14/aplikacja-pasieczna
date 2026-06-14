
 * 🎤 speech.js
 * SMART CALENDAR PRO
 */

let recognition = null;

export function initSpeech() {

  if (
    !("webkitSpeechRecognition" in window) &&
    !("SpeechRecognition" in window)
  ) {
    console.warn("❌ Speech API not supported");
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();

  recognition.lang = "pl-PL";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    console.log("🎤 Nagrywanie...");
  };

  recognition.onresult = (event) => {

    const text =
      event.results[0][0].transcript;

    console.log("📝 Rozpoznano:", text);

    const notes =
      document.getElementById("day-notes") ||
      document.getElementById("notes");

    if (notes) {
      notes.value += " " + text;
    }
  };

  recognition.onerror = (e) => {
    console.warn("❌ Speech error:", e.error);
  };

  recognition.onend = () => {
    console.log("🎤 Stop");
  };
}

export function startSpeech() {

  if (!recognition) {
    initSpeech();
  }

  recognition?.start();
}

export function stopSpeech() {
  recognition?.stop();
}
```
