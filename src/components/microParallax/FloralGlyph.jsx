import { useId } from "react";

function labelForMotif(motif) {
  switch (motif) {
    case "sunflower":
      return "Dekorasi bunga matahari";
    case "lavender":
      return "Dekorasi bunga lavender";
    case "sakura":
      return "Dekorasi bunga sakura";
    case "lotus":
      return "Dekorasi bunga lotus";
    case "daisy":
      return "Dekorasi bunga daisy";
    case "tulip":
      return "Dekorasi bunga tulip";
    case "rose":
      return "Dekorasi bunga mawar";
    case "peony":
      return "Dekorasi bunga peony";
    default:
      return "Dekorasi floral";
  }
}

export default function FloralGlyph({ side = "left", variant = "blossom", motif = "sunflower" }) {
  const id = useId();
  const petalGradId = `sun-petal-${side}-${id}`;
  const centerGradId = `sun-center-${side}-${id}`;
  const sakuraGradId = `sak-${side}-${id}`;
  const lotusGradId = `lot-${side}-${id}`;
  const daisyGradId = `dai-${side}-${id}`;
  const tulipGradId = `tul-${side}-${id}`;
  const roseGradId = `ros-${side}-${id}`;
  const peonyGradId = `peo-${side}-${id}`;
  const lavenderGradId = `lav-${side}-${id}`;

  return (
    <svg
      className={`floral-corner ${side}`}
      viewBox="0 0 220 220"
      role="img"
      aria-label={labelForMotif(motif)}
    >
      <defs>
        <linearGradient id={petalGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6a8" />
          <stop offset="0.55" stopColor="#ffd54a" />
          <stop offset="1" stopColor="#f6a400" />
        </linearGradient>
        <radialGradient id={centerGradId} cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#8a5416" />
          <stop offset="0.55" stopColor="#6b3f10" />
          <stop offset="1" stopColor="#2e1906" />
        </radialGradient>

        <linearGradient id={sakuraGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff4f8" />
          <stop offset="0.5" stopColor="#ffb3d0" />
          <stop offset="1" stopColor="#ff6aa8" />
        </linearGradient>
        <linearGradient id={lotusGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff2fb" />
          <stop offset="0.55" stopColor="#ff98cf" />
          <stop offset="1" stopColor="#c23a8a" />
        </linearGradient>

        <linearGradient id={daisyGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f4fbff" />
          <stop offset="1" stopColor="#cfe7ff" />
        </linearGradient>
        <linearGradient id={tulipGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe2f0" />
          <stop offset="0.5" stopColor="#ff5aa6" />
          <stop offset="1" stopColor="#b91356" />
        </linearGradient>
        <radialGradient id={roseGradId} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#ffd6e7" />
          <stop offset="0.45" stopColor="#ff4a7f" />
          <stop offset="1" stopColor="#7e092b" />
        </radialGradient>
        <linearGradient id={peonyGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0f8" />
          <stop offset="0.5" stopColor="#ff7fc4" />
          <stop offset="1" stopColor="#a21862" />
        </linearGradient>
      </defs>
      {motif === "sunflower" ? (
        <g opacity={variant === "leaf" ? 0.72 : variant === "sprig" ? 0.8 : 0.9}>
          <g transform={variant === "leaf" ? "translate(120 74) scale(0.74)" : "translate(108 72) scale(0.9)"}>
            <g fill={`url(#${petalGradId})`} opacity="0.96">
              {Array.from({ length: variant === "sprig" ? 10 : 12 }).map((_, i) => (
                <path
                  key={i}
                  d="M0-46c8 0 14 12 14 22s-6 22-14 22c-8 0-14-12-14-22s6-22 14-22z"
                  transform={`rotate(${(360 / (variant === "sprig" ? 10 : 12)) * i})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="30" fill="rgba(0,0,0,0.06)" />
            <circle cx="0" cy="0" r="22" fill={`url(#${centerGradId})`} />
            <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(255,245,200,0.35)" strokeWidth="2" />
            <g fill="rgba(0,0,0,0.22)">
              {Array.from({ length: 14 }).map((_, i) => (
                <circle
                  key={i}
                  cx={Math.cos((i / 14) * Math.PI * 2) * 10}
                  cy={Math.sin((i / 14) * Math.PI * 2) * 10}
                  r={1.6}
                />
              ))}
            </g>
          </g>

          {variant === "blossom" ? (
            <g transform="translate(56 108) scale(0.58)" opacity="0.88">
              <g fill={`url(#${petalGradId})`}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={i}
                    d="M0-38c7 0 12 10 12 18S7-2 0-2-12-12-12-20 5-18 12-18z"
                    transform={`rotate(${(360 / 8) * i})`}
                  />
                ))}
              </g>
              <circle cx="0" cy="0" r="16" fill={`url(#${centerGradId})`} />
            </g>
          ) : null}
        </g>
      ) : motif === "lavender" ? (
        <g opacity={variant === "leaf" ? 0.72 : 0.88}>
          <g transform={variant === "leaf" ? "translate(112 88) scale(0.86)" : "translate(106 82) scale(0.94)"}>
            <g fill={`url(#${lavenderGradId})`} opacity="0.92">
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={i}
                  d="M0-20c7 0 12 8 12 14S7 8 0 8-12 0-12-6s5-14 12-14z"
                  transform={`translate(${(i % 2 === 0 ? -10 : 10) * (0.55 + (i % 3) * 0.12)}, ${
                    -46 + i * 7
                  }) rotate(${i % 2 === 0 ? -18 : 18}) scale(${0.72 + (i % 4) * 0.06})`}
                />
              ))}
            </g>
            <g fill="rgba(255,255,255,0.22)">
              {Array.from({ length: 10 }).map((_, i) => (
                <circle key={i} cx={(i % 2 === 0 ? -7 : 7) * 1.2} cy={-40 + i * 7.3} r={1.3} />
              ))}
            </g>
          </g>
        </g>
      ) : motif === "sakura" ? (
        <g opacity={variant === "leaf" ? 0.72 : 0.9}>
          <g transform={variant === "leaf" ? "translate(118 78) scale(0.78)" : "translate(110 74) scale(0.88)"}>
            <g fill={`url(#${sakuraGradId})`} opacity="0.95">
              {Array.from({ length: 5 }).map((_, i) => (
                <path
                  key={i}
                  d="M0-44c10 0 18 14 18 26S10 6 0 6-18-6-18-18  -10-44 0-44z"
                  transform={`rotate(${(360 / 5) * i})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="12.5" fill="rgba(245,190,85,0.9)" />
            <circle cx="0" cy="0" r="12.5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
            <g stroke="rgba(245,190,85,0.85)" strokeWidth="2" strokeLinecap="round" opacity="0.9">
              {Array.from({ length: 10 }).map((_, i) => (
                <path key={i} d="M0 0 L 0 -18" transform={`rotate(${(360 / 10) * i})`} />
              ))}
            </g>
          </g>
        </g>
      ) : motif === "daisy" ? (
        <g opacity={variant === "leaf" ? 0.72 : 0.9}>
          <g transform={variant === "leaf" ? "translate(120 80) scale(0.76)" : "translate(112 76) scale(0.88)"}>
            <g fill={`url(#${daisyGradId})`} opacity="0.95">
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={i}
                  d="M0-48c8 0 14 12 14 22S8 6 0 6-14-4-14-14  -8-48 0-48z"
                  transform={`rotate(${(360 / 12) * i})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="18" fill="rgba(255,215,90,0.95)" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          </g>
        </g>
      ) : motif === "tulip" ? (
        <g opacity={variant === "leaf" ? 0.72 : 0.9}>
          <g transform={variant === "leaf" ? "translate(120 86) scale(0.78)" : "translate(112 82) scale(0.9)"}>
            <g fill={`url(#${tulipGradId})`} opacity="0.95">
              <path d="M-18 12c10-34 6-56 18-66 12 10 8 32 18 66-12 10-26 10-36 0z" />
              <path d="M0-54c6 8 12 22 12 38 0 12-4 22-12 28-8-6-12-16-12-28 0-16 6-30 12-38z" />
            </g>
            <path d="M0 12c0 18-10 34-26 44" fill="none" stroke="rgba(24,110,72,0.45)" strokeWidth="6" />
          </g>
        </g>
      ) : motif === "rose" ? (
        <g opacity={variant === "leaf" ? 0.72 : 0.9}>
          <g transform={variant === "leaf" ? "translate(118 84) scale(0.76)" : "translate(110 82) scale(0.88)"}>
            <circle cx="0" cy="0" r="34" fill={`url(#${roseGradId})`} opacity="0.92" />
            <circle cx="0" cy="0" r="34" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
            <g fill="none" stroke="rgba(90,0,26,0.22)" strokeWidth="5" strokeLinecap="round" opacity="0.85">
              <path d="M10-18c-10-10-30 0-22 16 6 12 26 10 28-4" />
              <path d="M-6-10c-18 2-22 24-6 30 12 4 24-6 20-18" />
              <path d="M4 6c-14 4-10 22 4 22 10 0 18-10 12-18" />
            </g>
            <circle cx="8" cy="-10" r="10" fill="rgba(255,220,236,0.24)" />
          </g>
        </g>
      ) : motif === "peony" ? (
        <g opacity={variant === "leaf" ? 0.72 : 0.9}>
          <g transform={variant === "leaf" ? "translate(118 84) scale(0.78)" : "translate(110 82) scale(0.9)"}>
            <g fill={`url(#${peonyGradId})`} opacity="0.9">
              {Array.from({ length: 9 }).map((_, i) => (
                <path
                  key={i}
                  d="M0-44c12 0 22 16 22 30S12 12 0 12-22-6-22-20  -12-44 0-44z"
                  transform={`rotate(${(360 / 9) * i}) scale(${0.78 + (i % 3) * 0.07})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="14" fill="rgba(255,230,246,0.4)" />
            <circle cx="0" cy="0" r="11" fill="rgba(255,204,136,0.7)" />
          </g>
        </g>
      ) : (
        <g opacity={variant === "leaf" ? 0.72 : 0.9}>
          <g transform={variant === "leaf" ? "translate(118 80) scale(0.78)" : "translate(110 76) scale(0.9)"}>
            <g fill={`url(#${lotusGradId})`} opacity="0.75">
              {Array.from({ length: 6 }).map((_, i) => (
                <path
                  key={i}
                  d="M0-50c10 0 18 16 18 30S10 10 0 10-18-6-18-20  -10-50 0-50z"
                  transform={`rotate(${(360 / 6) * i + 18}) scale(0.92)`}
                />
              ))}
            </g>
            <g fill={`url(#${lotusGradId})`} opacity="0.92">
              {Array.from({ length: 5 }).map((_, i) => (
                <path
                  key={i}
                  d="M0-54c11 0 20 18 20 34S11 14 0 14-20-6-20-22  -11-54 0-54z"
                  transform={`rotate(${(360 / 5) * i})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="12" fill="rgba(255,224,120,0.85)" />
            <circle cx="0" cy="0" r="12" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          </g>
        </g>
      )}
      <defs>
        <linearGradient id={lavenderGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe6ff" />
          <stop offset="0.45" stopColor="#caa6ff" />
          <stop offset="1" stopColor="#7b4ad6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

