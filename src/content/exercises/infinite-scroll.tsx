import type { Exercise } from "./types"

export const infiniteScroll: Exercise = {
  id: "infinite-scroll",
  label: "infinite scroll",
  title: "Scroll infinito",
  lede: "Una lista que carga más datos al hacer scroll hacia abajo. Usa un IntersectionObserver para detectar cuando el usuario llega al final y cargar más items. Simula una API con datos fake.",
  difficulty: "advanced",
  objectives: [
    "Estado items: array inicial con 10 items",
    "Estado loading: boolean",
    "Estado hasMore: boolean",
    "useEffect para cargar iniciales",
    "Ref para el sentinel (elemento invisible al final)",
    "IntersectionObserver observa el sentinel, cuando es visible y hasMore, carga más",
    "Agrega 10 items más cada vez hasta llegar a 50",
  ],
  hint: "El observer dispara cuando el sentinel entra en viewport",
  relatedConcepts: ["useState", "useEffect", "useRef"],
  dependencies: {
    react: "^19.0.0",
  },
  starter: {
    "/App.js": `import { useState, useEffect, useRef, useCallback } from "react";

function generateItems(start, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: "Item " + (start + i),
  }));
}

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 10;
const MAX_ITEMS = 50;

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  // TODO: implementa loadMore
  // TODO: useEffect para cargar iniciales
  // TODO:IntersectionObserver con callback

  // sentinel es el elemento al final que activa la carga
  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      // TODO: si entries[0].isIntersecting y hasMore, cargar más
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Scroll Infinito ({items.length} items)</h2>
      {loading && <p>cargando...</p>}
      <ul style={{ paddingLeft: 20 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: 4 }}>{item.title}</li>
        ))}
      </ul>
      <div ref={lastElementRef} style={{ height: 20 }} />{/* sentinel */}
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { useState, useEffect, useRef, useCallback } from "react";

function generateItems(start, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: "Item " + (start + i),
  }));
}

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 10;
const MAX_ITEMS = 50;

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    // Simular delay de API
    await new Promise((r) => setTimeout(r, 500));
    setItems((prev) => {
      const newItems = generateItems(prev.length, LOAD_MORE_COUNT);
      const nextItems = [...prev, ...newItems];
      const nextLength = nextItems.length;
      setHasMore(nextLength < MAX_ITEMS);
      return nextItems;
    });
    setLoading(false);
  }, [loading, hasMore]);

  useEffect(() => {
    if (items.length === 0) {
      setItems(generateItems(0, INITIAL_COUNT));
    }
  }, []);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Scroll Infinito ({items.length} items)</h2>
      {loading && <p>cargando...</p>}
      <ul style={{ paddingLeft: 20 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: 4 }}>{item.title}</li>
        ))}
      </ul>
      <div ref={lastElementRef} style={{ height: 20 }} />
      {!hasMore && <p style={{ textAlign: "center" }}>fin</p>}
    </div>
  );
}
`,
  },
}
