import { Playground } from "@/components/Playground"
import type { Concept } from "./types"

export const entrevistas: Concept[] = [
  {
    id: "virtual-dom",
    label: "Virtual DOM",
    kicker: "Entrevista · Fundamentos",
    title: "¿Por qué React no toca el DOM directamente?",
    lede: "El Virtual DOM es una representación en memoria del árbol de UI. React lo compara contra el estado anterior (reconciliación) y solo aplica al DOM real los cambios mínimos necesarios — en lugar de reescribirlo entero.",
    sections: [
      {
        heading: "El ciclo completo",
        body: (
          <p>
            <strong>Render →</strong> React genera un nuevo árbol de objetos JS.{" "}
            <strong>Diffing →</strong> Compara el árbol nuevo contra el anterior (algoritmo O(n)).{" "}
            <strong>Commit →</strong> Solo las diferencias se aplican al DOM real. El DOM es lento;
            los objetos JS son rápidos — ahí está la ganancia.
          </p>
        ),
      },
      {
        heading: "Reconciliación y keys",
        body: (
          <p>
            Cuando React compara listas necesita identificar qué elemento es qué. Sin{" "}
            <code>key</code>, asume posición y puede reutilizar el nodo equivocado. Con{" "}
            <code>key</code> estable, reconcilia correctamente incluso al reordenar.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useState } from "react";

// Sin key estable React reutiliza nodos por posición.
// Cambia el orden y observa cómo el input conserva su valor.

const colores = ["Rojo", "Verde", "Azul", "Amarillo"];

function Lista({ useKey }) {
  const [items, setItems] = useState(colores);

  const shuffle = () =>
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5));

  return (
    <div style={{ marginBottom: 24 }}>
      <strong>{useKey ? "Con key (correcto)" : "Sin key (bug)"}</strong>
      <button onClick={shuffle} style={{ marginLeft: 8 }}>Mezclar</button>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
        {items.map((item, i) => (
          <li key={useKey ? item : i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 80 }}>{item}</span>
            <input placeholder="escribe algo..." />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <Lista useKey={false} />
      <Lista useKey={true} />
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "El Virtual DOM no es siempre más rápido que el DOM directo — frameworks como Svelte prescinden de él y son igual de rápidos para casos simples.",
      "Usar el índice como key es un anti-patrón cuando la lista puede reordenarse o tener inserciones.",
      "React Native también usa reconciliación, pero en lugar de DOM aplica los cambios a vistas nativas.",
    ],
  },

  {
    id: "controlado-vs-no-controlado",
    label: "Controlado vs No controlado",
    kicker: "Entrevista · Formularios",
    title: "¿Quién tiene la verdad del input?",
    lede: "Un componente controlado delega el valor del input a React — el estado es la fuente de verdad. Un componente no controlado deja que el DOM guarde el valor y lo lee con una ref cuando hace falta.",
    sections: [
      {
        heading: "Controlado",
        body: (
          <p>
            <code>value</code> viene del estado y <code>onChange</code> lo actualiza. React controla
            cada pulsación. Ideal cuando necesitas validación en tiempo real, transformar el input
            mientras el usuario escribe, o sincronizar varios campos.
          </p>
        ),
      },
      {
        heading: "No controlado",
        body: (
          <p>
            El DOM guarda el valor. Lo lees con <code>useRef</code> en el momento que necesitas (por
            ejemplo, al hacer submit). Más simple para formularios donde no importa el valor
            intermedio — como un upload de archivo.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useState, useRef } from "react";

// ── Controlado ────────────────────────────────
function ControlledForm() {
  const [value, setValue] = useState("");
  const upper = value.toUpperCase();

  return (
    <section>
      <h3>Controlado</h3>
      <p style={{ fontSize: 12, color: "var(--fg-muted)" }}>
        React es la fuente de verdad. Se transforma a mayúsculas en tiempo real.
      </p>
      <input
        value={upper}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe algo..."
      />
      <p>Estado: <code>"{upper}"</code></p>
    </section>
  );
}

// ── No controlado ─────────────────────────────
function UncontrolledForm() {
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(ref.current.value);
  };

  return (
    <section>
      <h3>No controlado</h3>
      <p style={{ fontSize: 12, color: "var(--fg-muted)" }}>
        El DOM guarda el valor. React solo lo lee al hacer submit.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input ref={ref} placeholder="Escribe algo..." />
        <button type="submit">Enviar</button>
      </form>
      {submitted && <p>Enviado: <code>"{submitted}"</code></p>}
    </section>
  );
}

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui", display: "flex", flexDirection: "column", gap: 24 }}>
      <ControlledForm />
      <hr />
      <UncontrolledForm />
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "Mezclar value sin onChange produce un input 'read-only'. React te lo avisa en consola.",
      "defaultValue no es lo mismo que value — defaultValue es solo el valor inicial (no controlado).",
      "Para inputs de tipo file nunca se usan controlados porque el navegador no permite setear su valor por seguridad.",
    ],
  },

  {
    id: "prop-drilling",
    label: "Prop drilling",
    kicker: "Entrevista · Arquitectura",
    title: "Cuando los props viajan por donde no deben",
    lede: "Prop drilling ocurre cuando un dato pasa por varios componentes intermedios solo para llegar a uno profundo que realmente lo necesita. Los intermediarios no usan el dato — solo lo reenvían.",
    sections: [
      {
        heading: "El problema",
        body: (
          <p>
            Cada componente intermedio recibe un prop que no usa, quedando acoplado a una decisión
            que no le pertenece. Si el dato cambia de forma, hay que actualizar todos los eslabones
            de la cadena.
          </p>
        ),
      },
      {
        heading: "Las soluciones",
        body: (
          <p>
            <strong>Context API</strong> — para estado global que muchos componentes necesitan
            (tema, usuario, idioma). <strong>Composición</strong> — pasar componentes como{" "}
            <code>children</code> en vez de datos, evitando el túnel completamente.{" "}
            <strong>Estado externo</strong> (Zustand, Redux) — cuando la lógica de estado es
            compleja.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { createContext, useContext, useState } from "react";

// ── Sin Context: drilling a través de B y C ───
function WithDrilling() {
  const [user, setUser] = useState("Ana");
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 6, padding: 12 }}>
      <strong>Con prop drilling</strong>
      <A_drill user={user} setUser={setUser} />
    </div>
  );
}
function A_drill({ user, setUser }) {
  return <B_drill user={user} setUser={setUser} />;   // A no usa user
}
function B_drill({ user, setUser }) {
  return <C_drill user={user} setUser={setUser} />;   // B tampoco
}
function C_drill({ user, setUser }) {
  return (
    <div>
      Hola, <strong>{user}</strong>
      <button onClick={() => setUser("Carlos")} style={{ marginLeft: 8 }}>
        Cambiar
      </button>
    </div>
  );
}

// ── Con Context: solo C accede al contexto ────
const UserCtx = createContext(null);

function WithContext() {
  const [user, setUser] = useState("Ana");
  return (
    <UserCtx.Provider value={{ user, setUser }}>
      <div style={{ border: "1px solid var(--line)", borderRadius: 6, padding: 12, marginTop: 12 }}>
        <strong>Con Context</strong>
        <A_ctx />
      </div>
    </UserCtx.Provider>
  );
}
function A_ctx() { return <B_ctx />; }
function B_ctx() { return <C_ctx />; }
function C_ctx() {
  const { user, setUser } = useContext(UserCtx);
  return (
    <div>
      Hola, <strong>{user}</strong>
      <button onClick={() => setUser("Carlos")} style={{ marginLeft: 8 }}>
        Cambiar
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <WithDrilling />
      <WithContext />
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "Context no es un reemplazo automático del prop drilling — para props que solo pasan 2 niveles, el drilling es más legible.",
      "Poner todo en Context causa re-renders innecesarios en componentes que no usan el dato que cambió.",
      "La composición con children suele resolver prop drilling sin introducir Context ni estado global.",
    ],
  },

  {
    id: "hoc",
    label: "HOC",
    kicker: "Entrevista · Patrones",
    title: "Componentes que envuelven componentes",
    lede: "Un Higher-Order Component es una función que recibe un componente y devuelve uno nuevo con comportamiento adicional. Es el patrón de reutilización de lógica de la era pre-hooks — hoy los hooks lo reemplazan en la mayoría de casos, pero siguen apareciendo en código legacy y librerías.",
    sections: [
      {
        heading: "La firma",
        body: (
          <p>
            <code>const Mejorado = withAlgo(Componente)</code>. El HOC añade props, envuelve en
            providers, inyecta comportamiento — sin que el componente original sepa que está siendo
            envuelto. Por convención se nombran con prefijo <code>with</code>.
          </p>
        ),
      },
      {
        heading: "HOC vs Hook",
        body: (
          <p>
            Los hooks son más simples y componibles. Usa HOC cuando necesitas envolver el árbol JSX
            del componente (error boundaries, providers) o cuando trabajas con una librería que los
            requiere. Para lógica pura reutilizable, un hook personalizado es la opción moderna.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useState } from "react";

// HOC que añade un logger de renders
function withLogger(Component) {
  return function Logged(props) {
    console.log(\`[render] \${Component.displayName || Component.name}\`, props);
    return <Component {...props} />;
  };
}

// HOC que añade un loading state
function withLoading(Component) {
  return function WithLoading({ isLoading, ...rest }) {
    if (isLoading) return <p style={{ color: "var(--fg-muted)" }}>Cargando...</p>;
    return <Component {...rest} />;
  };
}

// Componente base
function UserCard({ name, role }) {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 6, padding: 12 }}>
      <strong>{name}</strong>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)" }}>{role}</p>
    </div>
  );
}

// Composición de HOCs
const UserCardEnhanced = withLogger(withLoading(UserCard));

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <button onClick={() => setLoading((v) => !v)} style={{ marginBottom: 16 }}>
        {loading ? "Simular carga completa" : "Simular cargando"}
      </button>
      <UserCardEnhanced
        isLoading={loading}
        name="Ana García"
        role="Frontend Engineer"
      />
      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 12 }}>
        Abre la consola para ver el log de renders.
      </p>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "No definas HOCs dentro de un componente — se recrean en cada render y React desmonta/monta el árbol completo.",
      "Los HOCs ocultan el origen de los props, dificultando el debugging. Con hooks, el origen siempre es explícito.",
      "Al componer múltiples HOCs, el orden importa — se aplican de adentro hacia afuera.",
    ],
  },

  {
    id: "render-props",
    label: "Render Props",
    kicker: "Entrevista · Patrones",
    title: "Delegar el qué renderizar",
    lede: "El patrón Render Props consiste en pasar una función como prop que el componente llama para obtener JSX. El componente controla cuándo y con qué datos renderiza; el padre controla qué se renderiza con esos datos.",
    sections: [
      {
        heading: "La idea central",
        body: (
          <p>
            En lugar de que el componente decida su propio output, recibe una función{" "}
            <code>render</code> (o <code>children</code> como función) y la invoca con sus datos
            internos. El padre recibe esos datos y devuelve JSX — separando lógica de presentación.
          </p>
        ),
      },
      {
        heading: "Render Props vs hooks",
        body: (
          <p>
            Los hooks resuelven el mismo problema (compartir lógica) de forma más directa. Hoy el
            patrón render props aparece principalmente en librerías de UI como Headless UI o Radix,
            donde la lógica de accesibilidad se separa completamente de la presentación visual.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useState, useEffect } from "react";

// Componente que encapsula la lógica del mouse
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return render(pos);  // delega el JSX al padre
}

// Dos usos distintos del mismo MouseTracker
export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h3>Coordenadas</h3>
      <MouseTracker
        render={({ x, y }) => (
          <p>x: {x} · y: {y}</p>
        )}
      />

      <h3 style={{ marginTop: 24 }}>Punto seguidor</h3>
      <div style={{ position: "relative", height: 200, border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden" }}>
        <MouseTracker
          render={({ x, y }) => (
            <div style={{
              position: "absolute",
              left: x - 6,
              top: y - 6,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "var(--accent)",
              pointerEvents: "none",
              transform: "translate(-50%,-50%)"
            }} />
          )}
        />
        <p style={{ padding: 12, color: "var(--fg-muted)", fontSize: 13 }}>Mueve el cursor aquí</p>
      </div>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "Si pasas una función flecha inline como render prop, se crea una nueva función en cada render — puede romper React.memo en componentes hijos.",
      "Children como función (children prop) es funcionalmente idéntico a render prop — es solo una convención de nombre.",
      "Para lógica pura sin JSX propio, un custom hook es siempre más limpio que render props.",
    ],
  },

  {
    id: "componentes-puros",
    label: "Componentes puros",
    kicker: "Entrevista · Rendimiento",
    title: "El mismo input, siempre el mismo output",
    lede: "Un componente puro es aquel que dado las mismas props produce exactamente el mismo JSX — sin efectos secundarios en el render. React puede saltarse su re-render si las props no cambiaron, haciendo la UI predecible y optimizable.",
    sections: [
      {
        heading: "React.memo",
        body: (
          <p>
            <code>memo(Componente)</code> envuelve el componente y memoriza el último output. En el
            siguiente render, si las props son iguales por referencia (shallow equality), React
            reutiliza el resultado anterior sin llamar a la función. Útil en hijos costosos que
            reciben props estables.
          </p>
        ),
      },
      {
        heading: "La trampa de las referencias",
        body: (
          <p>
            <code>memo</code> compara props con <code>Object.is</code>. Si el padre pasa un objeto
            literal o función inline, crea una nueva referencia en cada render — <code>memo</code>{" "}
            siempre ve props "distintas" y nunca se salta el render. Por eso se combina con{" "}
            <code>useMemo</code> y <code>useCallback</code>.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useState, memo, useCallback } from "react";

let renderCount = 0;

const ExpensiveChild = memo(function ExpensiveChild({ onClick, label }) {
  renderCount++;
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 6, padding: 12 }}>
      <p style={{ margin: 0 }}>{label}</p>
      <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--fg-muted)" }}>
        Renders: {renderCount}
      </p>
      <button onClick={onClick} style={{ marginTop: 8 }}>Acción</button>
    </div>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  const [stable, setStable] = useState(true);

  // Con useCallback: referencia estable → memo funciona
  const stableClick = useCallback(() => alert("click"), []);
  // Sin useCallback: nueva función cada render → memo falla
  const unstableClick = () => alert("click");

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <p>Contador padre: <strong>{count}</strong></p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setCount((c) => c + 1)}>Re-render padre</button>
        <button onClick={() => setStable((v) => !v)}>
          {stable ? "Pasar función inestable" : "Pasar useCallback"}
        </button>
      </div>
      <ExpensiveChild
        onClick={stable ? stableClick : unstableClick}
        label={stable ? "Con useCallback (memo funciona)" : "Sin useCallback (memo falla)"}
      />
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "memo no es gratis — tiene un costo de comparación. Solo úsalo cuando el render del hijo sea mediblemente costoso.",
      "memo solo hace shallow comparison. Si pasas objetos anidados con la misma estructura pero distinta referencia, siempre re-renderiza.",
      "Un componente puede ser puro conceptualmente aunque use hooks — lo que importa es que el render sea determinístico dadas las mismas props y estado.",
    ],
  },
]
