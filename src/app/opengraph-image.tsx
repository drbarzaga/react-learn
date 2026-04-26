import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import path from "path"

export const alt = "React Dojo — React se aprende practicando."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const G = "#4ade80"

export default async function Image() {
  const logoData = await readFile(path.join(process.cwd(), "public", "logo-clean.png"))
  const logo = `data:image/png;base64,${logoData.toString("base64")}`

  const codeLines = [
    {
      tokens: [
        { t: "function ", c: "#c586c0" },
        { t: "Counter", c: "#dcdcaa" },
        { t: "() {", c: "#d4d4d4" },
      ],
    },
    {
      tokens: [
        { t: "  const ", c: "#569cd6" },
        { t: "[count, setCount]", c: "#9cdcfe" },
        { t: " = ", c: "#d4d4d4" },
        { t: "useState", c: "#dcdcaa" },
        { t: "(", c: "#d4d4d4" },
        { t: "0", c: "#b5cea8" },
        { t: ")", c: "#d4d4d4" },
      ],
    },
    { tokens: [] },
    {
      tokens: [
        { t: "  ", c: "#d4d4d4" },
        { t: "useEffect", c: "#dcdcaa" },
        { t: "(() => {", c: "#d4d4d4" },
      ],
    },
    {
      tokens: [
        { t: "    document", c: "#9cdcfe" },
        { t: ".title = ", c: "#d4d4d4" },
        { t: "`Count: ", c: "#ce9178" },
        { t: "${count}", c: "#9cdcfe" },
        { t: "`", c: "#ce9178" },
      ],
    },
    {
      tokens: [
        { t: "  }, [", c: "#d4d4d4" },
        { t: "count", c: "#9cdcfe" },
        { t: "])", c: "#d4d4d4" },
      ],
    },
    { tokens: [] },
    {
      tokens: [
        { t: "  return ", c: "#c586c0" },
        { t: "(", c: "#d4d4d4" },
      ],
    },
    {
      tokens: [
        { t: "    <", c: "#808080" },
        { t: "button", c: "#4ec9b0" },
        { t: " onClick", c: "#9cdcfe" },
        { t: "={setCount}", c: "#d4d4d4" },
        { t: ">", c: "#808080" },
      ],
    },
    {
      tokens: [
        { t: "      Count: ", c: "#d4d4d4" },
        { t: "{count}", c: "#9cdcfe" },
      ],
    },
    {
      tokens: [
        { t: "    </", c: "#808080" },
        { t: "button", c: "#4ec9b0" },
        { t: ">", c: "#808080" },
      ],
    },
    { tokens: [{ t: "  )", c: "#d4d4d4" }] },
    { tokens: [{ t: "}", c: "#d4d4d4" }] },
  ]

  const floatingPills = [
    { label: "useState", x: 68, y: 58 },
    { label: "useEffect", x: 68, y: 108 },
    { label: "useRef", x: 68, y: 158 },
    { label: "useCallback", x: 68, y: 208 },
    { label: "useMemo", x: 68, y: 258 },
    { label: "useContext", x: 68, y: 308 },
    { label: "useReducer", x: 68, y: 358 },
    { label: "useId", x: 68, y: 408 },
    { label: "useTransition", x: 68, y: 458 },
    { label: "useOptimistic", x: 68, y: 508 },
  ]

  return new ImageResponse(
    <div
      style={{
        background: "#0d0d0d",
        width: "100%",
        height: "100%",
        display: "flex",
        fontFamily: "monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 50px)",
        }}
      />

      {/* Left green glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 65%)",
          top: 65,
          left: -80,
        }}
      />

      {/* Right blue-ish glow behind code */}
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(86,156,214,0.08) 0%, transparent 70%)",
          top: 105,
          right: 0,
        }}
      />

      {/* Floating hook pills — left strip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 158,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "10px",
          paddingLeft: "18px",
          opacity: 0.22,
        }}
      >
        {floatingPills.map((p) => (
          <div
            key={p.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "8px",
              padding: "5px 10px",
            }}
          >
            <span style={{ fontSize: "11px", color: G, letterSpacing: "0.02em" }}>{p.label}</span>
          </div>
        ))}
      </div>

      {/* Left content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "178px",
          paddingRight: "32px",
          width: "520px",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* Logo + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.2)",
            }}
          >
            <img src={logo} width={44} height={44} style={{ objectFit: "contain" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(74,222,128,0.07)",
              border: "1px solid rgba(74,222,128,0.15)",
              borderRadius: "100px",
              padding: "5px 14px",
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: G }} />
            <span
              style={{ fontSize: "11px", color: "rgba(74,222,128,0.8)", letterSpacing: "0.16em" }}
            >
              OPEN SOURCE
            </span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          <span style={{ fontSize: "66px", fontWeight: 800, color: "#f0f0f0" }}>React&nbsp;</span>
          <span style={{ fontSize: "66px", fontWeight: 800, color: G }}>Dojo</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "17px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.01em",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          <span>Conceptos, ejercicios y quizzes</span>
          <span>para dominar React moderno.</span>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
          {[
            { v: "33", l: "Conceptos" },
            { v: "17", l: "Ejercicios" },
            { v: "4", l: "Quizzes" },
          ].map((s, i) => (
            <div key={s.l} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && (
                <div
                  style={{
                    width: 1,
                    height: 24,
                    background: "rgba(255,255,255,0.08)",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                />
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{ fontSize: "22px", fontWeight: 700, color: "#e0e0e0", lineHeight: 1 }}
                >
                  {s.v}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.25)",
                    marginTop: "3px",
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.l.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code editor panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: "60px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "440px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            overflow: "hidden",
          }}
        >
          {/* Editor title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
            <span
              style={{
                marginLeft: "10px",
                fontSize: "11px",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              Counter.tsx
            </span>
          </div>

          {/* Code lines */}
          <div
            style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "3px" }}
          >
            {codeLines.map((line, li) => (
              <div key={li} style={{ display: "flex", alignItems: "center", minHeight: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.12)",
                    width: "24px",
                    flexShrink: 0,
                    userSelect: "none",
                  }}
                >
                  {li + 1}
                </span>
                <span style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
                  {line.tokens.map((tok, ti) => (
                    <span key={ti} style={{ fontSize: "13px", color: tok.c, whiteSpace: "pre" }}>
                      {tok.t}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>

          {/* Green bottom accent line */}
          <div
            style={{
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.5), transparent)",
            }}
          />
        </div>
      </div>

      {/* Bottom URL */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.12)", letterSpacing: "0.1em" }}>
          react-dojo.vercel.app
        </span>
      </div>
    </div>,
    { ...size }
  )
}
