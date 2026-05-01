import type { Exercise } from "./types"

export const dataTable: Exercise = {
  id: "data-table",
  label: "data table",
  title: "Tabla de datos",
  lede: "Una tabla con datos de usuarios que permite ordenar por columna y paginación. Usa useMemo para optimizar el ordenamiento y la paginación.",
  difficulty: "advanced",
  objectives: [
    "Datos: array de objetos {id, name, email, role}",
    "Estado sortCol: columna actual, sortDir: 'asc' | 'desc'",
    "Estado page: página actual, pageSize: 5",
    "useMemo para ordenar datos según sortCol y sortDir",
    "useMemo para paginar los datos ordenados",
    "Click en header alterna sortDir",
    "Botones prev/next cambian de página",
  ],
  hint: "useMemo evita recalcular en cada render",
  relatedConcepts: ["useMemo"],
  starter: {
    "/App.js": `import { useState, useMemo } from "react";

const allData = [
  { id: 1, name: "Alice", email: "alice@email.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@email.com", role: "user" },
  { id: 3, name: "Charlie", email: "charlie@email.com", role: "user" },
  { id: 4, name: "Diana", email: "diana@email.com", role: "moderator" },
  { id: 5, name: "Eve", email: "eve@email.com", role: "user" },
  { id: 6, name: "Frank", email: "frank@email.com", role: "user" },
  { id: 7, name: "Grace", email: "grace@email.com", role: "admin" },
  { id: 8, name: "Hank", email: "hank@email.com", role: "user" },
];

export default function App() {
  const [sortCol, setSortCol] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const pageSize = 5;

  // TODO: ordena allData con useMemo según sortCol y sortDir (sortDir ternario)
  const sorted = useMemo(() => {
    // TODO: implement sort
    return allData;
  }, [sortCol, sortDir]);

  // TODO: calcula la página actual con useMemo (slice del sorted)
  const paginated = useMemo(() => {
    // TODO: implement pagination
    return sorted;
  }, [sorted, page]);

  const handleSort = (col) => {
    // TODO: si col === sortCol, alterna sortDir (asc → desc); sino, setSortCol(col) y setSortDir("asc")
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["name", "email", "role"].map((col) => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                style={{ padding: 8, textAlign: "left", borderBottom: "2px solid #3f3f46", cursor: "pointer", color: "#fff" }}
              >
                {col} {sortCol === col && (sortDir === "asc" ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((row) => (
            <tr key={row.id}>
              <td style={{ padding: 8, borderBottom: "1px solid #3f3f46", color: "#fff" }}>{row.name}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #3f3f46", color: "#fff" }}>{row.email}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #3f3f46", color: "#fff" }}>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button
          // TODO: decrementa la página sin bajar de 0
          onClick={() => {}}
          disabled={page === 0}
          style={{ padding: "8px 16px", background: "#27272a", color: "#fff", border: "none", borderRadius: 8 }}
        >
          prev
        </button>
        <span style={{ padding: 8, color: "#71717a" }}>página {page + 1}</span>
        <button
          // TODO: incrementa la página si hay más resultados
          onClick={() => {}}
          disabled={(page + 1) * pageSize >= allData.length}
          style={{ padding: "8px 16px", background: "#27272a", color: "#fff", border: "none", borderRadius: 8 }}
        >
          next
        </button>
      </div>
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { useState, useMemo } from "react";

const allData = [
  { id: 1, name: "Alice", email: "alice@email.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@email.com", role: "user" },
  { id: 3, name: "Charlie", email: "charlie@email.com", role: "user" },
  { id: 4, name: "Diana", email: "diana@email.com", role: "moderator" },
  { id: 5, name: "Eve", email: "eve@email.com", role: "user" },
  { id: 6, name: "Frank", email: "frank@email.com", role: "user" },
  { id: 7, name: "Grace", email: "grace@email.com", role: "admin" },
  { id: 8, name: "Hank", email: "hank@email.com", role: "user" },
];

export default function App() {
  const [sortCol, setSortCol] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const sorted = useMemo(() => {
    return [...allData].sort((a, b) => {
      const aVal = a[sortCol];
      const bVal = b[sortCol];
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortCol, sortDir]);

  const paginated = useMemo(() => {
    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh" }}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Data Table</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["name", "email", "role"].map((col) => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                style={{ padding: 8, textAlign: "left", borderBottom: "2px solid #3f3f46", cursor: "pointer", color: "#fff" }}
              >
                {col} {sortCol === col && (sortDir === "asc" ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((row) => (
            <tr key={row.id}>
              <td style={{ padding: 8, borderBottom: "1px solid #3f3f46", color: "#fff" }}>{row.name}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #3f3f46", color: "#fff" }}>{row.email}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #3f3f46", color: "#fff" }}>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0} style={{ padding: "8px 16px", background: "#27272a", color: "#fff", border: "none", borderRadius: 8 }}>prev</button>
        <span style={{ padding: 8, color: "#71717a" }}>página {page + 1}</span>
        <button onClick={() => setPage(page + 1)} disabled={(page + 1) * pageSize >= allData.length} style={{ padding: "8px 16px", background: "#27272a", color: "#fff", border: "none", borderRadius: 8 }}>next</button>
      </div>
    </div>
  );
}
`,
  },
}
