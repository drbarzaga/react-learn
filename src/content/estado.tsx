import { Playground } from "@/components/playground"
import type { Concept } from "./types"

export const estado: Concept[] = [
  {
    id: "useState",
    label: "useState",
    kicker: "Hook · Estado local",
    title: "Una memoria mínima",
    lede: "useState convierte un componente en algo que recuerda. Cada llamada reserva una celda de memoria atada a esa instancia, y cada actualización agenda una nueva ronda de render.",
    sections: [
      {
        heading: "La firma",
        body: (
          <p>
            <code>const [estado, setEstado] = useState(inicial)</code>. El argumento puede ser un
            valor o una función — usa la función cuando el cálculo inicial es costoso, así solo
            corre en el primer render.
          </p>
        ),
      },
      {
        heading: "Actualización funcional",
        body: (
          <p>
            Cuando el siguiente estado depende del anterior, pasa una función a{" "}
            <code>setEstado</code>. React te entrega el valor más reciente, evitando carreras al
            actualizar varias veces seguidas dentro del mismo evento.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useState } from "react";

// Inicial costoso → función. Solo corre una vez.
function inicial() {
  console.log("calculando inicial...");
  return 0;
}

export default function App() {
  const [count, setCount] = useState(inicial);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <p style={{ fontSize: 48, margin: 0, display: "flex", justifyContent: "center" }}>{count}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount((c) => c - 1)}>−1</button>
        <button onClick={() => {
          // Tres updates funcionales se aplican en cadena.
          setCount((c) => c + 1);
          setCount((c) => c + 1);
          setCount((c) => c + 1);
        }}>+3 (funcional)</button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "Usar setEstado(estado + 1) tres veces seguidas suma 1, no 3 — React lee el valor capturado por el render.",
      "El estado no se 'mezcla' como en clases: si guardas un objeto, debes copiarlo entero al actualizar.",
      "Cambiar el array de dependencias de useState no existe — el inicial solo se honra en el primer render.",
    ],
  },
  {
    id: "useReducer",
    label: "useReducer",
    kicker: "Hook · Estado complejo",
    title: "Transiciones explícitas",
    lede: "Cuando el siguiente estado depende del anterior y de qué pasó, useReducer convierte la lógica difusa de varios setEstado en una transición nombrada y testeable.",
    sections: [
      {
        heading: "Forma del reducer",
        body: (
          <p>
            <code>(estado, acción) =&gt; nuevoEstado</code>. Mantén el reducer puro: sin fetch, sin
            mutación, sin <code>Math.random()</code>. Si necesitas efectos, dispárlos después del{" "}
            <code>dispatch</code>.
          </p>
        ),
      },
      {
        heading: "Cuándo prefiere a useState",
        body: (
          <p>
            Cuando hay <em>varias formas</em> de modificar el mismo estado, cuando la lógica de
            transición se repite en varios eventos, o cuando quieres registrar/depurar cada cambio
            en un único punto.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useReducer } from "react";

const initial = { items: [], next: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        next: state.next + 1,
        items: [...state.items, { id: state.next, text: action.text, done: false }],
      };
    case "toggle":
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, done: !it.done } : it
        ),
      };
    case "remove":
      return { ...state, items: state.items.filter((it) => it.id !== action.id) };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.currentTarget.text.value.trim();
          if (text) dispatch({ type: "add", text });
          e.currentTarget.reset();
        }}
      >
        <input name="text" placeholder="agregar tarea..." autoFocus />
      </form>
      <ul style={{ paddingLeft: 18 }}>
        {state.items.map((it) => (
          <li key={it.id} style={{ textDecoration: it.done ? "line-through" : "none" }}>
            <span onClick={() => dispatch({ type: "toggle", id: it.id })} style={{ cursor: "pointer" }}>
              {it.text}
            </span>
            <button onClick={() => dispatch({ type: "remove", id: it.id })} style={{ marginLeft: 8 }}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "El reducer DEBE ser puro: nada de fetch, console.log con efectos, o IDs aleatorios.",
      "No mutes el estado: state.items.push() rompe React. Devuelve siempre objetos/arrays nuevos.",
      "Si guardas valores que cambian poco, useReducer puede ser overkill — useState basta.",
    ],
  },
  {
    id: "useRef",
    label: "useRef",
    kicker: "Hook · Referencia mutable",
    title: "Una caja que persiste",
    lede: "useRef te da una caja con la propiedad .current que sobrevive entre renders pero, a diferencia del estado, no dispara re-renders cuando cambias su contenido.",
    sections: [
      {
        heading: "Dos usos honestos",
        body: (
          <>
            <p>
              <strong>Acceder al DOM:</strong> pásala a un nodo con <code>ref={"{miRef}"}</code> y
              lee <code>miRef.current</code> después del montaje.
            </p>
            <p>
              <strong>Guardar valores entre renders:</strong> contadores, IDs de timers, valores
              previos — cualquier cosa que necesitas recordar pero no quieres que dispare
              re-renders.
            </p>
          </>
        ),
      },
      {
        heading: "Por qué no estado",
        body: (
          <p>
            Si renderizar el valor no cambia el UI, no debe estar en el estado. Mantenerlo en una
            ref evita ciclos de render y mantiene el componente más rápido.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        files={{
          "/App.js": `import { useRef, useState, useEffect } from "react";

export default function App() {
  const inputRef = useRef(null);
  const renders = useRef(0);
  const [text, setText] = useState("");

  useEffect(() => { renders.current += 1; });

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="escribe algo..."
        style={{ padding: 8, width: "100%" }}
      />
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button onClick={() => inputRef.current?.focus()}>foco</button>
        <button onClick={() => { inputRef.current.value = ""; setText(""); }}>limpiar</button>
      </div>
      <p style={{ marginTop: 16, fontFamily: "monospace", color: "var(--fg-muted)" }}>
        renders: {renders.current} · texto: "{text}"
      </p>
      <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>
        Fíjate: el contador NO dispara re-renders. Solo cambia al renderizar por otro motivo.
      </p>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "No leas ref.current durante el render para tomar decisiones — su valor puede no estar 'oficialmente' actualizado todavía.",
      "Mutar ref.current dentro del render rompe la pureza esperada. Hazlo en eventos o efectos.",
      "Si necesitas reaccionar a un cambio, necesitas estado, no una ref.",
    ],
  },
  {
    id: "useOptimistic",
    label: "useOptimistic",
    kicker: "Hook · React 19",
    title: "UI optimista sin bloquear",
    lede: "useOptimistic muestra un estado provisional mientras una operación async está en curso. La UI responde al instante; si la operación falla sin actualizar el estado real, React revierte automáticamente.",
    sections: [
      {
        heading: "La firma",
        body: (
          <p>
            <code>{"const [optimisticState, addOptimistic] = useOptimistic(state, updateFn)"}</code>
            . <em>state</em> es el real; <em>updateFn</em> describe cómo calcular el estado
            provisional a partir de él y un valor temporal.
          </p>
        ),
      },
      {
        heading: "Cuándo usarlo",
        body: (
          <p>
            Acciones que casi siempre tienen éxito: likes, votos, mensajes enviados, arrastrar y
            soltar. No lo uses cuando el fallo sea frecuente o costoso de deshacer visualmente.
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        dependencies={{ react: "^19.0.0", "react-dom": "^19.0.0" }}
        files={{
          "/App.js": `import { useState, useOptimistic, useTransition } from "react";

async function sendMessage(text) {
  await new Promise(r => setTimeout(r, 900));
  if (Math.random() < 0.2) throw new Error("Error de red");
  return { id: Date.now(), text };
}

export default function App() {
  const [messages, setMessages] = useState([{ id: 1, text: "Hola 👋" }]);
  const [optimisticMsgs, addOptimistic] = useOptimistic(
    messages,
    (prev, text) => [...prev, { id: Date.now(), text, pending: true }]
  );
  const [error, setError] = useState(null);
  const [, startTransition] = useTransition();

  function handleSend(e) {
    e.preventDefault();
    const text = e.target.msg.value.trim();
    if (!text) return;
    e.target.reset();
    setError(null);

    startTransition(async () => {
      addOptimistic(text);
      try {
        const saved = await sendMessage(text);
        setMessages(prev => [...prev, saved]);
      } catch {
        setError("Falló el envío. Reintenta.");
      }
    });
  }

  return (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
        {optimisticMsgs.map((m, i) => (
          <li key={m.id ?? i} style={{
            padding: "5px 0",
            color: m.pending ? "var(--fg-muted)" : "var(--fg)",
            fontStyle: m.pending ? "italic" : "normal",
            fontSize: 13,
          }}>
            {m.pending ? "⏳ " : "✓ "}{m.text}
          </li>
        ))}
      </ul>
      {error && <p style={{ color: "#c87474", fontSize: 12, marginBottom: 8 }}>{error}</p>}
      <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
        <input name="msg" placeholder="Escribe un mensaje..." style={{ flex: 1 }} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "El estado optimista es temporal — React lo descarta en cuanto el estado real se actualiza.",
      "Si el async falla sin actualizar el estado real, React revierte al original automáticamente.",
      "useOptimistic requiere que la mutación esté dentro de una transition o action async.",
    ],
  },
  {
    id: "useActionState",
    label: "useActionState",
    kicker: "Hook · React 19",
    title: "Estado desde una acción de formulario",
    lede: "useActionState conecta una acción async a un estado local. Recibe la función action y un estado inicial; devuelve el estado actual, la action lista para usar como atributo del form, y un flag isPending.",
    sections: [
      {
        heading: "La firma",
        body: (
          <p>
            <code>{"const [state, formAction, isPending] = useActionState(fn, initial)"}</code>. La{" "}
            <em>fn</em> recibe el estado anterior y el <code>FormData</code>, y retorna el nuevo
            estado — sync o async.
          </p>
        ),
      },
      {
        heading: "Sin useState extra",
        body: (
          <p>
            A diferencia del patrón clásico <em>onSubmit + useState</em>, useActionState centraliza
            el flujo: un solo lugar maneja lógica, estado y pending. Funciona con y sin JS
            habilitado (progressive enhancement).
          </p>
        ),
      },
    ],
    playground: (
      <Playground
        dependencies={{ react: "^19.0.0", "react-dom": "^19.0.0" }}
        files={{
          "/App.js": `import { useActionState } from "react";

async function submitContact(prev, formData) {
  await new Promise(r => setTimeout(r, 900));
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  if (!name || !email) return { error: "Todos los campos son obligatorios." };
  if (!email.includes("@")) return { error: "Email inválido." };
  return { ok: true, name };
}

export default function App() {
  const [state, formAction, isPending] = useActionState(submitContact, null);

  if (state?.ok) {
    return (
      <div style={{ padding: 24 }}>
        <p>✅ Gracias, <strong>{state.name}</strong>. Te contactaremos pronto.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 15 }}>Contacto</h3>
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="name" placeholder="Nombre" disabled={isPending} />
        <input name="email" placeholder="Email" disabled={isPending} />
        {state?.error && (
          <p style={{ color: "#c87474", fontSize: 12, margin: 0 }}>{state.error}</p>
        )}
        <button type="submit" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
`,
        }}
      />
    ),
    pitfalls: [
      "La action recibe el estado ANTERIOR como primer argumento — no olvides retornar el nuevo estado en cada rama.",
      "isPending se activa en cuanto se dispara la action y se desactiva cuando resuelve.",
      "No mezcles useActionState con onSubmit en el mismo form — elige uno u otro.",
    ],
  },
]
