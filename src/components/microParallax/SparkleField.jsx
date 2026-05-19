function Sparkle({ style }) {
  return <span className="sparkle" style={style} aria-hidden="true" />;
}

export default function SparkleField({ count = 64, seed = 3 }) {
  const items = Array.from({ length: count }).map((_, i) => {
    const t = i + seed * 131;
    const left = `${(Math.sin(t * 333) * 0.5 + 0.5) * 100}%`;
    const top = `${(Math.cos(t * 555) * 0.5 + 0.5) * 100}%`;
    const size = 3 + ((t * 19) % 8); // px
    const blur = 2 + ((t * 17) % 10); // px
    const tw = 1.6 + ((t * 37) % 18) / 10; // s
    const delay = ((t * 29) % 22) / 10; // s
    const opacity = 0.22 + ((t * 41) % 38) / 100;
    return (
      <Sparkle
        key={i}
        style={{
          left,
          top,
          width: `${size}px`,
          height: `${size}px`,
          opacity,
          filter: `blur(${blur}px)`,
          "--tw": `${tw}s`,
          "--td": `${delay}s`,
        }}
      />
    );
  });

  return <div className="sparklefield">{items}</div>;
}

