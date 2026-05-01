import type { Exercise } from "./types"

export const likeButton: Exercise = {
  id: "like-button",
  label: "like button",
  title: "Botón me gusta",
  lede: "Un botón de 'like' que muestra el contador y se puede togglear. Si está likeado, al hacer clic lo decrementa; si no, lo incrementa.",
  difficulty: "basic",
  objectives: [
    "Declara estado likes inicial en 0",
    "Declara estado isLiked inicial en false",
    "Al hacer clic: si isLiked, likes-- y isLiked=false; si no, likes++ y isLiked=true",
    "Cambia el color del botón cuando está likeado",
    "Muestra el contador al lado del botón",
  ],
  hint: "Usa un estado para el valor numérico y otro para el boolean de si está likeado",
  relatedConcepts: ["useState"],
  starter: {
    "/App.js": `import { useState } from "react";

const appStyle = {
  padding: 24,
  fontFamily: "system-ui",
  background: "#09090b",
  minHeight: "100vh",
};

const rowStyle = {
  display: "flex",
  gap: 12,
  alignItems: "center",
};

export default function App() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    // TODO: si isLiked, decrementa likes y pon isLiked en false
    // TODO: si no está likeado, incrementa likes y pon isLiked en true
  };

  return (
    <div style={appStyle}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Like Button</p>
      <div style={rowStyle}>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: isLiked ? "#ef4444" : "#e5e7eb",
            color: isLiked ? "white" : "black",
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: 16
          }}
        >
          ♥ Like
        </button>
        <span style={{ fontSize: 18 }}>
          {/* TODO: muestra likes */}
        </span>
      </div>
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { useState } from "react";

const appStyle = {
  padding: 24,
  fontFamily: "system-ui",
  background: "#09090b",
  minHeight: "100vh",
};

const rowStyle = {
  display: "flex",
  gap: 12,
  alignItems: "center",
};

export default function App() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <div style={appStyle}>
      <p style={{ marginBottom: 24, color: "#71717a" }}>Like Button</p>
      <div style={rowStyle}>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: isLiked ? "#ef4444" : "#e5e7eb",
            color: isLiked ? "white" : "black",
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: 16
          }}
        >
          ♥ Like
        </button>
        <span style={{ fontSize: 18 }}>{likes}</span>
      </div>
    </div>
  );
}
`,
  },
}
