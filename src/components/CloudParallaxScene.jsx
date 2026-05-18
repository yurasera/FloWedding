import { useMemo } from "react";
import ParallaxLayer from "./ParallaxLayer.jsx";

function makeClouds({ count = 10, seed = 1 }) {
  const prng01 = (n) => {
    const s = Math.sin(n * 12.9898 + n * n * 0.0001) * 43758.5453;
    return s - Math.floor(s);
  };

  const clouds = [];
  for (let i = 0; i < count; i++) {
    const t = seed * 997 + i * 71;
    const x = 6 + prng01(t + 1) * 88; // %
    const y = 6 + prng01(t + 2) * 28; // % (near top)
    const s = 0.55 + prng01(t + 3) * 0.75;
    const o = 0.26 + prng01(t + 4) * 0.34;
    const blur = 4 + prng01(t + 5) * 10;
    const drift = 18 + prng01(t + 6) * 36;
    const dur = 22 + prng01(t + 7) * 26;
    const delay = -prng01(t + 8) * dur;
    clouds.push({ x, y, s, o, blur, drift, dur, delay });
  }
  return clouds;
}

export default function CloudParallaxScene({ count = 12, seed = 2 }) {
  const clouds = useMemo(() => makeClouds({ count, seed }), [count, seed]);
  const back = clouds.slice(0, Math.ceil(clouds.length * 0.55));
  const front = clouds.slice(Math.ceil(clouds.length * 0.55));

  return (
    <div className="scene cloud-scene" aria-hidden="true">
      <ParallaxLayer speed={0.04} range={220} mouseX={0} mouseY={0} className="cloud-layer cloud-layer--back">
        <div className="cloudfield">
          {back.map((c, i) => (
            <div
              key={i}
              className="cloud-wrap cloud-wrap--back"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                opacity: c.o,
                filter: `blur(${c.blur.toFixed(1)}px)`,
                transform: `translate3d(-50%, -50%, 0) scale(${c.s.toFixed(3)})`,
                "--cloud-drift": `${c.drift.toFixed(1)}vw`,
                "--cloud-dur": `${c.dur.toFixed(1)}s`,
                "--cloud-delay": `${c.delay.toFixed(1)}s`,
              }}
            >
              <div className="cloud" />
            </div>
          ))}
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.075} range={300} mouseX={0} mouseY={0} className="cloud-layer cloud-layer--front">
        <div className="cloudfield">
          {front.map((c, i) => (
            <div
              key={i}
              className="cloud-wrap cloud-wrap--front"
              style={{
                left: `${c.x}%`,
                top: `${Math.min(40, c.y + 6)}%`,
                opacity: Math.min(0.95, c.o + 0.18),
                filter: `blur(${Math.max(2, c.blur - 2).toFixed(1)}px)`,
                transform: `translate3d(-50%, -50%, 60px) scale(${(c.s * 1.08).toFixed(3)})`,
                "--cloud-drift": `${(c.drift * 1.15).toFixed(1)}vw`,
                "--cloud-dur": `${Math.max(18, c.dur - 6).toFixed(1)}s`,
                "--cloud-delay": `${c.delay.toFixed(1)}s`,
              }}
            >
              <div className="cloud cloud--front" />
            </div>
          ))}
        </div>
      </ParallaxLayer>
    </div>
  );
}
