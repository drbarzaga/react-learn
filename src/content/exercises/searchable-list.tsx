import type { Exercise } from "./types"

export const searchableList: Exercise = {
  id: "searchable-list",
  label: "searchable list",
  title: "Lista filtrable",
  lede: "Una lista de items con un input de búsqueda que filtra en tiempo real. Usa toLowerCase() para hacer la búsqueda case-insensitive.",
  difficulty: "intermediate",
  objectives: [
    "Declara estado search con valor inicial ''",
    "Declara estado query con valor inicial ''",
    "Input actualiza query (no search directamente)",
    "Usa useEffect para actualizar search después de 300ms (debounce)",
    "Filtra los items: item.toLowerCase().includes(search.toLowerCase())",
  ],
  hint: "El debounce evita filtrar en cada keystroke, mejorando rendimiento",
  relatedConcepts: ["useState", "useEffect"],
  starter: {
    "/App.js": `import { useState, useEffect } from "react";

const items = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry",
  "Fig", "Grape", "Honeydew", "Kiwi", "Lemon",
  "Mango", "Nectarine", "Orange", "Papaya", "Quince"
];

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="buscar..."
        style={{ padding: 8, fontSize: 16, width: "100%", marginBottom: 16 }}
      />
      <ul style={{ paddingLeft: 20 }}>
        {/* TODO: mapea los items filtrados */}
      </ul>
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { useState, useEffect } from "react";

const items = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry",
  "Fig", "Grape", "Honeydew", "Kiwi", "Lemon",
  "Mango", "Nectarine", "Orange", "Papaya", "Quince"
];

export default function App() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="buscar..."
        style={{ padding: 8, fontSize: 16, width: "100%", marginBottom: 16 }}
      />
      <ul style={{ paddingLeft: 20 }}>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
`,
  },
}
