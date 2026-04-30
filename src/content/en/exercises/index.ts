import { counter } from "@/content/exercises/counter"
import { autoFocus } from "@/content/exercises/auto-focus"
import { stopwatch } from "@/content/exercises/stopwatch"
import { listaFiltrada } from "@/content/exercises/lista-filtrada"
import { todoList } from "@/content/exercises/todo-list"
import { formReducer } from "@/content/exercises/form-reducer"
import { fetchUser } from "@/content/exercises/fetch-user"
import { themeContext } from "@/content/exercises/theme-context"
import { debouncedSearch } from "@/content/exercises/debounced-search"
import { lazyModal } from "@/content/exercises/lazy-modal"
import { useCallbackExercise } from "@/content/exercises/use-callback"
import { useMemoFilter } from "@/content/exercises/use-memo-filter"
import { transitionTabs } from "@/content/exercises/transition-tabs"
import { optimisticLike } from "@/content/exercises/optimistic-like"
import { actionForm } from "@/content/exercises/action-form"
import type { Exercise } from "@/content/exercises/types"

export type { Exercise, Difficulty } from "@/content/exercises/types"

type ExerciseOverride = Partial<
  Pick<Exercise, "title" | "lede" | "objectives" | "hint" | "starter" | "solution">
>

const overrides: Record<string, ExerciseOverride> = {
  "lista-filtrada": {
    title: "Real-time filtered list",
    lede: "A search field filters a list of fruits as the user types. The filtered result is derived directly from state — no extra useState or useMemo needed at this scale.",
    objectives: [
      "Declare a query state starting at an empty string",
      "Bind the input to state with value and onChange",
      "Derive filtered as FRUITS.filter(...) directly in the render, without additional useState",
      "Show the result count: '{n} result(s)'",
      "Show a 'No results' message when filtered is empty",
      "'clear' button resets query to an empty string",
    ],
    hint: "You don't need useState for filtered — it's a value derived from the query state. Calculate it directly in the render with .filter(). Derived state is not stored, it's recalculated.",
    starter: {
      "/App.js": `import { useState } from "react";

const FRUITS = [
  "Apple", "Banana", "Cherry", "Peach", "Grape",
  "Kiwi", "Lemon", "Mango", "Orange", "Pear",
  "Pineapple", "Watermelon", "Strawberry", "Melon", "Plum",
];

export default function App() {
  // TODO: declare query state with initial value ""

  // TODO: derive filtered from FRUITS using query (no useState)

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 320 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          // TODO: bind value and onChange to query state
          placeholder="Search fruit..."
          style={{ flex: 1 }}
        />
        <button /* TODO: onClick that resets query to "" */>
          clear
        </button>
      </div>

      {/* TODO: show '{n} result(s)' */}

      {/* TODO: show "No results" when filtered is empty */}

      <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
        {/* TODO: render filtered with key and text */}
      </ul>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState } from "react";

const FRUITS = [
  "Apple", "Banana", "Cherry", "Peach", "Grape",
  "Kiwi", "Lemon", "Mango", "Orange", "Pear",
  "Pineapple", "Watermelon", "Strawberry", "Melon", "Plum",
];

export default function App() {
  const [query, setQuery] = useState("");

  const filtered = FRUITS.filter((f) =>
    f.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 320 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search fruit..."
          style={{ flex: 1 }}
        />
        <button onClick={() => setQuery("")}>clear</button>
      </div>

      <p style={{ margin: "0 0 8px", color: "var(--fg-muted)", fontSize: 13 }}>
        {filtered.length} result(s)
      </p>

      {filtered.length === 0 && (
        <p style={{ color: "var(--fg-muted)" }}>No results</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
        {filtered.map((fruit) => (
          <li
            key={fruit}
            style={{ padding: "4px 0", borderBottom: "1px solid var(--line)" }}
          >
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
    },
  },
  counter: {
    title: "Classic counter",
    lede: "A counter with controls to increment, decrement, and reset. The '+3' button must add three units even if pressed several times in a row — use functional updates.",
    objectives: [
      "Declare a count state that starts at 0",
      "'+' button adds 1, '−' button subtracts 1",
      "'reset' button returns to 0",
      "'+3' button adds 3 using setCount(c => c + 1) three times",
      "The display must show the current value centered",
    ],
    hint: "Passing a function to setCount gives you the most recent value; passing a number uses the value captured in the render.",
    starter: {
      "/App.js": `import { useState } from "react";

export default function App() {
  // TODO: declare count state with initial value 0

  // TODO: implement handlers for +, −, reset and +3

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <p style={{ fontSize: 48, margin: 0, textAlign: "center" }}>
        {/* show the value */}
        0
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
        <button>+</button>
        <button>−</button>
        <button>reset</button>
        <button>+3</button>
      </div>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const plusThree = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <p style={{ fontSize: 48, margin: 0, textAlign: "center" }}>{count}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <button onClick={() => setCount((c) => c > 0 ? c - 1 : 0)}>−</button>
        <button onClick={() => setCount(0)}>reset</button>
        <button onClick={plusThree}>+3</button>
      </div>
    </div>
  );
}
`,
    },
  },
  "auto-focus": {
    title: "Focus and silent counter",
    lede: "The input must focus on mount and when pressing 'Focus'. Also, count how many times the component re-rendered without causing additional re-renders.",
    objectives: [
      "Create a ref for the input and focus it on mount",
      "'Focus' button that applies programmatic focus",
      "Keep a render counter in another ref — must NOT cause re-renders",
      "The input text is controlled state",
      "'Clear' button resets the text and the input",
    ],
    hint: "useRef.current persists between renders without triggering them. useState does trigger them. Use each where it belongs.",
    starter: {
      "/App.js": `import { useState, useRef, useEffect } from "react";

export default function App() {
  // TODO: ref for the input
  // TODO: ref to count renders
  const [text, setText] = useState("");

  // TODO: useEffect that focuses the input on mount
  // TODO: increment render counter on each render (no setState)

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="type something..."
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button>Focus</button>
        <button>Clear</button>
      </div>
      <p style={{ marginTop: 12, color: "var(--fg-muted)", fontFamily: "monospace" }}>
        renders: 0 · text: "{text}"
      </p>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState, useRef, useEffect } from "react";

export default function App() {
  const inputRef = useRef(null);
  const renders = useRef(0);
  const [text, setText] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Incremented on each render. Being in a ref, it doesn't trigger re-renders.
  renders.current += 1;

  const clear = () => {
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="type something..."
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => inputRef.current?.focus()}>Focus</button>
        <button onClick={clear}>Clear</button>
      </div>
      <p style={{ marginTop: 12, color: "var(--fg-muted)", fontFamily: "monospace" }}>
        renders: {renders.current} · text: "{text}"
      </p>
    </div>
  );
}
`,
    },
  },
  stopwatch: {
    title: "Stopwatch with intervals",
    lede: "Build a stopwatch you can start, pause, and reset. Use a ref to store the interval ID — not state — and always clean up in the cleanup function so the timer doesn't stay alive when unmounted.",
    objectives: [
      "elapsed (ms) state that starts at 0",
      "running (boolean) state that controls the start/pause button",
      "When running, use setInterval every 10ms with functional update: setElapsed(e => e + 10)",
      "Store the interval ID in a useRef — not in state",
      "The useEffect cleanup calls clearInterval with the stored ID",
      "'reset' button sets elapsed to 0 and pauses",
      "Output format: mm:ss.cc (centiseconds)",
    ],
    hint: "Return a cleanup function from useEffect that calls clearInterval. The useEffect should depend on [running] so it restarts when pausing/resuming.",
    starter: {
      "/App.js": `import { useState, useRef, useEffect } from "react";

function format(ms) {
  const total = Math.floor(ms / 10);
  const cs = String(total % 100).padStart(2, "0");
  const s = String(Math.floor(total / 100) % 60).padStart(2, "0");
  const m = String(Math.floor(total / 6000)).padStart(2, "0");
  return \`\${m}:\${s}.\${cs}\`;
}

export default function App() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  // TODO: ref to store the interval ID

  // TODO: useEffect that starts / clears the interval based on 'running'
  //       use setElapsed(e => e + 10) inside setInterval

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", textAlign: "center" }}>
      <p style={{ fontSize: 48, margin: 0, fontFamily: "ui-monospace, monospace" }}>
        {format(elapsed)}
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
        <button onClick={() => setRunning((r) => !r)}>
          {running ? "pause" : "start"}
        </button>
        <button onClick={() => { setElapsed(0); setRunning(false); }}>
          reset
        </button>
      </div>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState, useRef, useEffect } from "react";

function format(ms) {
  const total = Math.floor(ms / 10);
  const cs = String(total % 100).padStart(2, "0");
  const s = String(Math.floor(total / 100) % 60).padStart(2, "0");
  const m = String(Math.floor(total / 6000)).padStart(2, "0");
  return \`\${m}:\${s}.\${cs}\`;
}

export default function App() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    // Functional update: always adds to the most recent value,
    // without capturing 'elapsed' in the closure.
    intervalRef.current = setInterval(() => {
      setElapsed((e) => e + 10);
    }, 10);
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running]);

  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", textAlign: "center" }}>
      <p style={{ fontSize: 48, margin: 0, fontFamily: "ui-monospace, monospace" }}>
        {format(elapsed)}
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
        <button onClick={() => setRunning((r) => !r)}>
          {running ? "pause" : "start"}
        </button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  );
}
`,
    },
  },
  "todo-list": {
    title: "Todo list with useReducer",
    lede: "A task list with three actions: add, toggle done, and remove. Implement the reducer keeping purity rules: no mutation, each transition returns a new state.",
    objectives: [
      "Define a reducer with actions: 'add', 'toggle', 'remove'",
      "Initial state: { items: [], next: 1 } — next serves as an incremental ID",
      "Each item: { id, text, done }",
      "Add via a form with a text input",
      "Toggle done with a click on the text",
      "Remove with a button per item",
    ],
    hint: "Treat each switch case as a pure function: receives state and action, returns a new object without touching the previous one.",
    starter: {
      "/App.js": `import { useReducer } from "react";

const initial = { items: [], next: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      // TODO: add an item { id, text, done: false }
      return state;
    case "toggle":
      // TODO: toggle done for item with action.id
      return state;
    case "remove":
      // TODO: remove item with action.id
      return state;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.currentTarget.text.value.trim();
          if (text) dispatch({ type: "add", text });
          e.currentTarget.reset();
        }}
      >
        <input name="text" placeholder="add task..." autoFocus style={{ width: "100%" }} />
      </form>
      <ul style={{ paddingLeft: 18, marginTop: 12 }}>
        {state.items.map((it) => (
          <li key={it.id} style={{ textDecoration: it.done ? "line-through" : "none", marginBottom: 4 }}>
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
    },
    solution: {
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
      return {
        ...state,
        items: state.items.filter((it) => it.id !== action.id),
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.currentTarget.text.value.trim();
          if (text) dispatch({ type: "add", text });
          e.currentTarget.reset();
        }}
      >
        <input name="text" placeholder="add task..." autoFocus style={{ width: "100%" }} />
      </form>
      <ul style={{ paddingLeft: 18, marginTop: 12 }}>
        {state.items.map((it) => (
          <li key={it.id} style={{ textDecoration: it.done ? "line-through" : "none", marginBottom: 4 }}>
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
    },
  },
  "form-reducer": {
    title: "Form with validation",
    lede: "A registration form with three fields (email, password, confirmation). Model the changes and validation with useReducer: each named action, pure reducer, errors derived on each transition.",
    objectives: [
      "Reducer with actions 'change', 'blur', 'submit'",
      "State: { values, touched, submitted } — errors are derived in render, not stored",
      "Validate email (format), password (≥ 6 chars), confirm (equals password)",
      "Only show errors for a field when it's 'touched' or after submit",
      "Submit disabled if there are errors — but computed in render, not stored",
      "On successful submit, show a 'sent' state",
    ],
    hint: "Don't store 'isValid' in state — derive it from errors. Errors are recalculated in the reducer with a pure validate(values) function.",
    starter: {
      "/App.js": `import { useReducer } from "react";

const initial = {
  values: { email: "", password: "", confirm: "" },
  touched: { email: false, password: false, confirm: false },
  submitted: false,
};

function validate(values) {
  const errors = {};
  if (!/^\\S+@\\S+\\.\\S+$/.test(values.email)) errors.email = "invalid email";
  if (values.password.length < 6) errors.password = "at least 6 characters";
  if (values.confirm !== values.password) errors.confirm = "doesn't match";
  return errors;
}

function reducer(state, action) {
  switch (action.type) {
    case "change":
      // TODO: update values[action.field]
      return state;
    case "blur":
      // TODO: mark touched[action.field] = true
      return state;
    case "submit":
      // TODO: mark submitted = true
      return state;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const errors = validate(state.values);
  const hasErrors = Object.keys(errors).length > 0;

  function field(name, type = "text") {
    const showError = (state.touched[name] || state.submitted) && errors[name];
    return (
      <div style={{ marginBottom: 12 }}>
        <input
          type={type}
          placeholder={name}
          value={state.values[name]}
          onChange={(e) => dispatch({ type: "change", field: name, value: e.target.value })}
          onBlur={() => dispatch({ type: "blur", field: name })}
          style={{ width: "100%" }}
        />
        {showError && (
          <small style={{ color: "var(--error, #c98b82)" }}>{errors[name]}</small>
        )}
      </div>
    );
  }

  if (state.submitted && !hasErrors) {
    return <p style={{ padding: 24, fontFamily: "system-ui" }}>submitted ✓</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "submit" });
      }}
      style={{ padding: 24, fontFamily: "system-ui", maxWidth: 360 }}
    >
      {field("email", "email")}
      {field("password", "password")}
      {field("confirm", "password")}
      <button type="submit" disabled={hasErrors}>create account</button>
    </form>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useReducer } from "react";

const initial = {
  values: { email: "", password: "", confirm: "" },
  touched: { email: false, password: false, confirm: false },
  submitted: false,
};

function validate(values) {
  const errors = {};
  if (!/^\\S+@\\S+\\.\\S+$/.test(values.email)) errors.email = "invalid email";
  if (values.password.length < 6) errors.password = "at least 6 characters";
  if (values.confirm !== values.password) errors.confirm = "doesn't match";
  return errors;
}

function reducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case "blur":
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };
    case "submit":
      return { ...state, submitted: true };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const errors = validate(state.values);
  const hasErrors = Object.keys(errors).length > 0;

  function field(name, type = "text") {
    const showError = (state.touched[name] || state.submitted) && errors[name];
    return (
      <div style={{ marginBottom: 12 }}>
        <input
          type={type}
          placeholder={name}
          value={state.values[name]}
          onChange={(e) => dispatch({ type: "change", field: name, value: e.target.value })}
          onBlur={() => dispatch({ type: "blur", field: name })}
          style={{ width: "100%" }}
        />
        {showError && (
          <small style={{ color: "var(--error, #c98b82)" }}>{errors[name]}</small>
        )}
      </div>
    );
  }

  if (state.submitted && !hasErrors) {
    return <p style={{ padding: 24, fontFamily: "system-ui" }}>submitted ✓</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "submit" });
      }}
      style={{ padding: 24, fontFamily: "system-ui", maxWidth: 360 }}
    >
      {field("email", "email")}
      {field("password", "password")}
      {field("confirm", "password")}
      <button type="submit" disabled={hasErrors}>create account</button>
    </form>
  );
}
`,
    },
  },
  "fetch-user": {
    title: "Fetch with cancellation",
    lede: "Load user data when the id changes. The trick: if the user clicks quickly between several ids, the old response can arrive after the new one and overwrite the UI. Cancel with AbortController.",
    objectives: [
      "useEffect that triggers a fetch every time userId changes",
      "Create an AbortController and pass it to the fetch as { signal }",
      "In the effect cleanup, call ctrl.abort()",
      "Ignore the AbortError — it's expected when cancelling",
      "Show 'loading...', error, or data depending on the state",
      "The buttons change userId instantly, without waiting for the fetch",
    ],
    hint: "The function returned from useEffect runs BEFORE the next setup, so aborting there cancels the race. The fetch rejects with AbortError — filter that case in the catch.",
    starter: {
      "/App.js": `import { useEffect, useState } from "react";

export default function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: create an AbortController
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users/" + userId /* TODO: signal */)
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        // TODO: ignore AbortError
        setError(err.message);
        setLoading(false);
      });

    // TODO: cleanup → abort
  }, [userId]);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{ fontWeight: id === userId ? 700 : 400 }}
          >
            user {id}
          </button>
        ))}
      </div>
      {loading && <p style={{ color: "var(--fg-muted)" }}>loading...</p>}
      {error && <p style={{ color: "var(--error, #c98b82)" }}>error: {error}</p>}
      {!loading && user && (
        <div>
          <strong>{user.name}</strong>
          <p style={{ color: "var(--fg-muted)", margin: "4px 0" }}>
            {user.email} · {user.company?.name}
          </p>
        </div>
      )}
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useEffect, useState } from "react";

export default function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users/" + userId, {
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => ctrl.abort();
  }, [userId]);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{ fontWeight: id === userId ? 700 : 400 }}
          >
            user {id}
          </button>
        ))}
      </div>
      {loading && <p style={{ color: "var(--fg-muted)" }}>loading...</p>}
      {error && <p style={{ color: "var(--error, #c98b82)" }}>error: {error}</p>}
      {!loading && user && (
        <div>
          <strong>{user.name}</strong>
          <p style={{ color: "var(--fg-muted)", margin: "4px 0" }}>
            {user.email} · {user.company?.name}
          </p>
        </div>
      )}
    </div>
  );
}
`,
    },
  },
  "theme-context": {
    title: "Context without spurious re-renders",
    lede: "Create a ThemeProvider that exposes theme and setTheme. The challenge: if you pass { theme, setTheme } as inline value, every render creates a new object and ALL consumers re-render — even those that don't read theme. Memoize the value.",
    objectives: [
      "Define ThemeContext with createContext",
      "ThemeProvider stores theme in useState",
      "The value passed to Provider is memoized with useMemo",
      "A useTheme() hook that reads the context and throws an error if there's no Provider",
      "A <Toolbar/> component that reads setTheme — must NOT re-render when the parent tick changes",
      "A memoized <Card/> component that reads theme",
    ],
    hint: "memo + useMemo work together here: Toolbar wrapped in memo only avoids renders if its props (the ctx value via useTheme) are stable. If the value changes by reference, memo is useless.",
    starter: {
      "/App.js": `import { createContext, useContext, useMemo, useState, memo } from "react";

const ThemeCtx = createContext(null);

function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme requires ThemeProvider");
  return ctx;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  // TODO: memoize { theme, setTheme } with useMemo
  const value = { theme, setTheme };
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

const Toolbar = memo(function Toolbar() {
  console.log("render Toolbar");
  const { setTheme } = useTheme();
  return (
    <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
      toggle theme
    </button>
  );
});

const Card = memo(function Card() {
  console.log("render Card");
  const { theme } = useTheme();
  return (
    <div style={{ padding: 12, border: "1px solid var(--line)", marginTop: 12 }}>
      theme: <strong>{theme}</strong>
    </div>
  );
});

export default function App() {
  const [tick, setTick] = useState(0);
  return (
    <ThemeProvider>
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        <button onClick={() => setTick((t) => t + 1)}>tick: {tick}</button>
        <Toolbar />
        <Card />
        <p style={{ color: "var(--fg-muted)", fontSize: 12, marginTop: 12 }}>
          Open the console: when ticking, does Toolbar re-render? Memoize the value.
        </p>
      </div>
    </ThemeProvider>
  );
}
`,
    },
    solution: {
      "/App.js": `import { createContext, useContext, useMemo, useState, memo } from "react";

const ThemeCtx = createContext(null);

function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme requires ThemeProvider");
  return ctx;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

const Toolbar = memo(function Toolbar() {
  console.log("render Toolbar");
  const { setTheme } = useTheme();
  return (
    <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
      toggle theme
    </button>
  );
});

const Card = memo(function Card() {
  console.log("render Card");
  const { theme } = useTheme();
  return (
    <div style={{ padding: 12, border: "1px solid var(--line)", marginTop: 12 }}>
      theme: <strong>{theme}</strong>
    </div>
  );
});

export default function App() {
  const [tick, setTick] = useState(0);
  return (
    <ThemeProvider>
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        <button onClick={() => setTick((t) => t + 1)}>tick: {tick}</button>
        <Toolbar />
        <Card />
        <p style={{ color: "var(--fg-muted)", fontSize: 12, marginTop: 12 }}>
          The memoized value keeps a stable reference: Toolbar does NOT re-render when tick changes.
        </p>
      </div>
    </ThemeProvider>
  );
}
`,
    },
  },
  "debounced-search": {
    title: "Non-blocking search",
    lede: "An input filters a list of 6,000 items. As-is, the input feels sluggish because the filtering is expensive. Use useDeferredValue so the input responds instantly and the list updates with low priority.",
    objectives: [
      "Keep the input controlled (urgent setState)",
      "Create a deferred value from query",
      "Pass the deferred — not query — to the expensive component",
      "Show an 'updating...' indicator while query !== deferred",
      "Visually dim the list while it's out of sync (opacity)",
    ],
    hint: "useDeferredValue returns a 'slow' copy of the value. When query and deferred differ, the list is stale — use that to show visual feedback.",
    starter: {
      "/App.js": `import { useState, useMemo } from "react";

function HeavyList({ query }) {
  const items = useMemo(() => {
    const result = [];
    for (let i = 0; i < 6000; i++) {
      const s = "row " + i;
      if (s.includes(query)) result.push(s);
    }
    // extra work to make it noticeably slow
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

  // TODO: create 'deferred' from query with useDeferredValue
  // TODO: 'stale' = query !== deferred

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="type..."
        style={{ width: "100%" }}
      />
      <p style={{ color: "var(--fg-muted)", fontSize: 12, fontFamily: "monospace" }}>
        {/* show 'updating...' when stale, else 'up to date' */}
        up to date
      </p>
      <div>
        {/* TODO: dim with opacity when stale; pass 'deferred' to HeavyList */}
        <HeavyList query={query} />
      </div>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState, useMemo, useDeferredValue } from "react";

function HeavyList({ query }) {
  const items = useMemo(() => {
    const result = [];
    for (let i = 0; i < 6000; i++) {
      const s = "row " + i;
      if (s.includes(query)) result.push(s);
    }
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
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="type..."
        style={{ width: "100%" }}
      />
      <p style={{ color: "var(--fg-muted)", fontSize: 12, fontFamily: "monospace" }}>
        {stale ? "updating..." : "up to date"}
      </p>
      <div style={{ opacity: stale ? 0.5 : 1, transition: "opacity 200ms" }}>
        <HeavyList query={deferred} />
      </div>
    </div>
  );
}
`,
    },
  },
  "lazy-modal": {
    title: "On-demand loaded modal",
    lede: "A modal with a heavy editor. We don't want to download its code until the user opens it. Use lazy() to defer the import and Suspense to show feedback while it loads.",
    objectives: [
      "Implement EditorModal in a separate file (export default)",
      "In App use lazy(() => import('./EditorModal.js'))",
      "Simulate latency by wrapping the import in a 700ms setTimeout",
      "Mount the component only when open === true",
      "Wrap it in <Suspense fallback=...>",
      "On first open, 'loading...' is shown, then it appears",
      "On close and reopen, the module is cached — no spinner",
    ],
    hint: "lazy() only executes the function when the component renders. Once the promise resolves, React caches the module — subsequent opens are instant.",
    starter: {
      "/App.js": `import { useState, Suspense } from "react";
// TODO: import EditorModal with lazy() + setTimeout to simulate latency

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <p style={{ color: "var(--fg-muted)" }}>
        The editor is heavy. Only download it when opened.
      </p>
      <button onClick={() => setOpen(true)}>open editor</button>

      {/* TODO: mount modal only if open, wrapped in Suspense */}
      {open && (
        <div style={{ marginTop: 16 }}>
          {/* <EditorModal onClose={() => setOpen(false)} /> */}
        </div>
      )}
    </div>
  );
}
`,
      "/EditorModal.js": `import { useState } from "react";

export default function EditorModal({ onClose }) {
  const [text, setText] = useState("write something heavy...");
  return (
    <div style={{
      padding: 16, border: "1px solid var(--line-strong)", borderRadius: 4,
      background: "var(--surface-1)"
    }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        style={{ width: "100%", fontFamily: "ui-monospace, monospace" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <small style={{ color: "var(--fg-muted)" }}>
          {text.length} characters
        </small>
        <button onClick={onClose}>close</button>
      </div>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState, Suspense, lazy } from "react";

// We wrap the import in a promise that waits 700ms to
// make the download moment visible.
const EditorModal = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import("./EditorModal.js")), 700);
  })
);

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <p style={{ color: "var(--fg-muted)" }}>
        The editor is heavy. Only download it when opened.
      </p>
      <button onClick={() => setOpen(true)}>open editor</button>

      {open && (
        <div style={{ marginTop: 16 }}>
          <Suspense fallback={<em style={{ color: "var(--fg-muted)" }}>loading editor...</em>}>
            <EditorModal onClose={() => setOpen(false)} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
`,
      "/EditorModal.js": `import { useState } from "react";

export default function EditorModal({ onClose }) {
  const [text, setText] = useState("write something heavy...");
  return (
    <div style={{
      padding: 16, border: "1px solid var(--line-strong)", borderRadius: 4,
      background: "var(--surface-1)"
    }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        style={{ width: "100%", fontFamily: "ui-monospace, monospace" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <small style={{ color: "var(--fg-muted)" }}>
          {text.length} characters
        </small>
        <button onClick={onClose}>close</button>
      </div>
    </div>
  );
}
`,
    },
  },
  "use-callback": {
    title: "Memoize callbacks",
    lede: "A parent with a counter passes onDelete to a memoized list. Each render recreates onDelete, invalidating memo on all items. Use useCallback so items stop re-rendering when only the counter changes.",
    objectives: [
      "Wrap onDelete in useCallback with the correct dependencies",
      "Verify in the console that items no longer re-render when incrementing the counter",
      "Understand why memo(Item) without useCallback is not enough",
    ],
    hint: "useCallback(fn, [deps]) returns the same function reference between renders as long as the deps don't change. memo() compares props by reference — if the function changes, the child always re-renders.",
    starter: {
      "/App.js": `import { useState, useCallback, memo } from "react";

// Item is already memoized — but something prevents it from working
const Item = memo(function Item({ name, onDelete }) {
  console.log("render:", name); // observe how many renders there are
  return (
    <li style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 0" }}>
      <span>{name}</span>
      <button onClick={() => onDelete(name)}>×</button>
    </li>
  );
});

const ITEMS = ["apple", "banana", "cherry", "peach", "fig"];

export default function App() {
  const [items, setItems] = useState(ITEMS);
  const [count, setCount] = useState(0);

  // TODO: wrap in useCallback so memo(Item) works
  const onDelete = (name) => setItems(prev => prev.filter(i => i !== name));

  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 12 }}>
        Open the console and press the counter — observe the re-renders
      </p>
      <button onClick={() => setCount(c => c + 1)} style={{ marginBottom: 16 }}>
        counter: {count}
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(name => (
          <Item key={name} name={name} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState, useCallback, memo } from "react";

const Item = memo(function Item({ name, onDelete }) {
  console.log("render:", name);
  return (
    <li style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 0" }}>
      <span>{name}</span>
      <button onClick={() => onDelete(name)}>×</button>
    </li>
  );
});

const ITEMS = ["apple", "banana", "cherry", "peach", "fig"];

export default function App() {
  const [items, setItems] = useState(ITEMS);
  const [count, setCount] = useState(0);

  // setItems is stable — no deps needed
  const onDelete = useCallback(
    (name) => setItems(prev => prev.filter(i => i !== name)),
    []
  );

  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 12 }}>
        Open the console and press the counter — no more unnecessary re-renders
      </p>
      <button onClick={() => setCount(c => c + 1)} style={{ marginBottom: 16 }}>
        counter: {count}
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(name => (
          <Item key={name} name={name} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
`,
    },
  },
  "use-memo-filter": {
    title: "Derive lists with useMemo",
    lede: "A task list is filtered and sorted on every render — even when only an unrelated counter changes. Use useMemo so the expensive calculation only repeats when query or order change.",
    objectives: [
      "Wrap the filtering + sorting in useMemo",
      "Declare [query, order] as dependencies",
      "Verify in the console that filtering does not re-run when the counter changes",
    ],
    hint: "useMemo(fn, [deps]) memoizes the value returned by fn. It only recalculates when a dependency changes. If the computation is expensive or produces a new array on every render, useMemo prevents cascading re-renders.",
    starter: {
      "/App.js": `import { useState, useMemo } from "react";

const ALL_TASKS = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  text: ["fix bug", "write test", "review PR", "update docs", "deploy"][i % 5] + " #" + i,
  priority: ["high", "medium", "low"][i % 3],
}));

export default function App() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("asc");
  const [count, setCount] = useState(0);

  // TODO: wrap in useMemo with [query, order] as deps
  console.log("recalculating list...");
  const filtered = ALL_TASKS
    .filter(t => t.text.includes(query))
    .sort((a, b) => order === "asc"
      ? a.text.localeCompare(b.text)
      : b.text.localeCompare(a.text)
    );

  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 12 }}>
        Open the console — the counter should not recalculate the list
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="filter..."
          style={{ flex: 1 }}
        />
        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
      <button onClick={() => setCount(c => c + 1)} style={{ marginBottom: 12 }}>
        counter: {count}
      </button>
      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 8 }}>
        {filtered.length} tasks
      </p>
      <ul style={{ listStyle: "none", padding: 0, maxHeight: 200, overflow: "auto" }}>
        {filtered.slice(0, 50).map(t => (
          <li key={t.id} style={{ padding: "3px 0", fontSize: 13, display: "flex", gap: 8 }}>
            <span style={{ color: "var(--fg-muted)", fontSize: 11, minWidth: 32 }}>{t.priority}</span>
            <span>{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState, useMemo } from "react";

const ALL_TASKS = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  text: ["fix bug", "write test", "review PR", "update docs", "deploy"][i % 5] + " #" + i,
  priority: ["high", "medium", "low"][i % 3],
}));

export default function App() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("asc");
  const [count, setCount] = useState(0);

  const filtered = useMemo(() => {
    console.log("recalculating list...");
    return ALL_TASKS
      .filter(t => t.text.includes(query))
      .sort((a, b) => order === "asc"
        ? a.text.localeCompare(b.text)
        : b.text.localeCompare(a.text)
      );
  }, [query, order]);

  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 12 }}>
        Open the console — the counter no longer recalculates the list
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="filter..."
          style={{ flex: 1 }}
        />
        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
      <button onClick={() => setCount(c => c + 1)} style={{ marginBottom: 12 }}>
        counter: {count}
      </button>
      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 8 }}>
        {filtered.length} tasks
      </p>
      <ul style={{ listStyle: "none", padding: 0, maxHeight: 200, overflow: "auto" }}>
        {filtered.slice(0, 50).map(t => (
          <li key={t.id} style={{ padding: "3px 0", fontSize: 13, display: "flex", gap: 8 }}>
            <span style={{ color: "var(--fg-muted)", fontSize: 11, minWidth: 32 }}>{t.priority}</span>
            <span>{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
    },
  },
  "transition-tabs": {
    title: "Non-blocking tabs",
    lede: "Three tabs, one renders 4,000 items and blocks the thread. On click the UI freezes and the active tab doesn't respond until it finishes. Use useTransition to keep clicks responsive and show a loading indicator.",
    objectives: [
      "Wrap setActiveTab in startTransition",
      "Use isPending to visually dim the tab that's loading",
      "Verify that tabs respond instantly even though the list takes time to render",
    ],
    hint: "startTransition marks the setState as non-urgent — React can interrupt it if a more urgent interaction arrives. isPending is true while the transition is in progress.",
    starter: {
      "/App.js": `import { useState, useTransition } from "react";

function SlowTab() {
  // renders 4000 items intentionally slow
  const items = [];
  for (let i = 0; i < 4000; i++) {
    items.push(
      <li key={i} style={{ padding: "1px 0", fontSize: 12 }}>item {i}</li>
    );
  }
  return <ul style={{ height: 200, overflow: "auto", padding: "0 0 0 16px", margin: 0 }}>{items}</ul>;
}

const TABS = ["home", "slow list", "settings"];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  // TODO: use useTransition to wrap setActiveTab
  // TODO: use isPending to show visual feedback

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)} // TODO: wrap in startTransition
            style={{
              fontWeight: activeTab === tab ? "bold" : "normal",
              // TODO: dim with opacity when isPending and tab !== activeTab
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "home" && <p>Welcome to home.</p>}
        {activeTab === "slow list" && <SlowTab />}
        {activeTab === "settings" && <p>App settings.</p>}
      </div>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState, useTransition } from "react";

function SlowTab() {
  const items = [];
  for (let i = 0; i < 4000; i++) {
    items.push(
      <li key={i} style={{ padding: "1px 0", fontSize: 12 }}>item {i}</li>
    );
  }
  return <ul style={{ height: 200, overflow: "auto", padding: "0 0 0 16px", margin: 0 }}>{items}</ul>;
}

const TABS = ["home", "slow list", "settings"];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  function switchTab(tab) {
    startTransition(() => setActiveTab(tab));
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            style={{
              fontWeight: activeTab === tab ? "bold" : "normal",
              opacity: isPending && tab !== activeTab ? 0.5 : 1,
              transition: "opacity 150ms",
            }}
          >
            {tab}
            {isPending && tab === "slow list" && activeTab !== tab ? " ⏳" : ""}
          </button>
        ))}
      </div>
      <div style={{ opacity: isPending ? 0.6 : 1, transition: "opacity 200ms" }}>
        {activeTab === "home" && <p>Welcome to home.</p>}
        {activeTab === "slow list" && <SlowTab />}
        {activeTab === "settings" && <p>App settings.</p>}
      </div>
    </div>
  );
}
`,
    },
  },
  "optimistic-like": {
    title: "Optimistic like",
    lede: "A post with a like counter. On click, the like takes 800ms to save and the UI doesn't respond until it finishes. Implement useOptimistic so the counter increments instantly and reverts if it fails.",
    objectives: [
      "Create the optimistic state with useOptimistic from likes",
      "On click, call addOptimistic(1) before the async request",
      "Update the real state with setLikes when the request succeeds",
      "Show a visual indicator when the like is pending",
    ],
    hint: "useOptimistic(state, updateFn) — the updateFn receives the current state and the value you passed to addOptimistic. Return the new provisional state.",
    starter: {
      "/App.js": `import { useState, useOptimistic, useTransition } from "react";

async function saveLike(liked) {
  await new Promise(r => setTimeout(r, 800));
  if (Math.random() < 0.15) throw new Error("Network error");
  return liked;
}

export default function App() {
  const [likes, setLikes] = useState(42);
  const [liked, setLiked] = useState(false);
  const [, startTransition] = useTransition();

  // TODO: create optimisticLikes and addOptimistic with useOptimistic
  // updateFn: (currentLikes, delta) => currentLikes + delta

  async function handleLike() {
    const next = !liked;
    const delta = next ? 1 : -1;
    // TODO: call addOptimistic(delta) here for immediate response

    startTransition(async () => {
      try {
        await saveLike(next);
        setLikes(l => l + delta);
        setLiked(next);
      } catch {
        // if it fails, useOptimistic reverts automatically
      }
    });
  }

  return (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <div style={{
        padding: 16,
        border: "1px solid var(--line)",
        borderRadius: 8,
        marginBottom: 16,
      }}>
        <p style={{ margin: "0 0 12px", fontSize: 14 }}>
          Did you like this article about React 19?
        </p>
        <button
          onClick={handleLike}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            color: liked ? "#e0607e" : "var(--fg-muted)",
            borderColor: liked ? "#e0607e" : "var(--line-strong)",
          }}
        >
          <span>{liked ? "❤️" : "🤍"}</span>
          {/* TODO: use optimisticLikes instead of likes */}
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useState, useOptimistic, useTransition } from "react";

async function saveLike(liked) {
  await new Promise(r => setTimeout(r, 800));
  if (Math.random() < 0.15) throw new Error("Network error");
  return liked;
}

export default function App() {
  const [likes, setLikes] = useState(42);
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, addOptimistic] = useOptimistic(
    likes,
    (current, delta) => current + delta
  );

  function handleLike() {
    const next = !liked;
    const delta = next ? 1 : -1;
    addOptimistic(delta); // immediate update

    startTransition(async () => {
      try {
        await saveLike(next);
        setLikes(l => l + delta);
        setLiked(next);
      } catch {
        // useOptimistic reverts automatically
      }
    });
  }

  return (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <div style={{
        padding: 16,
        border: "1px solid var(--line)",
        borderRadius: 8,
        marginBottom: 16,
      }}>
        <p style={{ margin: "0 0 12px", fontSize: 14 }}>
          Did you like this article about React 19?
        </p>
        <button
          onClick={handleLike}
          disabled={isPending}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            color: liked ? "#e0607e" : "var(--fg-muted)",
            borderColor: liked ? "#e0607e" : "var(--line-strong)",
            opacity: isPending ? 0.7 : 1,
            transition: "opacity 150ms",
          }}
        >
          <span>{liked ? "❤️" : "🤍"}</span>
          <span>{optimisticLikes}</span>
        </button>
      </div>
    </div>
  );
}
`,
    },
  },
  "action-form": {
    title: "Form with useActionState",
    lede: "A registration form that currently uses useState + onSubmit. Migrate the logic to useActionState to centralize state, validations, and pending in one place — without extra useState.",
    objectives: [
      "Create an async action function that receives (prevState, formData)",
      "Validate username (min 3 chars) and email (must contain @) and return { error }",
      "If valid, return { ok: true, username }",
      "Connect the action to useActionState and use formAction as the form's action attribute",
      "Disable inputs and the button while isPending is true",
    ],
    hint: "The action function always receives the previous state as the first argument. Return the new state — either { error } or { ok, username }. useActionState handles pending automatically.",
    starter: {
      "/App.js": `import { useState } from "react";

// TODO: replace with useActionState
// async function registerAction(prevState, formData) { ... }

export default function App() {
  // TODO: const [state, formAction, isPending] = useActionState(registerAction, null)

  // original code with useState (to replace)
  const [state, setState] = useState(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    setIsPending(true);
    await new Promise(r => setTimeout(r, 900));

    if (!username || username.length < 3) {
      setState({ error: "Username: at least 3 characters." });
    } else if (!email || !email.includes("@")) {
      setState({ error: "Invalid email." });
    } else {
      setState({ ok: true, username });
    }
    setIsPending(false);
  }

  if (state?.ok) {
    return (
      <div style={{ padding: 24 }}>
        <p>✅ Welcome, <strong>@{state.username}</strong>!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 300 }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 15 }}>Create account</h3>
      {/* TODO: change onSubmit to action={formAction} */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="username" placeholder="Username" disabled={isPending} />
        <input name="email" placeholder="Email" disabled={isPending} />
        {state?.error && (
          <p style={{ color: "#c87474", fontSize: 12, margin: 0 }}>{state.error}</p>
        )}
        <button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
`,
    },
    solution: {
      "/App.js": `import { useActionState } from "react";

async function registerAction(prevState, formData) {
  await new Promise(r => setTimeout(r, 900));
  const username = formData.get("username")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  if (!username || username.length < 3) return { error: "Username: at least 3 characters." };
  if (!email || !email.includes("@")) return { error: "Invalid email." };
  return { ok: true, username };
}

export default function App() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  if (state?.ok) {
    return (
      <div style={{ padding: 24 }}>
        <p>✅ Welcome, <strong>@{state.username}</strong>!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 300 }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 15 }}>Create account</h3>
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="username" placeholder="Username" disabled={isPending} />
        <input name="email" placeholder="Email" disabled={isPending} />
        {state?.error && (
          <p style={{ color: "#c87474", fontSize: 12, margin: 0 }}>{state.error}</p>
        )}
        <button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
`,
    },
  },
}

function applyOverrides(exercise: Exercise): Exercise {
  const override = overrides[exercise.id]
  if (!override) return exercise
  return { ...exercise, ...override }
}

export const allExercises: Exercise[] = [
  counter,
  autoFocus,
  stopwatch,
  listaFiltrada,
  todoList,
  formReducer,
  fetchUser,
  themeContext,
  debouncedSearch,
  lazyModal,
  useCallbackExercise,
  useMemoFilter,
  transitionTabs,
  optimisticLike,
  actionForm,
].map(applyOverrides)

export const exerciseIndex: Record<string, Exercise> = Object.fromEntries(
  allExercises.map((e) => [e.id, e])
)
