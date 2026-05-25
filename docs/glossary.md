# Glossary

Istilah yang dipakai di proyek ini, ditulis singkat dan mudah dibaca.

- App: Komponen root yang mengatur layout utama, status pembukaan undangan, dan modal kalender.
- Invitation Data: Data statis di `contents/invitation.js` berisi detail pasangan, acara, cerita, dan RSVP.
- CoverHeader: Header pembuka dengan animasi dekorasi, tombol buka undangan, dan parallax pointer.
- Sections: Kumpulan bagian utama halaman (CoverHeader, CoupleSection, EventSection, StorySection, RsvpSection, Footer).
- Section Wrapper: Komponen `Section` untuk struktur judul, subtitle, dan background dekorasi per section.
- Modal: Komponen overlay dialog sederhana untuk aksi simpan kalender.
- RSVP Form: Form konfirmasi kehadiran, tersimpan ke localStorage dan menyiapkan pesan WhatsApp.
- ParallaxLayer: Layer dekorasi yang bergerak mengikuti scroll dan sedikit efek mouse.
- MicroParallaxScene: Scene dekorasi mikro (dotgrid, sparkles, florals, ivy) yang bergerak halus.
- CloudParallaxScene: Dekorasi awan yang bergerak dengan parallax.
- Reveal: Wrapper animasi yang menampilkan konten saat masuk viewport.
- Countdown: Komponen hitung mundur menuju waktu acara.
- useScrollLock: Hook untuk mengunci scroll body saat cover belum dibuka.
- useInvitationMeta: Hook untuk membaca query `?to=` dan membentuk metadata undangan.
- usePrefersReducedMotion: Hook untuk mendeteksi preferensi reduced motion dan mematikan animasi.
- DotGridLayer: Layer dotgrid dengan spotlight yang mengikuti pointer.
- SparkleLayer: Layer bintik cahaya yang bergerak dan berkedip.
- FloralLayer: Layer bunga kecil dengan parallax dan animasi CSS.
- IvyLayer: Layer dekorasi ivy di sisi kiri dan kanan.
- Open State: Status `opened` pada App yang menentukan kapan konten utama ditampilkan.
- Calendar Modal State: Status `openCalendar` pada App untuk membuka/menutup modal kalender.
- Scroll Lock: Kondisi ketika scroll dinonaktifkan sebelum undangan dibuka.

