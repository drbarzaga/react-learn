import { Playground } from "@/components/Playground"
import type { Concept } from "./types"

export const concurrencia: Concept[] = [
  {
    id: "useTransition",
    label: "useTransition",
    kicker: "Hook · Concurrencia",
    title: "Updates con prioridad baja",
    lede: "useTransition marca un update como 'no urgente'. React lo procesa sin bloquear la entrada del usuario y te entrega un flag isPending para mostrar feedback intermedio.",
    sections: [
      {
        heading: "Urgente vs transición",
        body: (
          <p>
            Tipear en un input es urgente: el carácter debe aparecer al instante. Recalcular una
            lista filtrada de 10.000 items es transición: puede esperar un par de frames sin que se
            sienta.
          </p>
        ),
      },
      {
        heading: "El patrón",
        body: (
          <p>
            <code>const [isPending, startTransition] = useTransition()</code>. Envuelve{" "}
            <em>solo</em> el setState lento dentro de <code>startTransition(() =&gt; ...)</code>. Lo
            demás permanece urgente.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useState, useTransition } from "react";

const items = Array.from({ length: 8000 }, (_, i) => "item " + i);

export default function App() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(items);
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const v = e.target.value;
    setQuery(v); // urgente: el input responde de inmediato
    startTransition(() => {
      // no urgente: filtrar 8k items puede esperar
      setList(items.filter((it) => it.includes(v)));
    });
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <input
        value={query}
        onChange={onChange}
        placeholder="filtrar..."
        style={{ padding: 8, width: "100%" }}
      />
      <p style={{ color: isPending ? "var(--fg)" : "var(--fg-muted)", fontFamily: "monospace", fontSize: 12 }}>
        {isPending ? "actualizando..." : list.length + " resultados"}
      </p>
      <ul style={{ height: 200, overflow: "auto", margin: 0, padding: "0 0 0 16px" }}>
        {list.slice(0, 200).map((it) => <li key={it}>{it}</li>)}
      </ul>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "No envuelvas setState de inputs controlados — los inputs DEBEN actualizarse urgentemente.",
      "isPending refleja la transición pendiente, no toda la latencia. No lo uses como spinner global.",
      "Si tu trabajo no es lento, useTransition no aporta nada — es una herramienta de presupuesto de frames.",
    ],
  },
  {
    id: "useDeferredValue",
    label: "useDeferredValue",
    kicker: "Hook · Concurrencia",
    title: "Una versión rezagada",
    lede: "useDeferredValue toma un valor y devuelve una copia 'lenta' que React actualiza con baja prioridad. Útil cuando no controlas el setState — solo el valor que llega como prop.",
    sections: [
      {
        heading: "Cuándo usarlo",
        body: (
          <p>
            Cuando recibes un valor que cambia rápido y lo pasas a un componente caro. El input se
            mantiene fluido porque el componente caro re-renderiza con el valor diferido, no con el
            actual.
          </p>
        ),
      },
      {
        heading: "Vs useTransition",
        body: (
          <p>
            useTransition controla el <em>setState</em>; useDeferredValue controla un{" "}
            <em>valor recibido</em>. A menudo intercambiables — elige según dónde tengas el control.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useDeferredValue, useState, useMemo } from "react";

function HeavyList({ query }) {
  const items = useMemo(() => {
    const result = [];
    for (let i = 0; i < 6000; i++) {
      const s = "row " + i;
      if (s.includes(query)) result.push(s);
    }
    // simula trabajo extra
    let x = 0;
    for (let i = 0; i < 80_000; i++) x += i;
    return result;
  }, [query]);

  return (
    <ul style={{ height: 200, overflow: "auto", margin: 0, padding: "0 0 0 16px" }}>
      {items.slice(0, 200).map((it) => <li key={it}>{it}</li>)}
    </ul>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const stale = query !== deferred;

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="escribe..."
        style={{ padding: 8, width: "100%" }}
      />
      <p style={{ color: stale ? "var(--fg)" : "var(--fg-muted)", fontSize: 12, fontFamily: "monospace" }}>
        {stale ? "lista desactualizada..." : "al día"}
      </p>
      <div style={{ opacity: stale ? 0.5 : 1, transition: "opacity 200ms" }}>
        <HeavyList query={deferred} />
      </div>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "El valor diferido sigue siendo el VIEJO durante la transición — útil para mostrar 'desactualizado'.",
      "No reemplaza al debounce: deferred se actualiza tan pronto como React tiene tiempo, no en una ventana fija.",
      "El componente que consume el deferred debería ser memoizado o caro — si no, no hay beneficio.",
    ],
  },
  {
    id: "Suspense",
    label: "Suspense",
    kicker: "Componente · Carga",
    title: "Esperar con gracia",
    lede: "Suspense declara un límite: 'mientras los hijos se cargan, muestra este fallback'. Es la pieza que permite que componentes hagan fetch directamente y React sepa qué mostrar mientras tanto.",
    sections: [
      {
        heading: "Quién suspende",
        body: (
          <p>
            Cualquier componente que lea de un recurso aún no resuelto: un <code>lazy()</code> sin
            descargar, un <code>use(promesa)</code> aún pendiente, o frameworks como Next/Relay que
            envuelven sus loaders.
          </p>
        ),
      },
      {
        heading: "Composición",
        body: (
          <p>
            Puedes anidar Suspense en cascada para que distintas regiones de la UI carguen a su
            propio ritmo, sin bloquear toda la pantalla con un único spinner gigante.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { Suspense, use, useState } from "react";

const cache = new Map();
function fetchUser(id) {
  if (!cache.has(id)) {
    cache.set(id, new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, name: "Usuario " + id, joined: 2020 + (id % 5) });
      }, 800);
    }));
  }
  return cache.get(id);
}

function User({ id }) {
  const user = use(fetchUser(id));
  return (
    <div style={{ padding: 12, background: "var(--surface-1)", borderRadius: 4, border: "1px solid var(--line)" }}>
      <strong>{user.name}</strong> · alta {user.joined}
    </div>
  );
}

export default function App() {
  const [id, setId] = useState(1);
  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[1, 2, 3].map((n) => (
          <button key={n} onClick={() => setId(n)}>cargar {n}</button>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <Suspense fallback={<em style={{ color: "var(--fg-muted)" }}>cargando usuario...</em>}>
          <User id={id} />
        </Suspense>
      </div>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "Crear la promesa dentro del componente sin caché provoca un bucle infinito de suspensión.",
      "Suspense solo captura suspensiones de sus hijos, no errores. Combina con un Error Boundary.",
      "El fallback debe ser barato — si tu fallback también suspende, escalas la suspensión hacia arriba.",
    ],
  },
  {
    id: "use",
    label: "use",
    kicker: "API · React 19",
    title: "Leer un recurso, inline",
    lede: "use() lee un valor de una promesa o un contexto desde dentro del render. Si el recurso aún no está listo, el componente suspende — y deja que el Suspense más cercano maneje la espera.",
    sections: [
      {
        heading: "Una API, dos casos",
        body: (
          <p>
            <code>use(promesa)</code> espera el resultado o suspende. <code>use(contexto)</code> es
            como useContext pero puede llamarse condicionalmente — cosa que useContext no permite.
          </p>
        ),
      },
      {
        heading: "Reemplaza patrones viejos",
        body: (
          <p>
            En lugar de <em>useState + useEffect + setData</em> para cargar, pasas la promesa al
            componente y use() la consume. Más declarativo, menos estados intermedios.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { Suspense, use, createContext } from "react";

const ThemeCtx = createContext("light");

function Title({ show }) {
  // useContext clásico no permite condicional. use() sí.
  if (!show) return null;
  const theme = use(ThemeCtx);
  return <h2 style={{ color: theme === "dark" ? "var(--fg)" : "var(--fg-muted)" }}>tema: {theme}</h2>;
}

const tipPromise = new Promise((r) =>
  setTimeout(() => r("Combina use() con Suspense para fetch declarativo."), 700)
);

function Tip() {
  const text = use(tipPromise);
  return <p style={{ fontStyle: "italic" }}>"{text}"</p>;
}

export default function App() {
  return (
    <ThemeCtx.Provider value="dark">
      <div style={{ fontFamily: "system-ui", padding: 24 }}>
        <Title show={true} />
        <Suspense fallback={<em>cargando tip...</em>}>
          <Tip />
        </Suspense>
      </div>
    </ThemeCtx.Provider>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "Pasar una promesa creada inline en el componente la recrea en cada render — usa una caché o pásala desde afuera.",
      "use() solo funciona dentro de componentes/hooks; en handlers usa await normal.",
      "Necesita un Suspense arriba en el árbol; si no, React lanza un error.",
    ],
  },
]
