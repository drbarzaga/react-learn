import type { Exercise } from "./types"

export const stepWizard: Exercise = {
  id: "step-wizard",
  label: "step wizard",
  title: "Wizard de pasos",
  lede: "Un formulario dividido en pasos. Cada paso tiene campos específicos, con navegación prev/next y validación básica.",
  difficulty: "intermediate",
  objectives: [
    "Estado step actual (0, 1, 2)",
    "Estado formData para cada paso",
    "Botones Prev/Next",
    "Validar antes de avanzar",
    "Mostrar indicador de progreso (step 1 de 3)",
    "Al final, mostrar resumen",
  ],
  hint: "Guarda los datos de cada paso en un objeto formData. Valida antes de setStep(step + 1).",
  relatedConcepts: ["useState"],
  starter: {
    "/App.js": `import { useState } from "react";

const steps = [
  { title: "Cuenta", fields: ["username", "email"] },
  { title: "Datos", fields: ["firstName", "lastName"] },
  { title: "Confirmar", fields: [] },
];

const fieldStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: 16,
  background: "#27272a",
  border: "1px solid #3f3f46",
  borderRadius: 8,
  color: "#fff",
};

export default function App() {
  const step = 0;
  const formData = {};

  const isFirst = true;
  const isLast = true;
  const canNext = false;

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh" }}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Paso {step + 1} de {steps.length}</p>
      
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= step ? "#3b82f6" : "#3f3f46"
          }} />
        ))}
      </div>

      <div style={{ background: "#1a1a1e", padding: 24, borderRadius: 12, marginBottom: 24 }}>
        <h3 style={{ color: "#fff", marginBottom: 16 }}>{steps[step].title}</h3>
        {steps[step].fields.map((field) => (
          <input
            key={field}
            placeholder={field}
            value={formData[field] || ""}
            onChange={() => {}}
            style={fieldStyle}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {!isFirst && <button onClick={() => {}} style={{ padding: "12px 24px", background: "#27272a", color: "#fff", borderRadius: 8 }}>← Atrás</button>}
        <button onClick={() => {}} style={{ flex: 1, padding: "12px 24px", background: "#3b82f6", color: "#fff", borderRadius: 8, opacity: canNext ? 1 : 0.5 }}>
          {isLast ? "Finalizar" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { useState } from "react";

const steps = [
  { title: "Cuenta", fields: ["username", "email"] },
  { title: "Datos", fields: ["firstName", "lastName"] },
  { title: "Confirmar", fields: [] },
];

const fieldStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: 16,
  background: "#27272a",
  border: "1px solid #3f3f46",
  borderRadius: 8,
  color: "#fff",
};

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const isFirst = step === 0;
  const isLast = step === steps.length - 1;
  const currentFields = steps[step].fields;
  const canNext = currentFields.every((f) => formData[f]);

  if (isLast && Object.keys(formData).length > 0) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh" }}>
        <h2 style={{ color: "#fff", marginBottom: 16 }}>Resumen</h2>
        <pre style={{ color: "#a1a1aa", background: "#1a1a1e", padding: 16, borderRadius: 8 }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
        <button onClick={() => { setStep(0); setFormData({}); }} style={{ marginTop: 16, padding: "12px 24px", background: "#3b82f6", color: "#fff", borderRadius: 8 }}>
          Comenzar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", background: "#09090b", minHeight: "100vh" }}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Paso {step + 1} de {steps.length}</p>
      
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= step ? "#3b82f6" : "#3f3f46"
          }} />
        ))}
      </div>

      <div style={{ background: "#1a1a1e", padding: 24, borderRadius: 12, marginBottom: 24 }}>
        <h3 style={{ color: "#fff", marginBottom: 16 }}>{steps[step].title}</h3>
        {currentFields.map((field) => (
          <input
            key={field}
            placeholder={field}
            value={formData[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            style={fieldStyle}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {!isFirst && (
          <button onClick={handlePrev} style={{ padding: "12px 24px", background: "#27272a", color: "#fff", borderRadius: 8 }}>
            ← Atrás
          </button>
        )}
        <button 
          onClick={isLast ? () => {} : handleNext} 
          disabled={!canNext}
          style={{ 
            flex: 1, padding: "12px 24px", background: "#3b82f6", color: "#fff", borderRadius: 8,
            opacity: canNext ? 1 : 0.5 
          }}
        >
          {isLast ? "Finalizar" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}
`,
  },
}
