import type { Exercise } from "./types"

export const dropdownMenu: Exercise = {
  id: "dropdown-menu",
  label: "dropdown menu",
  title: "Menú desplegable",
  lede: "Un botón que al hacer click muestra un menú dropdown. El menú se cierra al hacer click outside o al seleccionar una opción.",
  difficulty: "intermediate",
  objectives: [
    "Estado isOpen: boolean",
    "Botón trigger con onclick para toggle",
    "Menú con opciones, cada una con onClick",
    "useEffect para click outside que cierre el menú",
    "Posición absoluta debajo del botón",
  ],
  hint: "Usa document.addEventListener('click') en useEffect para detectar clicks outside.",
  relatedConcepts: ["useState", "useEffect"],
  starter: {
    "/App.js": `import { useState, useEffect, useRef } from "react";

const triggerStyle = {
  background: "#27272a",
  color: "#fff",
  border: "1px solid #3f3f46",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const menuStyle = {
  position: "absolute",
  background: "#27272a",
  border: "1px solid #3f3f46",
  borderRadius: 8,
  minWidth: 180,
  marginTop: 8,
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  overflow: "hidden",
};

const optionStyle = {
  padding: "12px 16px",
  cursor: "pointer",
  color: "#e4e4e7",
};

const options = [
  { id: "perfil", label: "👤 Perfil" },
  { id: "ajustes", label: "⚙️ Ajustes" },
  { id: "salir", label: "🚪 Salir" },
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    // TODO: alterna isOpen
  };

  const closeDropdown = () => {
    // TODO: cierra el menú
  };

  useEffect(() => {
    // TODO: agrega listener para cerrar al hacer click fuera
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh" }}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Dropdown</p>
      <div style={{ position: "relative" }} ref={menuRef}>
        <button onClick={toggleDropdown} style={triggerStyle}>
          Menú {isOpen ? "▲" : "▼"}
        </button>
        {isOpen && (
          <div style={menuStyle}>
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => {
                  // TODO: registra opt.id en consola y cierra el menú
                }}
                style={optionStyle}
                onMouseEnter={(e) => e.target.style.background = "#3f3f46"}
                onMouseLeave={(e) => e.target.style.background = "transparent"}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { useState, useEffect, useRef } from "react";

const triggerStyle = {
  background: "#27272a",
  color: "#fff",
  border: "1px solid #3f3f46",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const menuStyle = {
  position: "absolute",
  background: "#27272a",
  border: "1px solid #3f3f46",
  borderRadius: 8,
  minWidth: 180,
  marginTop: 8,
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  overflow: "hidden",
};

const optionStyle = {
  padding: "12px 16px",
  cursor: "pointer",
  color: "#e4e4e7",
};

const options = [
  { id: "perfil", label: "👤 Perfil" },
  { id: "ajustes", label: "⚙️ Ajustes" },
  { id: "salir", label: "🚪 Salir" },
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh" }}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Dropdown</p>
      <div style={{ position: "relative" }} ref={menuRef}>
        <button onClick={toggleDropdown} style={triggerStyle}>
          Menú {isOpen ? "▲" : "▼"}
        </button>
        {isOpen && (
          <div style={menuStyle}>
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => { console.log(opt.id); closeDropdown(); }}
                style={optionStyle}
                onMouseEnter={(e) => e.target.style.background = "#3f3f46"}
                onMouseLeave={(e) => e.target.style.background = "transparent"}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`,
  },
}
