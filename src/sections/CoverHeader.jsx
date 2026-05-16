import ParallaxScene from "../components/ParallaxScene.jsx";
import Reveal from "../components/Reveal.jsx";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

export default function CoverHeader({
  opened,
  coupleName,
  dateText,
  locationName,
  guestName,
  onOpen,
}) {
  return (
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
              <Pill>{locationName}</Pill>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="to">
              Kepada Yth. <span className="to-name">{guestName ? guestName : "Tamu Undangan"}</span>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <div className="row center">
              <button className="btn btn-primary" onClick={onOpen}>
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
  );
}

