import ParallaxLayer from "./ParallaxLayer.jsx";

function DotField({ density = 60 }) {
  const dots = Array.from({ length: density }).map((_, i) => {
    const left = `${(Math.sin(i * 999) * 0.5 + 0.5) * 100}%`;
    const top = `${(Math.cos(i * 777) * 0.5 + 0.5) * 80}%`;
    const size = 1 + ((i * 13) % 3);
    const opacity = 0.2 + ((i * 29) % 60) / 100;
    return (
      <span
        key={i}
        className="dot"
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
  return <div className="dotfield">{dots}</div>;
}

function Cloud({ className = "" }) {
  return (
    <svg
      className={`cloud ${className}`}
      viewBox="0 0 500 160"
      role="img"
      aria-label="Dekorasi awan"
    >
      <path
        d="M120 140c-40 0-72-25-72-56 0-24 19-44 46-52 8-28 38-48 73-48 34 0 63 18 72 44 7-3 14-4 22-4 30 0 54 18 58 42 33 5 57 26 57 51 0 29-33 53-74 53H120z"
        fill="currentColor"
      />
    </svg>
  );
}

function Floral({ className = "" }) {
  return (
    <svg
      className={`floral ${className}`}
      viewBox="0 0 600 220"
      role="img"
      aria-label="Dekorasi bunga"
    >
      <defs>
        <linearGradient id="petal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd1e6" />
          <stop offset="1" stopColor="#7cf7d4" />
        </linearGradient>
      </defs>
      <g opacity="0.9">
        <circle cx="95" cy="150" r="12" fill="#fff" opacity="0.8" />
        <path
          d="M95 110c18 10 28 25 28 40s-10 30-28 40c-18-10-28-25-28-40s10-30 28-40z"
          fill="url(#petal)"
        />
        <path
          d="M55 150c10-18 25-28 40-28s30 10 40 28c-10 18-25 28-40 28s-30-10-40-28z"
          fill="url(#petal)"
          opacity="0.9"
        />
      </g>
      <g opacity="0.85" transform="translate(360 40) scale(1.05)">
        <circle cx="95" cy="150" r="10" fill="#fff" opacity="0.8" />
        <path
          d="M95 110c18 10 28 25 28 40s-10 30-28 40c-18-10-28-25-28-40s10-30 28-40z"
          fill="url(#petal)"
        />
        <path
          d="M55 150c10-18 25-28 40-28s30 10 40 28c-10 18-25 28-40 28s-30-10-40-28z"
          fill="url(#petal)"
          opacity="0.9"
        />
      </g>
      <path
        d="M40 210c120-90 220-120 320-90s160 60 240 30"
        fill="none"
        stroke="#7cf7d4"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export default function ParallaxScene() {
  return (
    <div className="scene">
      <ParallaxLayer speed={0.12} range={520} mouseX={18} mouseY={12} rotateX={2} rotateY={-2} className="scene-bg">
        <div className="bg-gradient" />
        <DotField density={72} />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.22}
        range={560}
        mouseX={34}
        mouseY={22}
        rotateX={5}
        rotateY={-5}
        className="scene-clouds"
      >
        <Cloud className="c1" />
        <Cloud className="c2" />
        <Cloud className="c3" />
      </ParallaxLayer>

      <ParallaxLayer speed={0.36} range={520} mouseX={24} mouseY={16} rotateX={3} rotateY={-3} className="scene-glow">
        <div className="glow" />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.52}
        range={520}
        mouseX={44}
        mouseY={32}
        rotateX={7}
        rotateY={-7}
        className="scene-floral"
        origin="bottom"
      >
        <Floral className="f1" />
      </ParallaxLayer>

      <div className="scene-vignette" />
    </div>
  );
}
