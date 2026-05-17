import ParallaxLayer from "./ParallaxLayer.jsx";
import { useMemo, useId } from "react";

function FloralGlyph({ side = "left", variant = "blossom", motif = "sunflower" }) {
  const id = useId();
  const petalGradId = `sun-petal-${side}-${id}`;
  const centerGradId = `sun-center-${side}-${id}`;
  return (
    <svg
      className={`floral-corner ${side}`}
      viewBox="0 0 220 220"
      role="img"
      aria-label={motif === "sunflower" ? "Dekorasi bunga matahari" : "Dekorasi floral"}
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
      </defs>
      <g opacity={variant === "leaf" ? 0.72 : variant === "sprig" ? 0.8 : 0.9}>
        {/* sunflower */}
        <g transform={variant === "leaf" ? "translate(120 74) scale(0.74)" : "translate(108 72) scale(0.9)"}>
          {/* petals */}
          <g fill={`url(#${petalGradId})`} opacity="0.96">
            {Array.from({ length: variant === "sprig" ? 10 : 12 }).map((_, i) => (
              <path
                key={i}
                d="M0-46c8 0 14 12 14 22s-6 22-14 22c-8 0-14-12-14-22s6-22 14-22z"
                transform={`rotate(${(360 / (variant === "sprig" ? 10 : 12)) * i})`}
              />
            ))}
          </g>
          {/* petal shadow ring */}
          <circle cx="0" cy="0" r="30" fill="rgba(0,0,0,0.06)" />
          {/* center */}
          <circle cx="0" cy="0" r="22" fill={`url(#${centerGradId})`} />
          <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(255,245,200,0.35)" strokeWidth="2" />
          {/* seeds */}
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

        {/* tiny accent buds for "blossom" */}
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
    </svg>
  );
}

function Bubble({ style }) {
  return <span className="bubble" style={style} aria-hidden="true" />;
}

function BubbleField({ count = 18, seed = 1 }) {
  const items = Array.from({ length: count }).map((_, i) => {
    const t = i + seed * 131;
    const left = `${(Math.sin(t * 333) * 0.5 + 0.5) * 100}%`;
    const top = `${(Math.cos(t * 555) * 0.5 + 0.5) * 100}%`;
    const size = 80 + ((t * 19) % 160);
    const opacity = 0.14 + ((t * 37) % 22) / 100;
    return (
      <Bubble
        key={i}
        style={{
          left,
          top,
          width: size,
          height: size,
          opacity,
        }}
      />
    );
  });
  return <div className="bubblefield">{items}</div>;
}

export default function MicroParallaxScene({ motif = "sunflower" }) {
  const florals = useMemo(() => {
    const items = [];
    const countTop = 12;
    const countSide = 10;

    for (let i = 0; i < countTop; i++) {
      const t = i + 1;
      const s = 0.26 + ((t * 13) % 18) / 100; // 0.26..0.44
      const o = 0.42 + ((t * 17) % 42) / 100; // 0.42..0.84
      const r = -18 + ((t * 29) % 36); // -18..18-ish
      // inset more into the screen so it's always visible
      const y = 26 + ((t * 23) % 160); // 26..186
      const x = 34 + ((t * 31) % 190); // 34..224 (relative inset)
      const delay = ((t * 71) % 4000) / 1000;
      const variant = ["blossom", "leaf", "sprig", "star"][t % 4];
      items.push({ side: "left", x, y, s, o, r, delay, variant });
      items.push({
        side: "right",
        x,
        y,
        s,
        o,
        r: -r,
        delay: (delay + 1.1) % 4,
        variant,
      });
    }

    for (let i = 0; i < countSide; i++) {
      const t = i + 101;
      const s = 0.24 + ((t * 9) % 16) / 100;
      const o = 0.32 + ((t * 21) % 40) / 100;
      const r = -14 + ((t * 19) % 28);
      const y = 120 + ((t * 41) % 260); // 120..380 (towards mid)
      const x = 28 + ((t * 29) % 70); // 28..98 (more inset)
      const delay = ((t * 53) % 5000) / 1000;
      const variant = ["leaf", "sprig", "blossom", "star"][t % 4];
      items.push({ side: "left", x, y, s, o, r, delay, variant });
      items.push({
        side: "right",
        x,
        y,
        s,
        o,
        r: -r,
        delay: (delay + 0.7) % 5,
        variant,
      });
    }

    // extra "inner" scatter (still attached to left/right so we can position with left/right styles)
    for (let i = 0; i < 8; i++) {
      const t = i + 301;
      const s = 0.22 + ((t * 7) % 18) / 100;
      const o = 0.28 + ((t * 11) % 46) / 100;
      const r = -22 + ((t * 13) % 44);
      const y = 60 + ((t * 17) % 300); // 60..360
      const x = 120 + ((t * 19) % 180); // 120..300 (deeper into screen)
      const delay = ((t * 61) % 6500) / 1000;
      const variant = ["sprig", "star", "leaf", "blossom"][t % 4];
      items.push({ side: "left", x, y, s, o, r, delay, variant });
      items.push({
        side: "right",
        x,
        y,
        s,
        o,
        r: -r,
        delay: (delay + 0.9) % 6.5,
        variant,
      });
    }

    return items;
  }, []);

  return (
    <div className="scene micro-scene" aria-hidden="true">
      <ParallaxLayer
        speed={0.04}
        range={220}
        mouseX={70}
        mouseY={46}
        rotateX={0}
        rotateY={0}
        className="micro-layer micro-dotgrid"
      >
        <div className="dotgrid" />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.08}
        range={320}
        mouseX={30}
        mouseY={18}
        rotateX={4}
        rotateY={-4}
        className="micro-layer micro-bubbles"
      >
        <BubbleField count={20} seed={1} />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.18}
        range={340}
        mouseX={64}
        mouseY={40}
        rotateX={8}
        rotateY={-8}
        className="micro-layer micro-florals"
      >
        <div className="floralfield">
          {florals.map((f, i) => (
            <div
              key={i}
              className={`floral-wrap ${f.side}`}
              style={{
                left: f.side === "left" ? `${f.x}px` : undefined,
                right: f.side === "right" ? `${f.x}px` : undefined,
                top: `${f.y}px`,
                opacity: f.o,
                transform: `scale(${f.s}) rotate(${f.r}deg)`,
                animationDelay: `${f.delay}s`,
              }}
            >
              <FloralGlyph side={f.side} variant={f.variant} motif={motif} />
            </div>
          ))}
        </div>
      </ParallaxLayer>

      <div className="scene-vignette micro-vignette" />
    </div>
  );
}
