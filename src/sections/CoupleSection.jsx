import Reveal from "../components/Reveal.jsx";
import MicroParallaxScene from "../components/MicroParallaxScene.jsx";
import Section from "./Section.jsx";
import { formatDateID, formatTimeID } from "../utils/date.js";

export default function CoupleSection({ invitation, guestName, start }) {
  return (
    <Section
      id="mempelai"
      title="Mempelai"
      subtitle="Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Anda."
      background={
        <MicroParallaxScene
          layers={{ dotgrid: true, sparkles: false, florals: false, ivy: false }}
        />
      }
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
  );
}
