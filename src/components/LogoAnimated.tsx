export function LogoAnimated({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="React Dojo"
    >
      <defs>
        <linearGradient id="rdg" x1="100" y1="10" x2="100" y2="192" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7fd46c" />
          <stop offset="55%" stopColor="#42b03c" />
          <stop offset="100%" stopColor="#247a23" />
        </linearGradient>

        <style>{`
          /* 1. Spine materialises */
          .rdl-spine {
            transform-origin: 100px 136px;
            animation: rdl-spine 0.28s ease-out 0.05s both;
          }
          @keyframes rdl-spine {
            from { transform: scaleY(0); opacity: 0; }
            to   { transform: scaleY(1); opacity: 1; }
          }

          /* 2. Pages fan out (left & right simultaneously) */
          .rdl-pl {
            transform-origin: 100px 136px;
            animation: rdl-fanl 0.72s cubic-bezier(0.22, 1.4, 0.5, 1) 0.38s both;
          }
          @keyframes rdl-fanl {
            from { transform: scaleX(0); opacity: 0.4; }
            to   { transform: scaleX(1); opacity: 1;   }
          }
          .rdl-pr {
            transform-origin: 100px 136px;
            animation: rdl-fanr 0.72s cubic-bezier(0.22, 1.4, 0.5, 1) 0.38s both;
          }
          @keyframes rdl-fanr {
            from { transform: scaleX(0); opacity: 0.4; }
            to   { transform: scaleX(1); opacity: 1;   }
          }

          /* Base arc fades in with pages */
          .rdl-base {
            animation: rdl-fade 0.4s ease-out 0.88s both;
          }
          @keyframes rdl-fade {
            from { opacity: 0; }
            to   { opacity: 1; }
          }

          /* 3. Page turns */
          .rdl-t1 {
            transform-origin: 100px 136px;
            animation: rdl-turn 0.48s ease-in-out 1.3s both;
          }
          .rdl-t2 {
            transform-origin: 100px 136px;
            animation: rdl-turn 0.48s ease-in-out 1.85s both;
          }
          @keyframes rdl-turn {
            0%   { transform: scaleX(1);  opacity: 0.7; }
            50%  { transform: scaleX(0);  opacity: 0.2; }
            100% { transform: scaleX(-1); opacity: 0;   }
          }

          /* 4. Atom orbits draw in */
          .rdl-o1, .rdl-o2, .rdl-o3 {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          }
          .rdl-o1 { animation: rdl-orbit 0.65s ease-out 2.55s forwards; }
          .rdl-o2 { animation: rdl-orbit 0.65s ease-out 3.0s  forwards; }
          .rdl-o3 { animation: rdl-orbit 0.65s ease-out 3.45s forwards; }
          @keyframes rdl-orbit {
            to { stroke-dashoffset: 0; }
          }

          /* 5. Nucleus pops in */
          .rdl-nuc {
            transform-origin: 100px 74px;
            transform: scale(0);
            animation: rdl-nuc 0.4s cubic-bezier(0.34, 1.7, 0.64, 1) 3.88s forwards;
          }
          @keyframes rdl-nuc {
            to { transform: scale(1); }
          }

          /* 6. Finishing glow */
          .rdl-all {
            animation: rdl-glow 1s ease-out 4.18s both;
          }
          @keyframes rdl-glow {
            0%   { filter: drop-shadow(0 0 0px  #5ec95500); }
            45%  { filter: drop-shadow(0 0 10px #5ec955bb); }
            100% { filter: drop-shadow(0 0 3px  #5ec95533); }
          }
        `}</style>
      </defs>

      <g
        className="rdl-all"
        stroke="url(#rdg)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ── Spine ─────────────────────────────────────────────── */}
        <line className="rdl-spine" x1="100" y1="136" x2="100" y2="153" strokeWidth="4.5" />

        {/* ── Left pages (fan from spine) ───────────────────────── */}
        <g className="rdl-pl">
          <path d="M 100,136   Q  91,133  80,135" strokeWidth="2.4" />
          <path d="M 100,136.5 Q  77,131  53,137" strokeWidth="3.2" />
          <path d="M 100,137   Q  62,129  31,148" strokeWidth="4.2" />
          <path d="M 100,137.5 Q  45,127  10,160" strokeWidth="5.5" />
        </g>

        {/* ── Right pages (mirror) ──────────────────────────────── */}
        <g className="rdl-pr">
          <path d="M 100,136   Q 109,133 120,135" strokeWidth="2.4" />
          <path d="M 100,136.5 Q 123,131 147,137" strokeWidth="3.2" />
          <path d="M 100,137   Q 138,129 169,148" strokeWidth="4.2" />
          <path d="M 100,137.5 Q 155,127 190,160" strokeWidth="5.5" />
        </g>

        {/* ── Base arc ──────────────────────────────────────────── */}
        <path className="rdl-base" d="M 10,160 Q 100,178 190,160" strokeWidth="5.5" />

        {/* ── Page turn 1 (sweeps right → left) ────────────────── */}
        <path className="rdl-t1" d="M 100,136.5 Q 123,131 147,137" strokeWidth="3.2" />

        {/* ── Page turn 2 ───────────────────────────────────────── */}
        <path className="rdl-t2" d="M 100,137   Q 138,129 169,148" strokeWidth="4.2" />

        {/* ── Atom — three orbits ───────────────────────────────── */}
        <ellipse className="rdl-o1" cx="100" cy="74" rx="60" ry="19" strokeWidth="5.5" />
        <ellipse
          className="rdl-o2"
          cx="100"
          cy="74"
          rx="60"
          ry="19"
          strokeWidth="5.5"
          transform="rotate(60, 100, 74)"
        />
        <ellipse
          className="rdl-o3"
          cx="100"
          cy="74"
          rx="60"
          ry="19"
          strokeWidth="5.5"
          transform="rotate(120, 100, 74)"
        />

        {/* ── Nucleus ───────────────────────────────────────────── */}
        <circle className="rdl-nuc" cx="100" cy="74" r="10" fill="url(#rdg)" stroke="none" />
      </g>
    </svg>
  )
}
