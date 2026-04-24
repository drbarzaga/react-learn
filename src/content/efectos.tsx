import { Playground } from "@/components/Playground"
import type { Concept } from "./types"

export const efectos: Concept[] = [
  {
    id: "useEffect",
    label: "useEffect",
    kicker: "Hook · Sincronización",
    title: "Sincronizar con el exterior",
    lede: "useEffect no es 'código que corre después de render'. Es la forma de decirle a React: cuando este componente esté en pantalla, mantén algo del mundo exterior en sintonía con su estado.",
    sections: [
      {
        heading: "El bucle setup → cleanup",
        body: (
          <p>
            Cada vez que las dependencias cambian, React corre el cleanup del efecto anterior y
            luego el setup del nuevo. Por eso devolver una función de limpieza importa: es lo que
            cancela suscripciones, timers o requests obsoletas.
          </p>
        ),
      },
      {
        heading: "Las dependencias",
        body: (
          <p>
            El array <code>[]</code> declara qué <em>valores reactivos</em> usa el efecto. Omitir
            uno provoca cierres viejos; añadir cosas que no usas dispara renders innecesarios. Trata
            el linter como un compañero estricto pero correcto.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        showConsole
        files={{
          "/App.js": `import { useEffect, useState } from "react";

export default function App() {
  const [userId, setUserId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users/" + userId, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    // cleanup: cancela el fetch si userId cambia antes de resolver
    return () => ctrl.abort();
  }, [userId]);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2, 3, 4].map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{ fontWeight: id === userId ? 700 : 400 }}
          >
            user {id}
          </button>
        ))}
      </div>
      <pre style={{ marginTop: 16, fontSize: 13, background: "var(--surface-1)", padding: 12, borderRadius: 4 }}>
        {loading ? "cargando..." : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "Si tu efecto solo reacciona a un evento (click, submit), no debería ser un efecto — ponlo en el handler.",
      "useEffect en StrictMode corre dos veces en dev: es a propósito, para que detectes cleanups mal escritos.",
      "Un fetch sin AbortController genera carreras: la respuesta vieja puede sobrescribir la nueva.",
    ],
  },
  {
    id: "useLayoutEffect",
    label: "useLayoutEffect",
    kicker: "Hook · Sincronización síncrona",
    title: "Antes de pintar",
    lede: "useLayoutEffect corre justo después del DOM commit pero antes de que el navegador pinte. Úsalo cuando necesites medir el DOM y aplicar un cambio antes de que el usuario vea el resultado intermedio.",
    sections: [
      {
        heading: "El caso real",
        body: (
          <p>
            Tooltips que se reposicionan según su tamaño, animaciones que necesitan posición inicial
            calculada, ajustes de scroll después de insertar contenido. Si usas{" "}
            <code>useEffect</code> en estos casos, verás un parpadeo.
          </p>
        ),
      },
      {
        heading: "Coste",
        body: (
          <p>
            Bloquea la pintura. Si el trabajo es pesado, perjudica el frame rate. La regla:{" "}
            <em>useEffect por defecto</em>, useLayoutEffect solo cuando midas y mutes el DOM en el
            mismo turno.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useLayoutEffect, useRef, useState } from "react";

export default function App() {
  const [text, setText] = useState("Hola");
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) setWidth(ref.current.getBoundingClientRect().width);
  }, [text]);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 8, width: "100%" }}
      />
      <div style={{ marginTop: 16, display: "inline-block" }}>
        <span ref={ref} style={{ fontSize: 32, fontWeight: 600 }}>{text}</span>
        <div
          style={{
            marginTop: 4,
            height: 2,
            background: "var(--accent)",
            width: width + "px",
            transition: "width 200ms",
          }}
        />
      </div>
      <p style={{ marginTop: 12, color: "var(--fg-muted)" }}>
        ancho medido: <code>{width.toFixed(1)}px</code> — el subrayado se ajusta sin parpadeo.
      </p>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "No funciona en SSR — corre solo en el cliente. React avisa con un warning.",
      "Si llamas setState dentro, fuerzas un render extra antes de pintar — úsalo con cabeza.",
      "Para la mayoría de casos, useEffect basta. No prematuramente uses esta variante.",
    ],
  },
  {
    id: "useEffectEvent",
    label: "useEffectEvent",
    kicker: "Hook · Experimental",
    title: "Lógica no reactiva dentro de efectos",
    lede: "useEffectEvent extrae lógica que debe correr dentro de un efecto pero no debe dispararlo de nuevo cuando cambia. Rompe la tensión entre 'necesito leer este valor' y 'no quiero que el efecto dependa de él'.",
    sections: [
      {
        heading: "El problema",
        body: (
          <p>
            Un efecto que abre una conexión no debe re-abrirla cada vez que cambia el mensaje de log
            — pero si usas el log dentro del efecto, React exige que lo incluyas en las dependencias
            y eso causa reconexiones innecesarias.
          </p>
        ),
      },
      {
        heading: "La solución",
        body: (
          <p>
            Envuelve la lógica no reactiva en un <code>useEffectEvent</code>. La función resultante
            puede llamarse desde el efecto sin ser una dependencia de él. Aún experimental en React
            19: importar como <code>experimental_useEffectEvent</code>.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        showConsole
        files={{
          "/App.js": `import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";

// Polyfill de useEffectEvent: misma semántica que la API experimental
function useEffectEvent(fn) {
  const ref = useRef(fn);
  useLayoutEffect(() => { ref.current = fn; });
  return useCallback((...args) => ref.current(...args), []);
}

function createConnection(url) {
  return {
    connect() { console.log("✅ conectado a " + url); },
    disconnect() { console.log("❌ desconectado de " + url); },
  };
}

function ChatRoom({ roomUrl, theme }) {
  // onConnected lee 'theme' pero no es una dependencia del efecto
  const onConnected = useEffectEvent(() => {
    console.log("tema al conectar:", theme);
  });

  useEffect(() => {
    const conn = createConnection(roomUrl);
    conn.connect();
    onConnected();
    return () => conn.disconnect();
  }, [roomUrl]); // solo roomUrl — cambiar theme no reconecta

  return (
    <p style={{ fontFamily: "monospace", fontSize: 13 }}>
      sala: <strong>{roomUrl}</strong> · tema: {theme}
    </p>
  );
}

export default function App() {
  const [room, setRoom] = useState("general");
  const [theme, setTheme] = useState("oscuro");
  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 12 }}>
        Abre la consola. Cambiar tema no reconecta; cambiar sala sí.
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {["general", "soporte", "random"].map(r => (
          <button key={r} onClick={() => setRoom(r)}
            style={{ fontWeight: room === r ? "bold" : "normal" }}>{r}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["oscuro", "claro"].map(t => (
          <button key={t} onClick={() => setTheme(t)}
            style={{ fontWeight: theme === t ? "bold" : "normal" }}>{t}</button>
        ))}
      </div>
      <ChatRoom roomUrl={room} theme={theme} />
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "useEffectEvent es experimental — importar como experimental_useEffectEvent. La API puede cambiar sin aviso.",
      "No pases la función del evento como prop ni la retornes desde un hook — úsala solo dentro del efecto.",
      "No la llames fuera de un efecto; está diseñada exclusivamente para ese contexto.",
    ],
  },
]
