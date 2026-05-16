import { useEffect, useMemo, useState } from "react";
import Countdown from "./components/Countdown.jsx";
import Modal from "./components/Modal.jsx";
import ParallaxScene from "./components/ParallaxScene.jsx";
import Reveal from "./components/Reveal.jsx";
import RSVPForm from "./components/RSVPForm.jsx";
import { invitation } from "./data/invitation.js";
import { buildICS, formatDateID, formatTimeID, getQueryParam } from "./utils/date.js";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-title">{title}</div>
            {subtitle ? <div className="section-subtitle">{subtitle}</div> : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const guestName = useMemo(() => getQueryParam("to"), []);
  const coupleName = `${invitation.couple.groom.short} & ${invitation.couple.bride.short}`;
  const start = useMemo(() => new Date(invitation.event.startISO), []);
  const dateText = `${formatDateID(start)} • ${formatTimeID(start)} ${invitation.event.timezoneLabel}`;

  useEffect(() => {
    // Lock page scroll until invitation is opened.
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevOverscroll = body.style.overscrollBehavior;

    if (!opened) {
      body.style.overflow = "hidden";
      body.style.overscrollBehavior = "none";
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.overscrollBehavior = prevOverscroll;
    };
  }, [opened]);

  const onDownloadICS = () => {
    const ics = buildICS({
      title: `Pernikahan ${coupleName}`,
      description: `Undangan pernikahan ${coupleName}.`,
      location: `${invitation.event.locationName} — ${invitation.event.locationAddress}`,
      start: invitation.event.startISO,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `undangan-${coupleName.replace(/\s+/g, "-").toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app" id="top">
      <header className={`cover ${opened ? "is-open" : ""}`}>
        <ParallaxScene />
        <div className="cover-content">
          <div className="container">
            <Reveal>
              <div className="badge">Undangan Pernikahan</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="title">{coupleName}</h1>
            </Reveal>
            <Reveal delay={220}>
              <div className="meta">
                <Pill>{dateText}</Pill>
                <Pill>{invitation.event.locationName}</Pill>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="to">
                Kepada Yth.{" "}
                <span className="to-name">{guestName ? guestName : "Tamu Undangan"}</span>
              </div>
            </Reveal>
            <Reveal delay={420}>
              <div className="row center">
                <button className="btn btn-primary" onClick={() => setOpened(true)}>
                  Buka Undangan
                </button>
              </div>
            </Reveal>
            <div className="scrollhint" aria-hidden>
              Scroll
            </div>
          </div>
        </div>
      </header>

      <main className={`content ${opened ? "is-open" : ""}`}>
        <nav className="topnav">
          <div className="container nav-inner">
            <a className="brand" href="#top" aria-label="Ke atas">
              {coupleName}
            </a>
            <div className="nav-links">
              <a href="#mempelai">Mempelai</a>
              <a href="#acara">Acara</a>
              <a href="#cerita">Cerita</a>
              <a href="#rsvp">RSVP</a>
            </div>
          </div>
        </nav>

        <Section
          id="mempelai"
          title="Mempelai"
          subtitle="Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Anda."
        >
          <div className="grid2 gap">
            <Reveal>
              <div className="card">
                <div className="card-title">{invitation.couple.groom.name}</div>
                <div className="text muted">{invitation.couple.groom.parents}</div>
                <div className="divider" />
                <div className="card-title">{invitation.couple.bride.name}</div>
                <div className="text muted">{invitation.couple.bride.parents}</div>
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

        <Section id="acara" title="Detail Acara" subtitle="Catat tanggalnya, kami tunggu kehadiran Anda.">
          <div className="grid2 gap">
            <Reveal>
              <div className="card">
                <div className="card-title">Countdown</div>
                <Countdown targetISO={invitation.event.startISO} />
                <div className="card-foot">
                  <button className="btn" onClick={() => setOpenCalendar(true)}>
                    Simpan ke kalender
                  </button>
                  <a className="btn btn-primary" href={invitation.event.mapsUrl} target="_blank" rel="noreferrer">
                    Buka Maps
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card">
                <div className="card-title">Waktu & Tempat</div>
                <div className="kv">
                  <div className="k">Tanggal</div>
                  <div className="v">{formatDateID(start)}</div>
                  <div className="k">Jam</div>
                  <div className="v">
                    {formatTimeID(start)} {invitation.event.timezoneLabel}
                  </div>
                  <div className="k">Lokasi</div>
                  <div className="v">{invitation.event.locationName}</div>
                  <div className="k">Alamat</div>
                  <div className="v">{invitation.event.locationAddress}</div>
                </div>
                <div className="divider" />
                <div className="agenda">
                  {invitation.event.agenda.map((it) => (
                    <div key={it.title} className="agenda-item">
                      <div className="agenda-title">{it.title}</div>
                      <div className="agenda-time">
                        {it.time} {invitation.event.timezoneLabel} <span className="muted">({it.note})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section
          id="cerita"
          title="Cerita Singkat"
          subtitle="Beberapa potongan perjalanan kami."
        >
          <div className="grid3 gap">
            {invitation.story.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 80}>
                <div className="card">
                  <div className="card-title">{s.title}</div>
                  <div className="text">{s.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

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
                  <li>Gunakan link dengan nama tamu: tambahkan <code>?to=Nama%20Tamu</code> di URL.</li>
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

        <footer className="footer">
          <div className="container foot-inner">
            <div className="foot-title">Terima kasih</div>
            <div className="foot-sub">
              Merupakan kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir.
            </div>
            <div className="foot-meta">{coupleName}</div>
          </div>
        </footer>
      </main>

      <Modal open={openCalendar} title="Simpan ke Kalender" onClose={() => setOpenCalendar(false)}>
        <div className="text">
          Unduh file kalender (.ics) lalu buka dengan aplikasi kalender Anda.
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn btn-primary" onClick={onDownloadICS}>
            Download .ics
          </button>
          <button className="btn" onClick={() => setOpenCalendar(false)}>
            Tutup
          </button>
        </div>
      </Modal>
    </div>
  );
}
