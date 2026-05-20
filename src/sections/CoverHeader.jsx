import MicroParallaxScene from "../components/MicroParallaxScene.jsx";
import CloudParallaxScene from "../components/CloudParallaxScene.jsx";
import Reveal from "../components/Reveal.jsx";
import { useEffect, useRef } from "react";
import doorLeft from "../../assets/images/door-left.png";
import doorRight from "../../assets/images/door-right.png";
import gateway from "../../assets/images/gateway.png";
import indoor from "../../assets/images/indoor.png";
import coinAi from "../../assets/images/coin-ai.png";
import stairway from "../../assets/images/stairway.png";

function Pill({ children, className = "" }) {
  return <span className={`pill ${className}`.trim()}>{children}</span>;
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

const FLORAL_MODULES = import.meta.glob("../../assets/images/florals/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

const FLORAL_URLS = Object.fromEntries(
  Object.entries(FLORAL_MODULES).map(([path, url]) => {
    const file = path.split("/").pop() ?? path;
    const name = file.replace(/\.[^.]+$/, "");
    return [name, url];
  }),
);

function getFloralUrl(name) {
  const url = FLORAL_URLS[name];
  if (!url) {
    throw new Error(`Missing floral asset: "${name}". Available: ${Object.keys(FLORAL_URLS).sort().join(", ")}`);
  }
  return url;
}

function FrontFloral({
  src,
  className = "",
  x,
  y,
  rotation,
  scale,
  delay,
  style,
}) {
  const mergedStyle = {
    ...(x != null ? { "--ff-x": x } : null),
    ...(y != null ? { "--ff-y": y } : null),
    ...(rotation != null ? { "--ff-r": rotation } : null),
    ...(scale != null ? { "--ff-s": String(scale) } : null),
    ...(delay != null ? { "--ff-d": delay } : null),
    ...style,
  };
  return <img className={`front-floral ${className}`.trim()} src={src} alt="" style={mergedStyle} />;
}

export default function CoverHeader({
  opened,
  coupleName,
  dateText,
  startISO,
  locationName,
  guestName,
  onOpen,
}) {
  const ref = useRef(null);

  const formattedDateText = (() => {
    const raw = (startISO ?? dateText) ? String(startISO ?? dateText).trim() : "";
    if (!raw) return "";

    // Prefer ISO date part to avoid timezone shifting (e.g. +07:00 -> previous day in some locales).
    const isoDate = raw.includes("T") ? raw.split("T")[0] : raw;
    const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const [, yyyy, mm, dd] = match;
      return `${dd}.${mm}.${yyyy.slice(-2)}`;
    }

    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return raw;
    const dd = String(parsed.getDate()).padStart(2, "0");
    const mm = String(parsed.getMonth() + 1).padStart(2, "0");
    const yy = String(parsed.getFullYear()).slice(-2);
    return `${dd} . ${mm} . ${yy}`;
  })();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scroller = el.closest(".layout-phone") ?? el.closest(".app") ?? el.parentElement;
    if (!scroller) return;

    const prevOverflow = scroller.style.overflow;
    const prevOverscroll = scroller.style.overscrollBehavior;
    const prevTouchAction = scroller.style.touchAction;

    if (!opened) {
      scroller.style.overflow = "hidden";
      scroller.style.overscrollBehavior = "none";
      scroller.style.touchAction = "none";
    }

    return () => {
      scroller.style.overflow = prevOverflow;
      scroller.style.overscrollBehavior = prevOverscroll;
      scroller.style.touchAction = prevTouchAction;
    };
  }, [opened]);

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
      <img className="cover-indoor-bg" src={indoor} alt="" aria-hidden="true" />
      <MicroParallaxScene
        motifs={["ivy", "sakura", "lotus", "daisy", "peony"]}
        layers={{ sparkles: true }}
      />
      <CloudParallaxScene count={12} seed={2} />
      <CoverDoor opened={opened} />
      <CoverGateway />
      <img className="cover-stairway" src={stairway} alt="" aria-hidden="true" />
      <div className={`front-florals ${opened ? "is-exit" : ""}`} aria-hidden="true">
        {[
          { name: "teratai", x: "2%", y: "-10px", rotation: "-6deg", scale: 0.74, delay: "0.12s" },
          { name: "teratai3", x: "8%", y: "-10px", rotation: "-3deg", scale: 0.70, delay: "0.84s" },
          { name: "teratai4", x: "4%", y: "17px", rotation: "4deg", scale: 0.98, delay: "0.78s" },
          { name: "teratai4", x: "12%", y: "30px", rotation: "3deg", scale: 0.82, delay: "0.90s" },
          { name: "mawar", x: "102%", y: "28px", rotation: "-14deg", scale: 0.78, delay: "1.02s" },
          { name: "teratai", x: "98%", y: "-18px", rotation: "-6deg", scale: 0.74, delay: "0.12s" },
          { name: "teratai4", x: "86%", y: "27px", rotation: "6deg", scale: 0.98, delay: "0.78s" },
          { name: "teratai3", x: "92%", y: "-1px", rotation: "-3deg", scale: 0.70, delay: "0.84s" },
          { name: "teratai4", x: "98%", y: "26px", rotation: "-9deg", scale: 0.82, delay: "0.90s" },
        ].map((f, i) => (
          <FrontFloral
            key={`${f.name}-${i}`}
            src={getFloralUrl(f.name)}
            x={f.x}
            y={f.y}
            rotation={f.rotation}
            scale={f.scale}
            delay={f.delay}
          />
        ))}
      </div>
      {!opened ? (
        <>
          <div className="cover-intro">
            <span className="cover-intro__label">The Wedding Of</span>
            <h1 className="title">{coupleName}</h1>
            <div className="meta" aria-label="Tanggal dan tamu">
              {formattedDateText ? (
                <Pill className="pill--date">{formattedDateText}</Pill>
              ) : null}
            </div>
            {guestName ? (
              <div className="meta" aria-label="Nama tamu">
                <Pill>Kepada Yth. {guestName}</Pill>
              </div>
            ) : null}
          </div>
          <div className="row center cover-open">
            <button className="btn btn-primary" onClick={onOpen}>
              Buka Undangan
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="cover-intro">
            <span className="cover-intro__label">The Wedding Of</span>
            <h1 className="title">{coupleName}</h1>
            <div className="meta" aria-label="Tanggal dan tamu">
              {formattedDateText ? (
                <Pill className="pill--date">{formattedDateText}</Pill>
              ) : null}
            </div>
            {guestName ? (
              <div className="meta" aria-label="Nama tamu">
                <Pill>Kepada Yth. {guestName}</Pill>
              </div>
            ) : null}
          </div>
          <Reveal className="cover-title-open">
            <img className="coin-img" src={coinAi} alt="" aria-hidden="true" />
          </Reveal>
        </>
      )}
      <div className="scrollhint scrollhint-bottom" aria-hidden>
        Scroll
      </div>
      <div className="cover-content">
        <div className="container">

        </div>
      </div>
    </header>
  );
}
