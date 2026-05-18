import ParallaxLayer from "../ParallaxLayer.jsx";
import FloralGlyph from "./FloralGlyph.jsx";

export default function FloralLayer({ florals }) {
  return (
    <ParallaxLayer
      speed={0.28}
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
            <FloralGlyph side={f.side} variant={f.variant} motif={f.motif} />
          </div>
        ))}
      </div>
    </ParallaxLayer>
  );
}

