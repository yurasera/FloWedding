import ParallaxLayer from "../ParallaxLayer.jsx";

// Ubah angka di sini untuk mengatur jumlah & panjang ivy tanpa perlu ubah file lain.
const IVY_CONFIG = {
  // Jumlah tangkai ivy per sisi (kiri & kanan).
  stemsPerSide: 3,
  // Base posisi nempel pojok cover (0 = pas pojok atas).
  baseTop: "-190px",
  baseX: "0px",
  // Ukuran dasar (CSS value).
  width: "min(100px, 38vw)",
  // Tinggi ivy harus menyambung dari atas ke bawah cover.
  height: "100vh",
};

function buildLeaves(side) {
  const dir = side === "right" ? 1 : -1;
  const leaves = [];
  const steps = 22;
  const yStart = 80;
  const yEnd = 1060;

  for (let i = 0; i < steps; i++) {
    const t = i / Math.max(1, steps - 1);
    const y = Math.round(yStart + (yEnd - yStart) * t);
    const x = 210;
    const w = 22 + (i % 4) * 6;
    const h = 18 + ((i + 1) % 4) * 5;
    leaves.push(
      `M${x} ${y}c${dir * w} ${-h} ${dir * (w + 12)} ${h} ${dir * 6} ${h + 20}c${dir * -16} ${10} ${dir * -30} ${-4} ${dir * -40} ${-16}c${dir * 10} ${-14} ${dir * 20} ${-20} ${dir * 34} ${-24}z`
    );
  }

  return leaves;
}

function IvySVG({ side = "left" }) {
  // Satu tangkai menyambung dari atas sampai bawah cover.
  const stemD =
    side === "right"
      ? "M206 0C228 140 168 260 212 400C252 524 160 650 206 790C252 930 162 1020 208 1140"
      : "M214 0C192 140 252 260 208 400C168 524 260 650 214 790C168 930 258 1020 212 1140";

  const leaves = buildLeaves(side);

  return (
    <svg className="ivy-svg" viewBox="0 0 420 1140" role="presentation">
      <path className="ivy-stem" d={stemD} />
      <g className="ivy-leaves">
        {leaves.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

export default function IvyLayer() {
  const makeInstances = (side, xOffset = 6) => {
    const count = Math.max(0, Number(IVY_CONFIG.stemsPerSide) || 0);

    return Array.from({ length: count }).map((_, i) => {
      const depth = count <= 1 ? 0 : i / (count - 1);
      const scale = 1 - depth * 0.16;
      const opacity = 0.96 - depth * 0.22;
      const top = `calc(${IVY_CONFIG.baseTop} + ${Math.round(depth * 120)}px)`;
      const x = `calc(${IVY_CONFIG.baseX} + ${xOffset}px)`;
      const height = IVY_CONFIG.height;
      const delay = `${(depth * 0.8).toFixed(2)}s`;

      return (
        <div
          key={`${side}-${i}`}
          className={`ivy-corner ivy-corner--${side}`}
          style={{
            "--ivy-top": top,
            "--ivy-x": x,
            "--ivy-w": IVY_CONFIG.width,
            "--ivy-h": height,
            "--ivy-scale": scale,
            "--ivy-op": opacity,
            "--ivy-delay": delay,
          }}
        >
          <IvySVG side={side} />
        </div>
      );
    });
  };

  return (
    <ParallaxLayer speed={0.08} range={220} mouseX={22} mouseY={14} rotateX={0} rotateY={0} className="micro-layer micro-ivy">
      <div className="ivy-corners" aria-hidden="true">
        {makeInstances("left", -10)}
        {makeInstances("left", 10)}
        {makeInstances("left", 20)}
        {makeInstances("left", 28)}
        {makeInstances("left", 60)}
        {makeInstances("right", -10)}
        {makeInstances("right", 5)}
        {makeInstances("right", 10)}
        {makeInstances("right", 20)}
        {makeInstances("right", 48)}
        {makeInstances("right", 55)}
      </div>
    </ParallaxLayer>
  );
}
