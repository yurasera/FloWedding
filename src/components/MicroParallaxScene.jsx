import { useEffect, useMemo, useRef, useState } from "react";
import ParallaxLayer from "./ParallaxLayer.jsx";
import BubbleField from "./microParallax/BubbleField.jsx";
import FloralGlyph from "./microParallax/FloralGlyph.jsx";
import createFlorals from "./microParallax/createFlorals.js";

// MicroParallaxScene = background dekorasi (dotgrid + bubbles + bunga) yang
// bergerak halus mengikuti scroll. Mouse parallax sengaja hanya dipakai untuk
// dotgrid (spotlight + sedikit geser), sementara layer lain "dikunci" agar
// tidak bikin motion berlebihan.
export default function MicroParallaxScene({
  motifs = ["sunflower", "lavender", "sakura", "lotus", "daisy", "tulip", "rose", "peony"],
}) {
  // ref ke root scene untuk menghitung posisi cursor relatif scene (untuk dotgrid).
  const sceneRef = useRef(null);
  // state CSS vars yang dipakai dotgrid:
  // - pmx/pmy: -1..1 untuk translate/rotate kecil
  // - pcx/pcy: koordinat spotlight mask di dalam dotgrid
  const [dotPointer, setDotPointer] = useState({ pmx: 0, pmy: 0, pcx: "50%", pcy: "40%" });

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    let raf = 0;
    let next = dotPointer;

    // Throttle update ke 1x per frame supaya pointermove tidak spam setState.
    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setDotPointer(next);
      });
    };

    // Listener global karena `.micro-scene { pointer-events: none; }`
    // Jadi event tidak akan nyampe ke elemen scene, tapi kita tetap bisa baca
    // posisi cursor lalu map ke koordinat scene.
    const onPointerMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) {
        next = { pmx: 0, pmy: 0, pcx: "50%", pcy: "40%" };
        schedule();
        return;
      }
      // Normalisasi ke -1..1 untuk efek parallax transform (pmx/pmy).
      const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      const pmx = Math.max(-1, Math.min(1, x));
      const pmy = Math.max(-1, Math.min(1, y));
      // Koordinat pixel untuk spotlight/mask (pcx/pcy).
      const pcx = `${Math.max(0, Math.min(rect.width, e.clientX - rect.left)).toFixed(1)}px`;
      const pcy = `${Math.max(0, Math.min(rect.height, e.clientY - rect.top)).toFixed(1)}px`;
      next = { pmx, pmy, pcx, pcy };
      schedule();
    };

    // Reset saat tab kehilangan fokus.
    const reset = () => {
      next = { pmx: 0, pmy: 0, pcx: "50%", pcy: "40%" };
      schedule();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", reset);
      if (raf) window.cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate posisi/cluster bunga deterministik dari daftar `motifs`.
  // Customization paling gampang:
  // - ubah algoritma/parameter di `createFlorals.js`
  // - ubah SVG per motif di `FloralGlyph.jsx`
  const florals = useMemo(() => createFlorals(motifs), [motifs]);

  return (
    <div
      ref={sceneRef}
      className="scene micro-scene"
      aria-hidden="true"
      style={{
        // Kunci mouse-parallax global untuk semua layer micro (default 0).
        // Dotgrid override variabel ini di `ParallaxLayer` dotgrid via `style` prop.
        "--pmx": 0,
        "--pmy": 0,
        "--pcx": "50%",
        "--pcy": "40%",
      }}
    >
      {/* DOTGRID: tetap ikut cursor (mouse parallax + spotlight). */}
      <ParallaxLayer
        speed={0.04}
        range={220}
        mouseX={70}
        mouseY={46}
        rotateX={0}
        rotateY={0}
        className="micro-layer micro-dotgrid"
        style={{
          // CSS vars khusus dotgrid (cursor-driven).
          "--pmx": dotPointer.pmx,
          "--pmy": dotPointer.pmy,
          "--pcx": dotPointer.pcx,
          "--pcy": dotPointer.pcy,
        }}
      >
        <div
          className="dotgrid"
          style={{
            // Override gaya dotgrid supaya spotlight lebih "hitam bold".
            backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.26) 1px, transparent 1px)",
            maskImage:
              "radial-gradient(220px 220px at var(--pcx, 50%) var(--pcy, 40%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0) 88%), radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,0.9), transparent 75%)",
          }}
        />
      </ParallaxLayer>

      {/* BUBBLES: parallax hanya dari scroll (tidak ikut mouse). */}
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

      {/* FLORALS: bunga-bunga kecil, parallax scroll + floating animation via CSS. */}
      <ParallaxLayer
        speed={0.18}
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
                // Posisi absolut dalam scene (pixel-space).
                left: f.side === "left" ? `${f.x}px` : undefined,
                right: f.side === "right" ? `${f.x}px` : undefined,
                top: `${f.y}px`,
                opacity: f.o,
                // Scale/rotate per item untuk variasi tampilan.
                transform: `scale(${f.s}) rotate(${f.r}deg)`,
                animationDelay: `${f.delay}s`,
              }}
            >
              {/* SVG glyph per motif (sunflower/lavender/...) */}
              <FloralGlyph side={f.side} variant={f.variant} motif={f.motif} />
            </div>
          ))}
        </div>
      </ParallaxLayer>

      {/* Vignette overlay biar pinggir scene sedikit gelap/soft. */}
      <div className="scene-vignette micro-vignette" />
    </div>
  );
}
