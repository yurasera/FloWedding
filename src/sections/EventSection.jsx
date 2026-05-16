import Countdown from "../components/Countdown.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "./Section.jsx";
import { formatDateID, formatTimeID } from "../utils/date.js";

export default function EventSection({ invitation, start, onOpenCalendar }) {
  return (
    <Section id="acara" title="Detail Acara" subtitle="Catat tanggalnya, kami tunggu kehadiran Anda.">
      <div className="grid2 gap">
        <Reveal>
          <div className="card">
            <div className="card-title">Countdown</div>
            <Countdown targetISO={invitation.event.startISO} />
            <div className="card-foot">
              <button className="btn" onClick={onOpenCalendar}>
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
  );
}

