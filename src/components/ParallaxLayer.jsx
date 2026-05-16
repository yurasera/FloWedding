import { useEffect, useMemo, useRef, useState } from "react";
import { clampNumber } from "../utils/date.js";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

function getScrollY() {
  if (typeof window === "undefined") return 0;
  return window.scrollY || window.pageYOffset || 0;
}

export default function ParallaxLayer({
  speed = 0.25,
  range = 220,
  className = "",
  style,
  children,
  origin = "center",
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  const cappedRange = useMemo(() => clampNumber(range, 0, 1200), [range]);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      // Parallax is driven by page scroll position so it always moves
      // (element-rect based approaches can stay constant for full-viewport layers).
      const dy = clampNumber(-getScrollY() * speed, -cappedRange, cappedRange);
      setOffset(dy);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cappedRange, reducedMotion, speed]);

  const transform = reducedMotion
    ? undefined
    : `translate3d(0, ${offset.toFixed(2)}px, 0)`;

  return (
    <div
      ref={ref}
      className={`parallax-layer ${className}`}
      style={{
        transform,
        transformOrigin: origin,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
