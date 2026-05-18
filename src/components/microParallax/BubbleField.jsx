function Bubble({ style }) {
  return <span className="bubble" style={style} aria-hidden="true" />;
}

export default function BubbleField({ count = 18, seed = 1 }) {
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

