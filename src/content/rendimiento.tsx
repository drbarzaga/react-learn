import { Playground } from "@/components/playground"
import type { Concept } from "./types"

export const rendimiento: Concept[] = [
  {
    id: "useMemo",
    label: "useMemo",
    kicker: "Hook · Memoización",
    title: "Cachear el cálculo",
    lede: "useMemo guarda el resultado de un cálculo y lo reutiliza mientras sus dependencias no cambien. Es una herramienta de rendimiento, no de corrección — úsala cuando midas que vale la pena.",
    sections: [
      {
        heading: "Cuándo importa",
        body: (
          <p>
            Para cálculos genuinamente caros (transformar listas grandes, parsear, ordenar) o para
            mantener <em>identidad referencial</em> de objetos/arrays que se pasan a hijos
            memoizados o a dependencias de otros hooks.
          </p>
        ),
      },
      {
        heading: "Cuándo es ruido",
        body: (
          <p>
            Para funciones simples, valores primitivos, o cálculos que React resuelve más rápido que
            la propia comparación de dependencias. La memoización tiene coste: comparar deps,
            retener referencias en memoria.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useMemo, useState } from "react";

function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default function App() {
  const [n, setN] = useState(30);
  const [otro, setOtro] = useState(0);

  const t0 = performance.now();
  const value = useMemo(() => fibonacci(n), [n]);
  const elapsed = (performance.now() - t0).toFixed(2);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <label>
        n = {n}
        <input
          type="range" min="20" max="38" value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </label>
      <p style={{ fontFamily: "monospace", marginTop: 12 }}>
        fib({n}) = {value}
        <br />
        última medición: {elapsed} ms
      </p>
      <button onClick={() => setOtro((x) => x + 1)}>
        re-render sin tocar n ({otro})
      </button>
      <p style={{ color: "var(--fg-muted)", fontSize: 13 }}>
        Sube otro contador: el cálculo NO se repite (ms ≈ 0).
        Mueve el slider: vuelve a calcularse.
      </p>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "No es una garantía: React puede descartar el caché. No la uses para corrección, solo para velocidad.",
      "Memoizar todo añade overhead: comparar deps tiene coste. Mide antes de optimizar.",
      "Si tu dep es un objeto creado en cada render, useMemo nunca acierta — primero estabiliza esa dep.",
    ],
  },
  {
    id: "useCallback",
    label: "useCallback",
    kicker: "Hook · Memoización de funciones",
    title: "Una función estable",
    lede: "useCallback es useMemo para funciones. Devuelve la misma referencia mientras sus dependencias no cambien — útil cuando la función viaja a un hijo memoizado o entra en las deps de otro hook.",
    sections: [
      {
        heading: "Cuándo aporta",
        body: (
          <p>
            Cuando pasas un callback a un componente envuelto en <code>memo()</code>, o cuando la
            función es dependencia de un <code>useEffect</code> y no quieres que el efecto se
            reinicie en cada render.
          </p>
        ),
      },
      {
        heading: "Sin un consumidor, es ceremonia",
        body: (
          <p>
            Envolver toda función en useCallback no acelera nada por sí solo. Solo importa cuando
            alguien río abajo se beneficia de que la referencia sea estable.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { memo, useCallback, useState } from "react";

const Item = memo(function Item({ label, onClick }) {
  console.log("render Item:", label);
  return <button onClick={onClick} style={{ marginRight: 6 }}>{label}</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Sin useCallback, Item se re-renderizaría aunque memo esté.
  const handleA = useCallback(() => setCount((c) => c + 1), []);
  const handleB = useCallback(() => setCount((c) => c - 1), []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <p>count: {count} · other: {other}</p>
      <Item label="+1" onClick={handleA} />
      <Item label="−1" onClick={handleB} />
      <hr style={{ margin: "16px 0" }} />
      <button onClick={() => setOther((x) => x + 1)}>
        cambiar SOLO 'other' ({other})
      </button>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginTop: 8 }}>
        Abre la consola y mira: Item NO se re-renderiza al cambiar 'other'
        gracias a memo + callback estable.
      </p>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "useCallback sin memo() en el hijo no ahorra renders — el hijo se renderiza igual.",
      "Las dependencias importan: si olvidas una, capturas valores viejos en el closure.",
      "Para un callback que solo se usa en un onClick local, useCallback es overhead inútil.",
    ],
  },
  {
    id: "memo",
    label: "memo",
    kicker: "API · Componentes",
    title: "Saltarse el render",
    lede: "memo() envuelve un componente para que React compare sus props con las anteriores. Si nada cambió por referencia, se salta el render. Es la pieza que hace que useCallback y useMemo valgan la pena.",
    sections: [
      {
        heading: "La comparación",
        body: (
          <p>
            Por defecto, comparación shallow: <code>===</code> sobre cada prop. Por eso pasar un
            objeto literal nuevo en cada render rompe la memoización. Pasa primitivos, o estabiliza
            referencias con useMemo/useCallback.
          </p>
        ),
      },
      {
        heading: "Cuándo no la quieres",
        body: (
          <p>
            Si el componente es trivial o sus props cambian en casi todos los renders, comparar es
            más caro que renderizar. Reserva memo para subárboles caros o listas largas.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { memo, useMemo, useState } from "react";

const Card = memo(function Card({ user }) {
  console.log("render Card:", user.name);
  return (
    <div style={{ padding: 12, background: "var(--surface-1)", borderRadius: 4, marginTop: 6, border: "1px solid var(--line)"}}>
      <strong>{user.name}</strong> · {user.role}
    </div>
  );
});

export default function App() {
  const [tick, setTick] = useState(0);

  // CASO A: objeto nuevo en cada render → memo no acierta
  const userUnstable = { name: "Ada", role: "engineer" };

  // CASO B: useMemo estabiliza la referencia → memo acierta
  const userStable = useMemo(() => ({ name: "Lin", role: "designer" }), []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <p>tick: {tick}</p>
      <button onClick={() => setTick((t) => t + 1)}>+1 tick</button>

      <p style={{ marginTop: 16, marginBottom: 0, fontSize: 13, color: "var(--fg-muted)" }}>
        Sin estabilizar (re-renderiza en cada tick):
      </p>
      <Card user={userUnstable} />

      <p style={{ marginTop: 16, marginBottom: 0, fontSize: 13, color: "var(--fg)" }}>
        Con useMemo (NO re-renderiza):
      </p>
      <Card user={userStable} />

      <p style={{ color: "var(--fg-muted)", fontSize: 12, marginTop: 12 }}>
        Abre la consola y haz click en +1 tick. Verás Ada cada vez, Lin solo una.
      </p>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "memo compara por referencia, no por contenido. {a:1} !== {a:1}.",
      "Pasar children siempre rompe la memoización: cada JSX literal crea un objeto nuevo.",
      "memo no es magia: en muchos componentes, no medirás diferencia. Perfila antes de aplicar.",
    ],
  },
]
