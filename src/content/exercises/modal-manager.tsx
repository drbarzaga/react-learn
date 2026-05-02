import type { Exercise } from "./types"

export const modalManager: Exercise = {
  id: "modal-manager",
  label: "modal manager",
  title: "Gestor de modales",
  lede: "Un sistema de modales con múltiples tipos (confirm, alert, prompt). Implementa funciones para abrir cada tipo y un componente Modal que renderiza el contenido con estilos de overlay.",
  difficulty: "intermediate",
  objectives: [
    "Estado modal: null o { type: string, data: object }",
    "Tres funciones: openConfirm, openAlert, openPrompt",
    "Cada tipo de modal renderiza contenido diferente con estilos propios",
    "El Modal muestra un backdrop oscuro con el contenido centrado",
    "Cierra el modal al hacer click en backdrop o presionar Escape",
  ],
  hint: "Usa un ID único para el container del modal. Puedes renderizarlo en el mismo flujo o usar portal si está disponible.",
  relatedConcepts: ["useState"],
  starter: {
    "/App.js": `import { useState, useEffect } from "react";

const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(9,9,11,0.72)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#111317",
  padding: 24,
  borderRadius: 12,
  minWidth: 340,
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  border: "1px solid #27272a",
};

const btnPrimary = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const btnSecondary = {
  background: "#18181b",
  color: "#d4d4d8",
  border: "1px solid #3f3f46",
  padding: "10px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const btnDanger = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const btnSuccess = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const inputStyle = {
  background: "#27272a",
  color: "#e4e4e7",
  border: "1px solid #3f3f46",
  padding: "12px",
  borderRadius: 8,
  fontSize: 14,
  width: "100%",
};

const appStyle = {
  padding: 24,
  fontFamily: "system-ui",
  background: "#09090b",
  minHeight: "100vh",
};

const labelStyle = {
  marginBottom: 24,
  color: "#71717a",
  fontSize: 14,
};

const actionRowStyle = {
  display: "flex",
  gap: 12,
};


function Modal({ isOpen, children, onClose }) {
  if (!isOpen || !children) return null;
  return (
    <div style={backdropStyle}>
      {children}
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <div style={modalStyle}>
      <p style={{ color: "#fff", marginBottom: 24 }}>{message}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnSecondary}>cancelar</button>
        <button onClick={onConfirm} style={btnDanger}>confirmar</button>
      </div>
    </div>
  );
}

function AlertModal({ message, onClose }) {
  return (
    <div style={modalStyle}>
      <p style={{ color: "#fff", marginBottom: 24 }}>{message}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnSuccess}>OK</button>
      </div>
    </div>
  );
}

function PromptModal({ label, onSubmit, onClose }) {
  const [value, setValue] = useState("");
  return (
    <div style={modalStyle}>
      <p style={{ color: "#fff", marginBottom: 16 }}>{label}</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} style={inputStyle} />
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
        <button onClick={onClose} style={btnSecondary}>cancelar</button>
        <button onClick={() => { onSubmit(value); onClose(); }} style={btnPrimary}>enviar</button>
      </div>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState(null);

  return (
    <div style={appStyle}>
      <p style={labelStyle}>Gestor de modales</p>
      <div style={actionRowStyle}>
        {/* TODO: onClick para abrir confirm */}
        <button onClick={() => {}} style={btnPrimary}>abrir confirm</button>
        {/* TODO: onClick para abrir alert */}
        <button onClick={() => {}} style={btnPrimary}>abrir alert</button>
        {/* TODO: onClick para abrir prompt */}
        <button onClick={() => {}} style={btnPrimary}>abrir prompt</button>
      </div>

      <Modal isOpen={modal?.type === "confirm"} onClose={() => setModal(null)}>
        <ConfirmModal message={modal?.message} onConfirm={() => {}} onClose={() => setModal(null)} />
      </Modal>
      <Modal isOpen={modal?.type === "alert"} onClose={() => setModal(null)}>
        <AlertModal message={modal?.message} onClose={() => setModal(null)} />
      </Modal>
      <Modal isOpen={modal?.type === "prompt"} onClose={() => setModal(null)}>
        <PromptModal label={modal?.label} onSubmit={() => {}} onClose={() => setModal(null)} />
      </Modal>
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { useState, useEffect } from "react";

const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(9,9,11,0.72)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#111317",
  padding: 24,
  borderRadius: 12,
  minWidth: 340,
  maxWidth: "90vw",
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  border: "1px solid #27272a",
};

const btnPrimary = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const btnSecondary = {
  background: "#18181b",
  color: "#d4d4d8",
  border: "1px solid #3f3f46",
  padding: "10px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const btnDanger = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const btnSuccess = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const inputStyle = {
  background: "#27272a",
  color: "#e4e4e7",
  border: "1px solid #3f3f46",
  padding: "12px",
  borderRadius: 8,
  fontSize: 14,
  width: "100%",
};

const appStyle = {
  padding: 24,
  fontFamily: "system-ui",
  background: "#09090b",
  minHeight: "100vh",
};

const labelStyle = {
  marginBottom: 24,
  color: "#71717a",
  fontSize: 14,
};

const actionRowStyle = {
  display: "flex",
  gap: 12,
};

function Modal({ isOpen, children, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !children) return null;

  return (
    <div onClick={onClose} style={backdropStyle}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <div style={modalStyle}>
      <p style={{ color: "#fafafa", fontSize: 16, marginBottom: 24, lineHeight: 1.5 }}>{message}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnSecondary}>cancelar</button>
        <button onClick={onConfirm} style={btnDanger}>confirmar</button>
      </div>
    </div>
  );
}

function AlertModal({ message, onClose }) {
  return (
    <div style={modalStyle}>
      <p style={{ color: "#fafafa", fontSize: 16, marginBottom: 24, lineHeight: 1.5 }}>{message}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnSuccess}>OK</button>
      </div>
    </div>
  );
}

function PromptModal({ label, onSubmit, onClose }) {
  const [value, setValue] = useState("");
  return (
    <div style={modalStyle}>
      <p style={{ color: "#fafafa", fontSize: 16, marginBottom: 16 }}>{label}</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="escribe tu respuesta..."
        style={inputStyle}
        autoFocus
      />
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
        <button onClick={onClose} style={btnSecondary}>cancelar</button>
        <button onClick={() => { onSubmit(value); onClose(); }} style={btnPrimary}>enviar</button>
      </div>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState(null);

  const openConfirm = (message, onConfirm) => setModal({ type: "confirm", message, onConfirm });
  const openAlert = (message) => setModal({ type: "alert", message });
  const openPrompt = (label, onSubmit) => setModal({ type: "prompt", label, onSubmit });
  const closeModal = () => setModal(null);

  return (
    <div style={appStyle}>
      <p style={labelStyle}>Gestor de modales</p>
      <div style={actionRowStyle}>
        <button onClick={() => openConfirm("¿Eliminar este elemento?", () => console.log("confirmado"))} style={btnPrimary}>abrir confirm</button>
        <button onClick={() => openAlert("¡Operación exitosa!")} style={btnPrimary}>abrir alert</button>
        <button onClick={() => openPrompt("¿Cómo te llamas?", (v) => console.log("nombre:", v))} style={btnPrimary}>abrir prompt</button>
      </div>

      <Modal isOpen={modal?.type === "confirm"} onClose={closeModal}>
        {modal?.type === "confirm" && <ConfirmModal message={modal.message} onConfirm={() => { modal.onConfirm(); closeModal(); }} onClose={closeModal} />}
      </Modal>
      <Modal isOpen={modal?.type === "alert"} onClose={closeModal}>
        {modal?.type === "alert" && <AlertModal message={modal.message} onClose={closeModal} />}
      </Modal>
      <Modal isOpen={modal?.type === "prompt"} onClose={closeModal}>
        {modal?.type === "prompt" && <PromptModal label={modal.label} onSubmit={modal.onSubmit} onClose={closeModal} />}
      </Modal>
    </div>
  );
}
`,
  },
}
