import ParallaxLayer from "../ParallaxLayer.jsx";

export default function DotGridLayer({ dotPointer }) {
  return (
    <ParallaxLayer
      speed={0.04}
      range={220}
      mouseX={70}
      mouseY={46}
      rotateX={0}
      rotateY={0}
      className="micro-layer micro-dotgrid"
      style={{
        "--pmx": dotPointer.pmx,
        "--pmy": dotPointer.pmy,
        "--pcx": dotPointer.pcx,
        "--pcy": dotPointer.pcy,
      }}
    >
      <div
        className="dotgrid"
        style={{
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.26) 1px, transparent 1px)",
          maskImage:
            "radial-gradient(220px 220px at var(--pcx, 50%) var(--pcy, 40%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0) 88%), radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,0.9), transparent 75%)",
        }}
      />
    </ParallaxLayer>
  );
}

