import ParallaxLayer from "./ParallaxLayer.jsx";

function Sparkle({ className = "", style }) {
  return (
    <span className={`sparkle ${className}`} style={style} aria-hidden="true">
      <span className="sparkle-core" />
    </span>
  );
}

function SparkleField({ count = 46, seed = 1 }) {
  const items = Array.from({ length: count }).map((_, i) => {
    const t = i + seed * 97;
    const left = `${(Math.sin(t * 999) * 0.5 + 0.5) * 100}%`;
    const top = `${(Math.cos(t * 777) * 0.5 + 0.5) * 100}%`;
    const size = 10 + ((t * 17) % 18);
    const blur = 0.5 + ((t * 13) % 12) / 10;
    const opacity = 0.35 + ((t * 29) % 55) / 100;
    const hue = (t * 47) % 360;
    return (
      <Sparkle
        key={i}
        style={{
          left,
          top,
          width: size,
          height: size,
          opacity,
          filter: `blur(${blur}px)`,
          "--h": `${hue}deg`,
        }}
      />
    );
  });
  return <div className="sparklefield">{items}</div>;
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

export default function MicroParallaxScene() {
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
        speed={0.16}
        range={360}
        mouseX={42}
        mouseY={26}
        rotateX={6}
        rotateY={-6}
        className="micro-layer micro-sparkles"
      >
        <SparkleField count={58} seed={2} />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.26}
        range={360}
        mouseX={56}
        mouseY={34}
        rotateX={8}
        rotateY={-8}
        className="micro-layer micro-sparkles2"
      >
        <SparkleField count={44} seed={3} />
      </ParallaxLayer>

      <div className="scene-vignette micro-vignette" />
    </div>
  );
}
