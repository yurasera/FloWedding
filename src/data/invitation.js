export const invitation = {
  couple: {
    groom: {
      name: "Fulan",
      short: "Fulan",
      parents: "Putra dari Bpk. ... & Ibu ...",
    },
    bride: {
      name: "Fulana",
      short: "Fulana",
      parents: "Putri dari Bpk. ... & Ibu ...",
    },
  },
  event: {
    // Format ISO 8601; ganti ke tanggal & jam acara utama
    startISO: "2026-08-08T09:00:00+07:00",
    timezoneLabel: "WIB",
    locationName: "Gedung Serbaguna",
    locationAddress: "Jl. Contoh No. 123, Kota",
    mapsUrl: "https://maps.google.com/?q=Gedung+Serbaguna",
    agenda: [
      { title: "Akad Nikah", time: "09.00", note: "Selesai" },
      { title: "Resepsi", time: "11.00", note: "Sampai selesai" },
    ],
  },
  story: [
    {
      title: "Pertemuan",
      body: "Tulis cerita singkat perjalanan kalian di sini.",
    },
    {
      title: "Lamaran",
      body: "Momen spesial yang ingin dibagikan kepada tamu.",
    },
    {
      title: "Hari Bahagia",
      body: "Kalimat penutup/harapan untuk hari pernikahan.",
    },
  ],
  rsvp: {
    // Nomor WhatsApp format internasional tanpa + (contoh Indonesia: 62812xxxx)
    whatsappNumber: "6281234567890",
    recipientName: "Panitia",
  },
  gallery: {
    // Tambahkan URL gambar (atau taruh file di /public lalu pakai path seperti "/gallery/1.jpg")
    images: [],
  },
};

