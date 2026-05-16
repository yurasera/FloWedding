import Reveal from "../components/Reveal.jsx";
import RSVPForm from "../components/RSVPForm.jsx";
import Section from "./Section.jsx";

export default function RsvpSection({ invitation, coupleName, dateText }) {
  return (
    <Section id="rsvp" title="Konfirmasi Kehadiran" subtitle="Agar kami bisa mempersiapkan dengan baik.">
      <div className="grid2 gap">
        <Reveal>
          <RSVPForm
            whatsappNumber={invitation.rsvp.whatsappNumber}
            recipientName={invitation.rsvp.recipientName}
            coupleName={coupleName}
            eventDateText={dateText}
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="card">
            <div className="card-title">Catatan</div>
            <ul className="list">
              <li>
                Gunakan link dengan nama tamu: tambahkan <code>?to=Nama%20Tamu</code> di URL.
              </li>
              <li>RSVP “Simpan” tersimpan di perangkat (localStorage).</li>
              <li>Tombol WhatsApp akan membuka pesan siap kirim.</li>
            </ul>
            <div className="divider" />
            <div className="row">
              <button className="btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Ke Atas
              </button>
              <a className="btn btn-primary" href="#acara">
                Lihat Acara
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

