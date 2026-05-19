import { useEffect, useMemo, useRef, useState } from "react";
import createFlorals from "./microParallax/createFlorals.js";
import DotGridLayer from "./microParallax/DotGridLayer.jsx";
import FloralLayer from "./microParallax/FloralLayer.jsx";
import IvyLayer from "./microParallax/IvyLayer.jsx";
import SparkleLayer from "./microParallax/SparkleLayer.jsx";

// MicroParallaxScene = background dekorasi (dotgrid + bubbles + bunga) yang
// bergerak halus mengikuti scroll. Mouse parallax sengaja hanya dipakai untuk
// dotgrid (spotlight + sedikit geser), sementara layer lain "dikunci" agar
// tidak bikin motion berlebihan.
export default function MicroParallaxScene({
  motifs = ["sunflower", "lavender", "sakura", "lotus", "daisy", "tulip", "rose", "peony"],
  // Toggle layer untuk memudahkan custom/debug.
  // Contoh: <MicroParallaxScene layers={{ dotgrid: false, bubbles: true, florals: true }} />
  layers,
}) {
  const sparklesConfig =
    layers?.sparkles && typeof layers.sparkles === "object"
      ? layers.sparkles
      : null;
  const sparklesCount =
    typeof layers?.sparkles === "number"
      ? layers.sparkles
      : typeof sparklesConfig?.count === "number"
        ? sparklesConfig.count
        : 92;
  const sparklesSeed = typeof sparklesConfig?.seed === "number" ? sparklesConfig.seed : 2;

  const enabled = {
    dotgrid: true,
    sparkles: true,
    florals: true,
    ivy: motifs.includes("ivy"),
    ...layers,
  };

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
      {/* DOTGRID: ikut cursor (mouse parallax + spotlight). */}
      {enabled.dotgrid ? <DotGridLayer dotPointer={dotPointer} /> : null}

      {/* SPARKLES: bintik cahaya kedap-kedip, ikut scroll + sedikit mouse. */}
      {enabled.sparkles ? <SparkleLayer count={sparklesCount} seed={sparklesSeed} /> : null}

      {/* IVY: tanaman ivy di pojok kiri/kanan (parallax scroll + sway). */}
      {enabled.ivy ? <IvyLayer /> : null}

      {/* FLORALS: bunga-bunga kecil, parallax scroll + floating animation via CSS. */}
      {enabled.florals ? <FloralLayer florals={florals} /> : null}

      {/* Vignette overlay biar pinggir scene sedikit gelap/soft. */}
      <div className="scene-vignette micro-vignette" />
    </div>
  );
}
