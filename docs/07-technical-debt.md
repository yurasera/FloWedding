# Technical Debt

## Current Risks

- Issue: App.jsx memegang beberapa kontrol lintas UI (cover open, modal kalender, metadata undangan).
	Risk: App mudah membengkak saat ada modal/interaksi baru.
	Suggested improvement: Pisahkan state UI global kecil ke hook khusus (mis. useAppUi) dan susun App sebagai layout shell.
- Issue: Efek scroll/pointer tersebar di CoverHeader, MicroParallaxScene, ParallaxLayer, CoupleSection.
	Risk: perubahan behavior scroll/animation membutuhkan update di banyak tempat dan rawan inkonsisten.
	Suggested improvement: Konsolidasikan utilitas listener scroll/pointer dan kebijakan rAF di satu modul.

## Architecture Risks

- Issue: Prop drilling untuk data undangan/metadata ke banyak section.
	Risk: semakin banyak fitur akan memperpanjang rantai props dan meningkatkan coupling antar komponen.
	Suggested improvement: Tambahkan context ringan untuk data undangan yang read-only.
- Issue: Komponen cover (CoverHeader) memegang banyak tanggung jawab visual dan interaksi.
	Risk: perubahan desain cover dapat merusak perilaku scroll/pointer dan sebaliknya.
	Suggested improvement: Pecah CoverHeader ke sub-komponen (hero, decor, controls) dan isolasi efek pointer.

## Animation Risks

- Issue: Parallax menggunakan state React per layer (offset) yang berubah saat scroll.
	Risk: banyak layer = banyak re-render, berpotensi menurunkan performa di perangkat rendah.
	Suggested improvement: Pindahkan sebagian perhitungan ke CSS variables di root dan update sekali per frame.
- Issue: Duplikasi logika reduced-motion di beberapa komponen.
	Risk: perilaku aksesibilitas bisa tidak konsisten saat logika berkembang.
	Suggested improvement: Sediakan hook utilitas tunggal untuk gating animasi dan shared helpers.

## Styling Risks

- Issue: Ketergantungan pada class global di satu stylesheet besar.
	Risk: konflik class/override meningkat seiring jumlah section dan variasi tema.
	Suggested improvement: Kelompokkan per section (file terpisah) atau gunakan CSS Modules untuk isolasi.
- Issue: Banyak dekorasi menggunakan inline style dan CSS variables ad-hoc.
	Risk: sulit dilacak dan rentan salah saat refactor.
	Suggested improvement: Standarkan token CSS (mis. --motion-*, --parallax-*) dan dokumentasikan.

## Future Scaling Risks

- Issue: Logic interaksi (open, scroll, pointer) tersebar di berbagai komponen.
	Risk: debugging alur interaksi lintas halaman menjadi sulit saat fitur bertambah.
	Suggested improvement: Definisikan layer orkestrasi (hook/manager) untuk interaksi global.
- Issue: Tidak ada batasan eksplisit untuk kompleksitas animasi per scene.
	Risk: penambahan layer dekorasi bisa mengakumulasi cost render dan jank.
	Suggested improvement: Tambahkan guard/konfigurasi scene level (max layers, disable pada perangkat lemah).

## Suggested Refactors

- Buat context read-only untuk data undangan dan metadata agar props lebih pendek.
- Ekstrak pengelolaan modal ke hook (mis. useModalState) jika jumlah modal bertambah.
- Satukan utilitas scroll/pointer + rAF throttling untuk parallax dan hover-based effects.
- Pecah CoverHeader dan MicroParallaxScene menjadi sub-komponen lebih kecil dengan tanggung jawab tunggal.

