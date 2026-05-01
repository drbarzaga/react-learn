import type { Exercise } from "./types"

export const countdownTimer: Exercise = {
  id: "countdown-timer",
  label: "countdown timer",
  title: "Temporizador",
  lede: "Un temporizador countable. El usuario ingresa segundos y al iniciar cuenta regresivamente. Muestra mm:ss y se detiene en 0.",
  difficulty: "intermediate",
  objectives: [
    "Input para ingresar segundos",
    "Estado time remaining",
    "Estado isRunning",
    "useEffect con setInterval cuando isRunning",
    "Limpiar intervalo en cleanup",
    "Mostrar formato mm:ss",
  ],
  hint: "Usa useEffect con dependencia [isRunning]. Cuando time <= 0, establece isRunning(false).",
  relatedConcepts: ["useState", "useEffect"],
  starter: {
    "/App.js": `import { useState, useEffect } from "react";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return \`\${String(m).padStart(2, "0")}:\${String(s).padStart(2, "0")}\`;
}

const btnStyle = (primary) => ({
  padding: "12px 24px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  background: primary ? "#3b82f6" : "#27272a",
  color: "#fff",
});

const displayStyle = {
  fontSize: 64,
  fontFamily: "monospace",
  color: "#fff",
  marginBottom: 24,
};

// TODO: implementar estados y funciones

export default function App() {
  const [seconds, setSeconds] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh", textAlign: "center" }}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Countdown Timer</p>
      
      <div style={displayStyle}>
        {formatTime(timeRemaining)}
      </div>

      <div style={{ marginBottom: 24 }}>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          placeholder="segundos"
          disabled={isRunning}
          style={{ padding: 12, width: 100, textAlign: "center", fontSize: 16, background: "#27272a", border: "1px solid #3f3f46", borderRadius: 8, color: "#fff" }}
        />
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {/* TODO: onClick para iniciar o pausar el timer */}
        <button onClick={() => {}} style={btnStyle(true)}>Iniciar</button>
        {/* TODO: onClick para resetear */}
        <button onClick={() => {}} style={btnStyle(false)}>Reset</button>
      </div>
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { useState, useEffect } from "react";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return \`\${String(m).padStart(2, "0")}:\${String(s).padStart(2, "0")}\`;
}

const btnStyle = (primary) => ({
  padding: "12px 24px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  background: primary ? "#3b82f6" : "#27272a",
  color: "#fff",
});

const displayStyle = {
  fontSize: 64,
  fontFamily: "monospace",
  color: "#fff",
  marginBottom: 24,
};

export default function App() {
  const [seconds, setSeconds] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((t) => t - 1);
      }, 1000);
    } else if (timeRemaining <= 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const handleStart = () => {
    if (seconds > 0) {
      setTimeRemaining(seconds);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(seconds);
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh", textAlign: "center" }}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Countdown Timer</p>
      
      <div style={displayStyle}>
        {formatTime(timeRemaining)}
      </div>

      {!isRunning && timeRemaining === seconds && (
        <div style={{ marginBottom: 24 }}>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            placeholder="segundos"
            style={{ padding: 12, width: 100, textAlign: "center", fontSize: 16, background: "#27272a", border: "1px solid #3f3f46", borderRadius: 8, color: "#fff" }}
          />
        </div>
      )}

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {!isRunning ? (
          <button onClick={handleStart} style={btnStyle(true)}>Iniciar</button>
        ) : (
          <button onClick={() => setIsRunning(false)} style={btnStyle(false)}>Pausar</button>
        )}
        <button onClick={handleReset} style={btnStyle(false)}>Reset</button>
      </div>
    </div>
  );
}
`,
  },
}
