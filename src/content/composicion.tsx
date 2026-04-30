import { Playground } from "@/components/playground"
import type { Concept } from "./types"

export const composicion: Concept[] = [
  {
    id: "useContext",
    label: "useContext",
    kicker: "Hook · Contexto",
    title: "Saltarse el prop drilling",
    lede: "useContext lee un valor publicado por el Provider más cercano hacia arriba en el árbol. Es la forma de compartir tema, idioma, sesión o cualquier dependencia transversal sin pasarla por cada componente.",
    sections: [
      {
        heading: "Tres piezas",
        body: (
          <p>
            <code>createContext(default)</code> crea el canal. Un{" "}
            <code>&lt;Ctx.Provider value=...&gt;</code> publica un valor.{" "}
            <code>useContext(Ctx)</code> lo lee en cualquier descendiente.
          </p>
        ),
      },
      {
        heading: "Costos a tener en cuenta",
        body: (
          <p>
            Cuando el value cambia, todos los consumidores se re-renderizan. Si tu value es{" "}
            <code>{`{ user, setUser }`}</code> creado inline, cambia en cada render. Memoiza el
            value o sepáralo en varios contextos.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { createContext, useContext, useState, useMemo } from "react";

const ThemeCtx = createContext(null);

function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme requiere ThemeProvider");
  return ctx;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

function Toolbar() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      cambiar a {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

function Card() {
  const { theme } = useTheme();
  const bg = theme === "dark" ? "#1f1f22" : "#e5e3d9";
  const fg = theme === "dark" ? "#e5e5e5" : "#1a1a1a";
  return (
    <div style={{ padding: 16, background: bg, color: fg, borderRadius: 4, marginTop: 12, border: "1px solid rgba(127,127,127,0.22)" }}>
      Tema actual: <strong>{theme}</strong>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ fontFamily: "system-ui", padding: 24 }}>
        <Toolbar />
        <Card />
      </div>
    </ThemeProvider>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "El value pasado al Provider sin memoizar provoca re-renders en todos los consumidores.",
      "Cuesta separar contextos densos: si tu app crece, divide el contexto por concierto (auth ≠ theme ≠ i18n).",
      "Context no reemplaza estado de servidor — para eso usa SWR/React Query/RSC, no un Provider gigante.",
    ],
  },
  {
    id: "createPortal",
    label: "createPortal",
    kicker: "API · React DOM",
    title: "Renderizar fuera del árbol",
    lede: "createPortal renderiza un nodo en otra parte del DOM mientras lo mantiene como hijo lógico de tu componente. La pieza que hace que modales y tooltips escapen overflow:hidden y z-index hostiles.",
    sections: [
      {
        heading: "Lo que conserva",
        body: (
          <p>
            Aunque el DOM esté en otro sitio, el portal sigue dentro del árbol de React: contextos,
            eventos sintéticos burbujean hacia el padre lógico, y los efectos disparan como si
            estuvieran en su lugar.
          </p>
        ),
      },
      {
        heading: "El destino",
        body: (
          <p>
            Suele ser <code>document.body</code> o un nodo dedicado con id <code>modal-root</code>.
            Garantiza que el destino existe antes del render — montarlo en el index.html es lo más
            seguro.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useState } from "react";
import { createPortal } from "react-dom";

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
        display: "grid", placeItems: "center", zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface-1)", padding: 24, borderRadius: 6, minWidth: 280,
          color: "var(--fg)",
          border: "1px solid var(--line-strong)",
          fontFamily: "system-ui", boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: 16 }}>cerrar</button>
      </div>
    </div>,
    document.body
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      fontFamily: "system-ui", padding: 24,
      overflow: "hidden", height: 200, border: "1px solid var(--line-strong)", borderRadius: 4,
    }}>
      <p>Este contenedor tiene <code>overflow:hidden</code> y altura limitada.</p>
      <button onClick={() => setOpen(true)}>abrir modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 style={{ margin: 0 }}>Hola desde el portal</h3>
        <p>Aunque mi padre lógico esté ahogado, yo cubro toda la pantalla.</p>
      </Modal>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "Los eventos burbujean por el árbol REACT, no por el DOM. Onclicks en el modal llegan a su padre lógico.",
      "Si el destino del portal aún no existe en el DOM, el render falla — móntalo antes.",
      "Cuidado con el foco: cuando abras un modal, mueve el foco dentro y atrápalo (focus trap).",
    ],
  },
  {
    id: "lazy",
    label: "lazy",
    kicker: "API · Code splitting",
    title: "Importar bajo demanda",
    lede: "lazy() recibe una función que devuelve un import dinámico, y produce un componente que carga su código solo cuando se renderiza por primera vez. Combinado con Suspense, divide el bundle automáticamente.",
    sections: [
      {
        heading: "Dónde brilla",
        body: (
          <p>
            Vistas que no se ven hasta que el usuario navega, modales pesados que pocos abren,
            editores ricos, gráficos. Todo lo que infla el bundle inicial sin justificar su coste
            para el primer pintado.
          </p>
        ),
      },
      {
        heading: "Suspense obligatorio",
        body: (
          <p>
            Mientras el código se descarga, el componente suspende. Necesitas un{" "}
            <code>&lt;Suspense fallback=...&gt;</code> arriba o React lanza un error.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { lazy, Suspense, useState } from "react";

const Heavy = lazy(() =>
  // simula una descarga lenta
  new Promise((resolve) =>
    setTimeout(() => resolve({ default: HeavyComponent }), 900)
  )
);

function HeavyComponent() {
  return (
    <div style={{ padding: 16, background: "var(--surface-1)", borderRadius: 4, border: "1px solid var(--line-strong)" }}>
      <strong>Componente pesado</strong> — imagina un editor de texto rico,
      un gráfico, un mapa. Solo se descarga ahora.
    </div>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <button onClick={() => setShow(true)}>cargar componente</button>
      <div style={{ marginTop: 16 }}>
        {show && (
          <Suspense fallback={<em style={{ color: "var(--fg-muted)" }}>descargando...</em>}>
            <Heavy />
          </Suspense>
        )}
      </div>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "lazy SOLO acepta un default export — re-exporta si tu módulo usa named exports.",
      "Cargar todo lazy mata el TTI: el primer click se siente lento. Mide qué vale la pena diferir.",
      "En SSR, Suspense + lazy se comporta distinto — revisa la doc del framework (Next, Remix).",
    ],
  },
  {
    id: "useId",
    label: "useId",
    kicker: "Hook · Accesibilidad",
    title: "IDs únicos, estables",
    lede: "useId genera un identificador único por componente, estable entre renders y consistente entre cliente y servidor. Pensado para conectar inputs con labels, aria-describedby, y otros pares accesibles.",
    sections: [
      {
        heading: "Por qué no Math.random()",
        body: (
          <p>
            En SSR, el ID generado en el servidor debe coincidir con el del cliente para evitar
            errores de hidratación. <code>useId</code> garantiza esa correspondencia; los valores
            aleatorios no.
          </p>
        ),
      },
      {
        heading: "No para keys de lista",
        body: (
          <p>
            useId entrega un ID por componente, no por elemento. Para keys de listas usa el ID de
            los datos. Para varios IDs en un mismo componente, concatena sufijos:{" "}
            <code>{`\`\${id}-name\``}</code>.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useId } from "react";

function Field({ label, hint, type = "text" }) {
  const id = useId();
  const hintId = id + "-hint";
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={id} style={{ display: "block", fontWeight: 600 }}>
        {label}
      </label>
      <input id={id} type={type} aria-describedby={hintId} style={{ padding: 8, width: "100%" }} />
      <small id={hintId} style={{ color: "var(--fg-muted)" }}>{hint}</small>
    </div>
  );
}

export default function App() {
  return (
    <form style={{ fontFamily: "system-ui", padding: 24 }}>
      <Field label="Nombre" hint="Como aparece en tu pasaporte." />
      <Field label="Email" type="email" hint="Te enviaremos un código." />
      <p style={{ color: "var(--fg-muted)", fontSize: 13 }}>
        Inspecciona el DOM: cada Field tiene un id distinto y estable, sin colisiones.
      </p>
    </form>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "No es para keys de listas — esas vienen de tus datos, no del DOM.",
      "El formato del id (':r0:') es opaco. No dependas de él, solo úsalo como referencia.",
      "Llamar useId N veces dentro de un mismo componente da N IDs distintos — preferible concatenar sufijos.",
    ],
  },
  {
    id: "useFormStatus",
    label: "useFormStatus",
    kicker: "Hook · React 19 · react-dom",
    title: "Leer el estado del form desde un hijo",
    lede: "useFormStatus lee el estado del formulario más cercano en el árbol: si está pendiente, qué datos envió y con qué método. Permite crear componentes reutilizables sin prop drilling.",
    sections: [
      {
        heading: "Regla de uso",
        body: (
          <p>
            Debe llamarse desde un componente <em>hijo</em> del <code>&lt;form&gt;</code>, no desde
            el mismo componente que lo renderiza. Es el patrón inverso a pasar{" "}
            <code>isPending</code> como prop.
          </p>
        ),
      },
      {
        heading: "Qué expone",
        body: (
          <p>
            <code>{"{ pending, data, method, action }"}</code>. <em>pending</em> es el flag más
            usado. <em>data</em> es el <code>FormData</code> en vuelo — útil para mostrar un preview
            del valor mientras espera.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        dependencies={{ react: "^19.0.0", "react-dom": "^19.0.0" }}
        files={{
          "/App.js": `import { useActionState } from "react";
import { useFormStatus } from "react-dom";

async function saveUsername(prev, formData) {
  await new Promise(r => setTimeout(r, 1000));
  const username = formData.get("username")?.trim();
  if (!username) return { error: "El nombre no puede estar vacío." };
  if (username.length < 3) return { error: "Mínimo 3 caracteres." };
  return { saved: username };
}

// Este componente HIJO puede leer el estado del form sin props
function SubmitButton() {
  const { pending, data } = useFormStatus();
  const preview = data?.get("username");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button type="submit" disabled={pending}>
        {pending ? "Guardando..." : "Guardar"}
      </button>
      {pending && preview && (
        <span style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic" }}>
          guardando "{preview}"...
        </span>
      )}
    </div>
  );
}

export default function App() {
  const [state, formAction] = useActionState(saveUsername, null);
  return (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <h3 style={{ margin: "0 0 12px", fontSize: 15 }}>Editar perfil</h3>
      {state?.saved && (
        <p style={{ fontSize: 13, marginBottom: 12 }}>
          ✅ Guardado como <strong>@{state.saved}</strong>
        </p>
      )}
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="username" placeholder="Nombre de usuario"
          defaultValue={state?.saved ?? ""} />
        {state?.error && (
          <p style={{ color: "#c87474", fontSize: 12, margin: 0 }}>{state.error}</p>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "useFormStatus no funciona en el componente que renderiza el form — debe estar en un hijo.",
      "Solo tiene acceso al form del cual es descendiente directo, no a forms hermanos o anidados.",
      "Importar desde 'react-dom', no desde 'react'.",
    ],
  },
]
