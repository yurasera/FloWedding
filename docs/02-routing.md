# Routing

Proyek ini adalah single-page tanpa router. Navigasi dilakukan via anchor hash di halaman yang sama.

## Ringkas

- Tidak ada React Router atau file routes.
- Semua konten dirender oleh `App.jsx`.
- Navigasi memakai anchor: `#top`, `#mempelai`, `#acara`, `#cerita`, `#rsvp`.

## Alur Navigasi

User klik link di `TopNav`
→ browser scroll ke elemen dengan `id` yang sesuai
→ tidak ada perubahan URL selain hash
→ state aplikasi tidak berubah

## Konsekuensi

- Tidak ada state routing yang perlu dikelola.
- Bookmark bisa langsung ke section tertentu via hash.
- Semua bagian tetap berada pada satu render tree.

