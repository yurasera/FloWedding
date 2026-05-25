# Animation System

Dokumen ini merangkum sistem animasi dan parallax yang dipakai di proyek.

## Prinsip Utama

- Animasi fokus pada dekorasi dan reveal, bukan transisi halaman.
- Semua animasi berada di sisi client dan berjalan di satu halaman.
- Preferensi reduced motion dihormati untuk mengurangi motion berlebihan.

## Komponen Inti

- `Reveal`: animasi masuk ketika elemen masuk viewport menggunakan IntersectionObserver.
- `ParallaxLayer`: transform berbasis scroll dengan rAF, dipakai oleh scene dekorasi.
- `MicroParallaxScene`: kombinasi dotgrid, sparkles, florals, ivy.
- `CloudParallaxScene` dan `ParallaxScene`: dekorasi background pada cover.
- `Countdown`: interval 1 detik untuk UI countdown (bukan animasi dekorasi, tetapi update waktu).

## Sumber Gerak

- Scroll: `ParallaxLayer` menghitung offset dari `window.scrollY`.
- Pointer: CoverHeader dan MicroParallaxScene mengubah CSS variables berbasis posisi cursor.
- CSS keyframes: glow, sparkle, floral float (didefinisikan di `styles.css`).

## Alur Parallax (ringkas)

Scroll terjadi
→ `ParallaxLayer` hitung offset
→ setState `offset`
→ `transform` layer berubah
→ dekorasi bergerak

## Reduced Motion

- `usePrefersReducedMotion` membaca media query `(prefers-reduced-motion: reduce)`.
- Saat aktif, `Reveal` langsung visible dan `ParallaxLayer` tidak memasang listener scroll.

## Area yang Paling Sensitif

- CoverHeader: banyak elemen dekorasi dan efek pointer.
- MicroParallaxScene: pointer move global + CSS variables untuk dotgrid spotlight.

## Catatan Operasional

- Animasi tidak disimpan sebagai state global.
- Efek visual mengandalkan CSS variables untuk mengurangi kompleksitas props.

