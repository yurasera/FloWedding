import Reveal from "../components/Reveal.jsx";
import MicroParallaxScene from "../components/MicroParallaxScene.jsx";
import Section from "./Section.jsx";
import { formatDateID, formatTimeID } from "../utils/date.js";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../components/usePrefersReducedMotion.js";

export default function CoupleSection({ invitation, guestName, start }) {
  const reducedMotion = usePrefersReducedMotion();
  const groomRef = useRef(null);
  const brideRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const els = [
      { el: groomRef.current, dir: 1 },
      { el: brideRef.current, dir: -1 },
    ].filter((x) => x.el);

    if (!els.length) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;

      for (const { el, dir } of els) {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const t = (center - vh / 2) / (vh / 2); // -1..1 around center
        const capped = Math.max(-1, Math.min(1, t));
        const max = 32; // px
        const x = capped * max * dir;
        el.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      }
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
  }, [reducedMotion]);

  return (
    <Section
      id="mempelai"
      title="Mempelai"
      subtitle="Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Anda."
      background={
        <MicroParallaxScene
          layers={{ dotgrid: true, sparkles: false, florals: false, ivy: false }}
        />
      }
    >
      <div className="grid2 gap">
        <Reveal>
          <div className="card">
            <Reveal className="reveal-left">
              <div ref={groomRef} className="name-parallax name-parallax-card">
                <div className="card-title">{invitation.couple.groom.name}</div>
                <div className="text muted">{invitation.couple.groom.parents}</div>
              </div>
            </Reveal>
            <div className="divider" />
            <Reveal className="reveal-left" delay={120}>
              <div ref={brideRef} className="name-parallax name-parallax-card">
                <div className="card-title">{invitation.couple.bride.name}</div>
                <div className="text muted">{invitation.couple.bride.parents}</div>
              </div>
             
            </Reveal>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="card">
            <div className="card-title">Informasi</div>
            <div className="kv">
              <div className="k">Untuk</div>
              <div className="v">{guestName ? guestName : "Tamu Undangan"}</div>
              <div className="k">Tanggal</div>
              <div className="v">{formatDateID(start)}</div>
              <div className="k">Jam</div>
              <div className="v">
                {formatTimeID(start)} {invitation.event.timezoneLabel}
              </div>
            </div>
            <div className="divider" />
            <div className="row">
              <a className="btn btn-primary" href="#acara">
                Lihat Detail Acara
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
