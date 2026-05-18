import MicroParallaxScene from "../components/MicroParallaxScene.jsx";
import Reveal from "../components/Reveal.jsx";
import { useEffect, useRef } from "react";
import doorLeft from "../../assets/images/door-left.png";
import doorRight from "../../assets/images/door-right.png";
import gateway from "../../assets/images/gateway.png";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function CoverDoor({ opened }) {
  return (
    <div className={`cover-door ${opened ? "is-open" : ""}`} aria-hidden>
      <div
        className="cover-door__wing cover-door__wing--left"
        style={{ backgroundImage: `url(${doorLeft})` }}
      />
      <div
        className="cover-door__wing cover-door__wing--right"
        style={{ backgroundImage: `url(${doorRight})` }}
      />
    </div>
  );
}

function CoverGateway() {
  return <img className="cover-gateway" src={gateway} alt="" aria-hidden="true" />;
}

export default function CoverHeader({
  opened,
  coupleName,
  dateText,
  locationName,
  guestName,
  onOpen,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const update = () => {
      raf = 0;
      curX += (targetX - curX) * 0.14;
      curY += (targetY - curY) * 0.14;
      el.style.setProperty("--pmx", curX.toFixed(4));
      el.style.setProperty("--pmy", curY.toFixed(4));
      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        raf = window.requestAnimationFrame(update);
      }
    };

    const onPointerMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      targetX = Math.max(-1, Math.min(1, x));
      targetY = Math.max(-1, Math.min(1, y));
      el.style.setProperty("--pcx", `${Math.max(0, Math.min(rect.width, e.clientX - rect.left)).toFixed(1)}px`);
      el.style.setProperty("--pcy", `${Math.max(0, Math.min(rect.height, e.clientY - rect.top)).toFixed(1)}px`);
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      el.style.setProperty("--pcx", `50%`);
      el.style.setProperty("--pcy", `40%`);
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave);
    el.style.setProperty("--pmx", "0");
    el.style.setProperty("--pmy", "0");
    el.style.setProperty("--pcx", "50%");
    el.style.setProperty("--pcy", "40%");
    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header ref={ref} className={`cover ${opened ? "is-open" : ""}`}>
      <MicroParallaxScene motifs={["sunflower", "sakura", "lotus", "daisy", "peony"]} />
      <CoverDoor opened={opened} />
      <CoverGateway />
      <div className="cover-content">
        <div className="container">
          {!opened ? (
            <div className="row center cover-open">
              <button className="btn btn-primary" onClick={onOpen}>
                Buka Undangan
              </button>
            </div>
          ) : (
            <Reveal>
              <h1 className="title">{coupleName}</h1>
            </Reveal>
          )}
          <div className="scrollhint" aria-hidden>
            Scroll
          </div>
        </div>
      </div>
    </header>
  );
}
